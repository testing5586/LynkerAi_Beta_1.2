# Overview
LynkerAI is an AI-powered task execution system designed to generate and execute code from natural language descriptions using OpenAI's API. It functions as an intelligent code generator, interpreting user requests to create and manage code files automatically. The project provides a robust platform for semantic-based analysis, including birth chart verification and soulmate matching, by leveraging advanced AI models for deeper compatibility insights, and a comprehensive system for managing and interacting with AI-generated content and user data.

LynkerAI's core vision is to establish a self-learning, self-validating intelligent system for "scientizing, socializing, and datafying" metaphysics. It aims to build a global database of verified birth times to advance "Second-Pillar Metaphysics" by collecting 1 million accurate birth times.

# User Preferences
Preferred communication style: Simple, everyday language.

# System Architecture
The application utilizes a command-line interface (CLI) with an AI-driven code generation pipeline: Task Interpretation, AI Generation, and File Management. It employs a modular architecture with a central control engine coordinating various AI-powered components.

## UI/UX Decisions
The system includes several web-based interfaces:
- A full-screen visual chat interface (`/tri-chat`).
- An admin dashboard (`/admin`) with real-time monitoring, database statistics, token consumption, and an AI chatroom.
- A web-based batch import center (`/import`).
- A true-chart verification view (`/verify_view`) and a guided "True Birth Verification Wizard" (`/verify`).
- An admin-only questionnaire management center (`/superintendent/questionnaire`).
- A multi-topic persistent chat system (`/newchat`) with topic management and AI conversation history.

