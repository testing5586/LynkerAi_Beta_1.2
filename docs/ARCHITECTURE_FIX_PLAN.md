# ============================================================
# 最小可落地的普通用户注册后端架构调整方案
# ============================================================

## 核心问题
1. user_registrations 表存储注册信息，但 id 是 BIGINT
2. normal_user_profiles 需要 user_id (UUID) 外键
3. 两者没有关联，导致 profile 无法创建

## 解决方案：统一使用 user_registrations.id 作为用户标识

### 方案 A：修改 normal_user_profiles 的 user_id 类型（推荐）

**优点**：改动最小，不影响现有数据
**缺点**：需要执行 SQL migration

```sql
-- 1. 移除外键约束（如果存在）
ALTER TABLE public.normal_user_profiles
DROP CONSTRAINT IF EXISTS normal_user_profiles_user_id_fkey;

-- 2. 修改 user_id 类型为 TEXT（兼容 UUID 和 BIGINT）
ALTER TABLE public.normal_user_profiles
ALTER COLUMN user_id TYPE TEXT;

-- 3. 添加新的外键约束到 user_registrations（可选）
-- ALTER TABLE public.normal_user_profiles
-- ADD CONSTRAINT normal_user_profiles_user_id_fkey
-- FOREIGN KEY (user_id) REFERENCES public.user_registrations(id);
```

### 后端代码调整

1. **注册成功后自动创建空 profile**
   位置：uxbot_frontend/uxbot_routes.py 的 register_api()
   
2. **profile 保存时使用 session 中的 registration_id**
   位置：uxbot_frontend/api_bridge.py 的 user_profile_api()

3. **session 统一存储 user_id**
   - 注册成功：session['user_id'] = str(registration_id)
   - Google 登录：session['user_id'] = str(user_account_id)

### 数据流调整

```
注册流程：
user-registration-form.html
    ↓ POST /uxbot/api/register
    ↓ 写入 user_registrations
    ↓ 创建空 normal_user_profiles (user_id = registration_id)
    ↓ session['user_id'] = registration_id
    ↓ 跳转 user-profile-setup.html

资料完善流程：
user-profile-setup.html
    ↓ POST /uxbot/api/user/profile
    ↓ 从 session 获取 user_id
    ↓ 更新 normal_user_profiles
    ↓ 跳转 lynkermates.html

灵友圈展示：
lynkermates.html
    ↓ GET /api/users/profiles
    ↓ 查询 normal_user_profiles（有数据了！）
```

## 需要修改的文件

1. **Supabase SQL**（执行一次）
   - 修改 normal_user_profiles.user_id 类型

2. **uxbot_frontend/uxbot_routes.py**
   - register_api() 成功后创建空 profile
   - 保存 session['user_id']

3. **uxbot_frontend/api_bridge.py**
   - user_profile_api() 从 session 获取 user_id
   - 移除随机 UUID 生成逻辑

4. **user-profile-setup.html**（可选）
   - 添加 session 检查，未登录跳转到注册页
