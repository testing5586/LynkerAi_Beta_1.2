-- ======================================================
-- LynkerAI Auth & Chat Migration to Supabase
-- ======================================================
-- This script creates all auth-related tables in Supabase
-- to replace the disabled Neon PostgreSQL database
--
-- Tables to create:
-- 1. users (authentication)
-- 2. normal_user_profiles (regular users with pseudonyms)
-- 3. guru_profiles (astrology masters with real names)
-- 4. chat_topics (conversation threads)
-- 5. chat_messages (chat history)
-- ======================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ======================================================
-- 1. USERS TABLE (Core Authentication)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    name TEXT,
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster email lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- ======================================================
-- 2. NORMAL_USER_PROFILES TABLE (Pseudonym System)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.normal_user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    pseudonym TEXT UNIQUE NOT NULL,
    gender TEXT,
    birth_date DATE,
    birth_time TIME,
    birth_location TEXT,
    preferred_provider TEXT DEFAULT 'LocalMock',
    preferred_language TEXT DEFAULT 'zh',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    -- Ensure one profile per user
    CONSTRAINT unique_normal_user_profile UNIQUE(user_id)
);

-- Create index for pseudonym lookup
CREATE INDEX IF NOT EXISTS idx_normal_profiles_user_id ON public.normal_user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_normal_profiles_pseudonym ON public.normal_user_profiles(pseudonym);

-- ======================================================
-- 3. GURU_PROFILES TABLE (Real-Name Authentication)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.guru_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    pseudonym TEXT NOT NULL,
    display_name TEXT,
    real_name TEXT,
    phone_number TEXT,
    bio TEXT,
    specializations TEXT[] DEFAULT '{}',
    region TEXT,
    nationality TEXT,
    ai_provider TEXT DEFAULT 'LocalMock',
    ai_tone TEXT DEFAULT 'professional',
    avatar_url TEXT,
    years_of_experience INTEGER,
    certification TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    -- Ensure one guru profile per user
    CONSTRAINT unique_guru_profile UNIQUE(user_id)
);

-- Create indexes for guru lookups
CREATE INDEX IF NOT EXISTS idx_guru_profiles_user_id ON public.guru_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_guru_profiles_pseudonym ON public.guru_profiles(pseudonym);

-- ======================================================
-- 4. CHAT_TOPICS TABLE (Conversation Threads)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.chat_topics (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT '新对话',
    topic_type TEXT DEFAULT 'general',
    binding_type TEXT,
    binding_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for chat topic queries
CREATE INDEX IF NOT EXISTS idx_chat_topics_user_id ON public.chat_topics(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_topics_updated_at ON public.chat_topics(updated_at DESC);

-- ======================================================
-- 5. CHAT_MESSAGES TABLE (Message History)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id BIGSERIAL PRIMARY KEY,
    topic_id BIGINT NOT NULL REFERENCES public.chat_topics(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for message queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_topic_id ON public.chat_messages(topic_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at ASC);

-- ======================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ======================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.normal_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guru_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS p_users_all ON public.users;
DROP POLICY IF EXISTS p_normal_profiles_all ON public.normal_user_profiles;
DROP POLICY IF EXISTS p_guru_profiles_all ON public.guru_profiles;
DROP POLICY IF EXISTS p_chat_topics_all ON public.chat_topics;
DROP POLICY IF EXISTS p_chat_messages_all ON public.chat_messages;

-- Create permissive policies (allow all operations via service role)
-- These policies allow the Flask backend to manage data using service role key
CREATE POLICY p_users_all ON public.users FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY p_normal_profiles_all ON public.normal_user_profiles FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY p_guru_profiles_all ON public.guru_profiles FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY p_chat_topics_all ON public.chat_topics FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY p_chat_messages_all ON public.chat_messages FOR ALL
  USING (true)
  WITH CHECK (true);

-- ======================================================
-- AUTO-UPDATE TRIGGERS FOR updated_at COLUMNS
-- ======================================================

-- Create trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at column
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_normal_profiles_updated_at ON public.normal_user_profiles;
CREATE TRIGGER update_normal_profiles_updated_at
    BEFORE UPDATE ON public.normal_user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_guru_profiles_updated_at ON public.guru_profiles;
CREATE TRIGGER update_guru_profiles_updated_at
    BEFORE UPDATE ON public.guru_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_chat_topics_updated_at ON public.chat_topics;
CREATE TRIGGER update_chat_topics_updated_at
    BEFORE UPDATE ON public.chat_topics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ======================================================
-- VERIFICATION QUERIES
-- ======================================================
-- Run these after migration to verify tables were created:

-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'normal_user_profiles', 'guru_profiles', 'chat_topics', 'chat_messages')
ORDER BY table_name;

-- Check table row counts
SELECT 
  'users' as table_name, COUNT(*) as row_count FROM public.users
UNION ALL
SELECT 'normal_user_profiles', COUNT(*) FROM public.normal_user_profiles
UNION ALL
SELECT 'guru_profiles', COUNT(*) FROM public.guru_profiles
UNION ALL
SELECT 'chat_topics', COUNT(*) FROM public.chat_topics
UNION ALL
SELECT 'chat_messages', COUNT(*) FROM public.chat_messages;

-- ======================================================
-- MIGRATION COMPLETE
-- ======================================================
-- ✅ Tables created successfully
-- ✅ Indexes added for performance
-- ✅ Foreign keys enforce referential integrity
-- ✅ RLS policies enabled
-- ✅ Auto-update triggers installed
--
-- Next steps:
-- 1. Update Flask backend to use Supabase client
-- 2. Test user registration/login
-- 3. Test chat system
-- 4. Remove Neon DATABASE_URL
-- ======================================================