## Technical Implementations & Feature Specifications
-   **User Authentication & Profile System**: Complete user management system integrated with Flask-Login, supporting normal users and astrology masters (gurus). Includes secure login, registration, profile management, and protected routes with automatic user ID association for data isolation.
-   **Multi-Language i18n System (6 Languages)**: **Nov 10, 2025**: Comprehensive internationalization system supporting 6 languages (English, 简体中文, 日本語, ภาษาไทย, Tiếng Việt, 한국어). Features include: (1) JSON-based translation file (`/static/i18n/translations.json`) with structured namespaces (common, landing, register, login, userRegister, guruRegister), (2) Dynamic content updating via `data-i18n`, `data-i18n-html`, `data-i18n-placeholder` attributes, (3) Language switcher component with flag emojis (🇺🇸🇨🇳🇯🇵🇹🇭🇻🇳🇰🇷) positioned in top-right header, (4) localStorage persistence for user language preferences, (5) All authentication pages (landing, register, login, user_register, guru_register) fully translated.
-   **Dual-Track Registration System (Pseudonym vs Real-Name)**: **Nov 10, 2025**: Enforces privacy protection through differentiated registration systems: (1) **Regular Users (Pseudonym System)**: Requires spiritual pseudonym (minimum 4 characters, upgraded from 2), privacy notice encouraging use of pseudonyms and separate emails, validation rejecting real-name patterns (e.g., "John Smith", "Mr./Mrs./Dr."), (2) **Gurus (Real-Name Authentication)**: Requires display name (minimum 2 characters), real name for identity verification, phone number for contact verification, optional fields (years of experience, professional bio, certification), professional authentication notice explaining trust-building requirements. Database schema updated with `real_name`, `phone_number`, `display_name`, `years_of_experience`, `certification` fields in `guru_profiles` table.
-   **Core AI Generation**: Handled by `lynker_master_ai.py` using OpenAI's chat completion API.
-   **Database Management**: Supabase integration for data storage.
-   **Birth Chart Verification**: `ai_truechart_verifier.py` and `admin_dashboard/verify/ai_verifier.py` perform semantic validation using qualitative confidence levels (高/中高/中/偏低/低).
-   **Intelligent Bazi Parser**: Detects data completeness, auto-triggers prophecy mode, and supports various Bazi chart formats.
-   **Prophecy Validation Center**: Auto-generates verifiable prediction questions from Ziwei charts and tracks accuracy.
-   **Bazi Vision Agent v1.2 (Pure GPT-4o)**: A three-layer intelligent image recognition system for Bazi chart extraction using GPT-4o Vision API, including a Vision Agent, Normalizer Agent, and Formatter Agent.
-   **Ziwei Strict Parser v1.3 + TXT Patch v5.9.3 Complete Four Transformations Pipeline**: Pure rule-based parsing system for Wenmo Tianji (文墨天机) AI analysis files, using regex and pattern matching without any AI inference or completion. Supports both JSON and plain text formats, with automatic format detection and strict validation. Enforces ZiweiAI_v1.1/v1.2 version requirements and source verification. Frontend route: `/verify/api/ziwei/upload_json`. **Nov 8, 2025 upgrade**: Added intelligent nested structure detection (basic_info/star_map), Traditional/Simplified Chinese palace name mapping (財帛宮→财帛宫), and automatic dict-to-list star conversion for downstream compatibility. **Nov 9, 2025 TXT Patch v5.7 upgrade**: Implemented four enhancement modules for WenMo TXT parsing - (1) Palace earthly branch extraction capturing zodiac signs (地支) for chart fingerprinting, (2) Star state parser identifying 廟/旺/平/陷 strength markers with color-coded display, (3) Enhanced four transformations auto-extraction for 生年四化/流年四化, (4) Frontend color scheme using traditional Chinese palette (purple for 廟, red for 旺, teal for 得/利, gray for 平, black for 陷). **Nov 9, 2025 TXT Patch v5.8 upgrade**: (1) Inline four transformations extraction from star tags ([生年忌]/[化禄] etc), (2) Advanced pattern detection (紫府朝垣/武杀同宫/日月并明), (3) Migration palace risk profiling with 2x weight multiplier for 忌/陷/劫空/铃羊火陀, (4) Frontend badges for patterns (purple) and risk index (color-coded by severity: black ≥6, red ≥3, gray <3), (5) Migration palace visual highlighting with black border when risk factors detected. **Nov 9, 2025 TXT Patch v5.9 upgrade**: Automatic four transformations embedding from transformations summary to individual star labels with Traditional/Simplified Chinese compatibility (太陰/太阴, 天機/天机). Reverse-maps transformation data (禄→太陰) to inject [禄] tags directly into star objects, enabling v2.3 frontend to display inline four transformations without manual tagging. Supports multi-transformation stars (e.g., 天梁 with both 生年科 and 流年权). **Nov 9, 2025 TXT Patch v5.9.3 upgrade**: Intelligent four transformations calculation via Tiangan (天干) inference when WenMo TXT exports lack four transformations data. Extracts birth year Tiangan from 節氣四柱 or 農曆時間 (e.g., "乙卯年" → "乙"), then auto-calculates 生年四化 using Qintian (欽天) Four Transformations table (10 Tiangan → 禄权科忌 mapping). Solves WenMo Tianji v2.0.15 TXT export compatibility issue where transformations fields are empty. Works as fallback layer before v5.9 embedding, ensuring complete four transformations pipeline: v5.7 basic extraction → v5.8 inline detection → v5.9.3 Tiangan calculation (if needed) → v5.9 star label embedding → v2.1.9 frontend colorful superscript rendering (禄=gold, 权=dodgerblue, 科=mediumseagreen, 忌=crimson). **Nov 9, 2025 v2.1.9 Frontend Fix**: Resolved TypeError by adding tags compatibility layer supporting both array format (legacy) and object format (WenMo standard: {格局:[], 性格:[], 优势:[], 风险因子:[]}), enabling proper display of twelve-palace grid with embedded four transformations markers.
-   **Lynker Unified Birth Engine v1.0**: Centralized birthdata processing system that generates both Bazi (BaziAI_v1.2) and Ziwei (ZiweiAI_v1.1) charts from user input, with automatic database archiving and external API integration readiness. **Currently hidden** behind a divider (can be enabled by setting `engineEnabled = true` in verify_wizard.js).
-   **External API Integration Framework**: Pre-configured integration system for third-party metaphysics API providers (Wenmo Tianji, Wenzhen) with toggle-based activation and fallback to local generation. Awaiting external API partnerships before public launch.
-   **Environment Auto-Fill System**: Intelligent birthplace data module with a 20-city environment template, providing cascading dropdowns for country/city selection and auto-filling environmental data.
-   **Bazi JSON Auto-Complete**: Automatic metadata enrichment system calculating Five-Element (Wuxing) counts, completing environment data with a three-layer fallback system, and stamping AI verifier metadata.
-   **Soulmate Matching**: Uses semantic matching and cosine similarity.
-   **AI Insight Generation**: Generates rule-based insights.
-   **User Memory & Interaction**: Tracks user interactions and engagement.
-   **Google Drive Sync**: Manages OAuth and data backup.
-   **Intelligent Document Management**: Catalogs, indexes, and searches project documentation.
-   **Multi-Model AI Chat**: Provides a unified interface for multiple AI providers with RAG integration.
-   **Conversation Bus**: Implements an event-driven, three-party collaboration system.
-   **Security Layer**: Provides centralized access control.
-   **Trusted Metaphysics System (TMS)**: A global trusted chart verification network with pseudonym protection and hierarchical validation.
-   **Master Vault Engine**: Secure AES256 encryption for the Master AI's learning knowledge.
-   **Master AI Evolution Engine**: Self-learning system for analyzing birthchart patterns and discovering statistical insights.
-   **Master AI Reasoner**: Advanced multi-source prediction engine.
-   **Login AI Trigger**: Invokes Master AI Reasoner for real-time predictions on user login.
-   **Multi-Model Dispatcher**: Dynamically assigns OpenAI models.
-   **Master AI Scheduler**: Automated periodic learning system.
-   **Three-Party AI Collaboration Engine**: A multi-agent system with Master AI, Group Leader, and Child AI roles.
-   **LKK Knowledge Base**: A three-tier intelligent knowledge management system.
-   **Knowledge Retrieval Router**: Lightweight RAG system for real-time knowledge enhancement.
-   **NewChat Multi-Topic Chat System**: ChatGPT-style persistent conversation system with PostgreSQL storage. Features include: topic management (create/rename/delete), message history with context loading, streaming AI responses using OpenAI GPT-4o, user isolation (each user sees only their topics), and data binding capability for associating topics with birth charts or verification records. Frontend reuses existing chatbox design with added sidebar for topic navigation. **Nov 9, 2025**: Initial release with complete CRUD operations, real-time streaming chat, and database persistence.

## Language & Runtime
-   **Python Backend**: Python 3.x for Flask server, AI processing, and database operations.
-   **Node.js Agent System**: Node.js 20 (ES Modules) for real-time Bazi extraction workflow.
-   **Execution Model**: Multi-process (Flask on port 5000, Node.js on port 3001).
-   **Platform**: Replit.

## Design Choices
-   **Prompt Engineering**: Utilizes structured prompt templates for predictable AI responses.
-   **Error Handling**: Includes environment validation, graceful degradation, and comprehensive output capture.
-   **Verification Philosophy**: True Birth Chart Verification uses qualitative confidence assessments rather than numeric scores.

# External Dependencies

## Required Services
-   **OpenAI API**: For core AI code generation and chat completions.
-   **MiniMax Vision API**: For OCR-based Bazi chart image recognition.

## Optional Services
-   **Supabase**: Database and backend services.
-   **Google Drive API**: For user data backup.

## Python Package Dependencies
-   `openai`
-   `supabase`
-   `requests`
-   `uv`
-   `numpy`
-   `sentence-transformers`
-   `psycopg2-binary`
-   `cryptography`

## Node.js Package Dependencies
-   `express`
-   `socket.io`
-   `node-fetch`
-   `cors`
-   `dotenv`