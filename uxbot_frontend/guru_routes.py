# -*- coding: utf-8 -*-
import os
import logging
import json
import base64
import re
import time
from copy import deepcopy
from datetime import datetime
from urllib.parse import quote
from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from supabase import create_client, Client

guru_bp = Blueprint('guru_bp', __name__)

# Initialize Supabase Client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
# Prefer service role key for server-side operations (uploads/writes). Fallback to anon key.
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY")

# Storage bucket for avatars/media (must exist in Supabase Storage)
SUPABASE_STORAGE_BUCKET = (
    os.environ.get("SUPABASE_STORAGE_BUCKET")
    or os.environ.get("SUPABASE_AVATAR_BUCKET")
    or "guru-media"
)

supabase: Client = None

if SUPABASE_URL and SUPABASE_KEY:
    try:
        # Some Supabase client/storage endpoints expect a trailing slash.
        if not SUPABASE_URL.endswith('/'):
            SUPABASE_URL = SUPABASE_URL + '/'
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logging.info("Supabase client initialized successfully")
    except Exception as e:
        logging.error(f"Failed to initialize Supabase client: {e}")
else:
    logging.warning("Supabase credentials not found in environment variables")

COUNTRY_MAPPING = {
    'CN': {'name': '中国', 'flag': '🇨🇳'},
    'MY': {'name': '马来西亚', 'flag': '🇲🇾'},
    'SG': {'name': '新加坡', 'flag': '🇸🇬'},
    'TH': {'name': '泰国', 'flag': '🇹🇭'},
    'VN': {'name': '越南', 'flag': '🇻🇳'},
    'ID': {'name': '印度尼西亚', 'flag': '🇮🇩'},
    'PH': {'name': '菲律宾', 'flag': '🇵🇭'},
    'US': {'name': '美国', 'flag': '🇺🇸'},
    'CA': {'name': '加拿大', 'flag': '🇨🇦'},
    'GB': {'name': '英国', 'flag': '🇬🇧'},
    'AU': {'name': '澳大利亚', 'flag': '🇦🇺'},
    'JP': {'name': '日本', 'flag': '🇯🇵'},
    'KR': {'name': '韩国', 'flag': '🇰🇷'},
    'HK': {'name': '香港', 'flag': '🇭🇰'},
    'TW': {'name': '台湾', 'flag': '🇹🇼'},
    'MO': {'name': '澳门', 'flag': '🇲🇴'},
    'IN': {'name': '印度', 'flag': '🇮🇳'},
    'NZ': {'name': '新西兰', 'flag': '🇳🇿'},
}

STUDIO_SNAPSHOT_TEMPLATE = {
    "hero": {
        "studioName": "",
        "guruName": "",
        "tagline": "",
        "backgroundImage": "",
        "location": "",
        "flag": "",
        "region": "",
        "stats": {
            "rating": 5.0,
            "consultations": 0,
            "startingPrice": 0
        },
        "buttons": {
            "primaryLabel": "预约咨询",
            "secondaryLabel": "我的后台"
        }
    },
    "basic": {
        "realName": "",
        "title": "",
        "bio": "",
        "experience": "",
        "specialties": [],
        "responseTime": "",
        "cancellationPolicy": ""
    },
    "services": [],
    "schedule": {
        "timezone": "Asia/Shanghai",
        "slots": [],
        "note": ""
    },
    "pricing": [],
    "reviews": [],
    "meta": {
        "lastEditor": None
    }
}


def _now_iso():
    return datetime.utcnow().isoformat() + 'Z'


def _normalize_phone(value: str | None):
    if not value:
        return None
    s = str(value).strip()
    if not s:
        return None
    # Remove common separators
    return s.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')


def _normalize_email(value: str | None):
    if not value:
        return None
    s = str(value).strip().lower()
    if not s:
        return None
    return s


def _maybe_int(value: str | None):
    """Best-effort int conversion (e.g., BIGSERIAL ids coming from localStorage/URL).

    Returns None when conversion is not possible.
    """
    if value is None:
        return None
    try:
        s = str(value).strip()
        if not s:
            return None
        # Only treat plain digits as ints to avoid coercing UUIDs.
        if not re.fullmatch(r"\d+", s):
            return None
        return int(s)
    except Exception:
        return None


def _sanitize_profile_row_for_copy(row: dict | None) -> dict:
    """Prepare a normal_user_profiles row dict for inserting as a new row.

    We remove common system/identity fields and keep the rest.
    """
    if not row or not isinstance(row, dict):
        return {}

    cleaned = dict(row)
    for k in (
        'id',
        'created_at',
        'updated_at',
        'deleted_at',
        # identity keys
        'user_id',
    ):
        cleaned.pop(k, None)

    return cleaned


def _ensure_user_profile_for_user_id(user_id: str, fallback_pseudonym: str | None = None):
    """Ensure a normal_user_profiles row exists for a given user_id (TEXT).

    Returns the latest profile row dict if any.
    Note: This function should only be called when there's NO legacy profile to bind.
    For users with legacy registration, use _bind_legacy_user_profile_by_email instead.
    """
    if not supabase:
        return None
    try:
        existing = (
            supabase.table('normal_user_profiles')
            .select('*')
            .eq('user_id', str(user_id))
            .order('id', desc=True)
            .limit(1)
            .execute()
        )
        row = existing.data[0] if getattr(existing, 'data', None) else None
        if row:
            return row
        # Create minimal row (only when no existing profile)
        payload = {'user_id': str(user_id)}
        if fallback_pseudonym:
            payload['pseudonym'] = fallback_pseudonym
        supabase.table('normal_user_profiles').insert(payload).execute()
        # Re-fetch
        existing2 = (
            supabase.table('normal_user_profiles')
            .select('*')
            .eq('user_id', str(user_id))
            .order('id', desc=True)
            .limit(1)
            .execute()
        )
        return existing2.data[0] if getattr(existing2, 'data', None) else None
    except Exception as e:
        logging.warning(f"[ensure_user_profile] error: {e}")
        return None


def _merge_missing_profile_fields(target: dict, source: dict) -> dict:
    """Merge fields from source into target when target values are empty-ish.

    We only fill missing values; we never overwrite existing non-empty values.
    """
    if not isinstance(target, dict) or not isinstance(source, dict):
        return target

    merged = dict(target)
    for k, v in source.items():
        if k in ('id', 'user_id', 'created_at', 'updated_at', 'deleted_at'):
            continue
        if v is None:
            continue
        tv = merged.get(k)
        is_empty = (tv is None) or (isinstance(tv, str) and not tv.strip())
        if is_empty:
            merged[k] = v
    return merged


def _bind_legacy_user_profile_by_email(email: str, new_user_id: str):
    """Bind legacy UXBot registration profile to the new UUID user_id.

    Legacy flow created:
      - user_registrations row (id often BIGSERIAL)
      - normal_user_profiles row with user_id = str(registration_id)

    New flow uses:
      - user_accounts row (UUID)
      - normal_user_profiles row with user_id = UUID string

    This function UPDATES the existing legacy profile's user_id to the new UUID,
    so all data remains in one profile row.
    """
    if not supabase:
        return

    try:
        # Find the latest registration for this email
        reg_res = (
            supabase.table('user_registrations')
            .select('id,email,pseudonym,created_at')
            .ilike('email', email)
            .order('created_at', desc=True)
            .limit(1)
            .execute()
        )
        reg = reg_res.data[0] if getattr(reg_res, 'data', None) else None
        if not reg:
            # No legacy registration, create a fresh profile for the UUID
            _ensure_user_profile_for_user_id(str(new_user_id), fallback_pseudonym=None)
            return

        legacy_id = str(reg.get('id'))
        
        # Check if there's already a profile for the new UUID
        existing_uuid_profile = (
            supabase.table('normal_user_profiles')
            .select('id')
            .eq('user_id', str(new_user_id))
            .limit(1)
            .execute()
        )
        if getattr(existing_uuid_profile, 'data', None):
            # UUID profile already exists, no need to bind
            logging.info(f"[bind_legacy] UUID profile already exists for {new_user_id}")
            return

        # Fetch legacy profile (created during registration with legacy_id)
        legacy_res = (
            supabase.table('normal_user_profiles')
            .select('*')
            .eq('user_id', legacy_id)
            .order('id', desc=True)
            .limit(1)
            .execute()
        )
        legacy = legacy_res.data[0] if getattr(legacy_res, 'data', None) else None
        
        if legacy:
            # UPDATE the legacy profile's user_id to the new UUID
            # This preserves all existing data (pseudonym, avatar, etc.)
            supabase.table('normal_user_profiles').update({
                'user_id': str(new_user_id)
            }).eq('id', legacy.get('id')).execute()
            logging.info(f"[bind_legacy] Updated profile id={legacy.get('id')} user_id: {legacy_id} -> {new_user_id}")
        else:
            # No legacy profile exists, create one for the UUID
            payload = {'user_id': str(new_user_id)}
            if reg.get('pseudonym'):
                payload['pseudonym'] = reg.get('pseudonym')
            supabase.table('normal_user_profiles').insert(payload).execute()
            logging.info(f"[bind_legacy] Created new profile for UUID {new_user_id}")

    except Exception as e:
        logging.warning(f"[bind_legacy_user_profile] error: {e}")


def _deep_merge(base: dict, incoming: dict):
    for key, value in incoming.items():
        if isinstance(value, dict) and isinstance(base.get(key), dict):
            _deep_merge(base[key], value)
        else:
            base[key] = value
    return base


def _with_snapshot_defaults(snapshot: dict | None):
    base = deepcopy(STUDIO_SNAPSHOT_TEMPLATE)
    if not snapshot:
        return base
    if isinstance(snapshot, str):
        try:
            snapshot = json.loads(snapshot)
        except json.JSONDecodeError:
            snapshot = {}
    # Guard against corrupted/invalid types (e.g., list) coming from DB.
    if not isinstance(snapshot, dict):
        snapshot = {}
    return _deep_merge(base, snapshot)


def _sb_retry(callable_fn, attempts: int = 3, base_delay_s: float = 0.15):
    """Retry wrapper for transient Supabase/network errors."""
    last_err = None
    for i in range(max(1, attempts)):
        try:
            return callable_fn()
        except Exception as e:
            last_err = e
            if i >= attempts - 1:
                break
            time.sleep(base_delay_s * (2 ** i))
    raise last_err


def _get_studio_record(guru_id: str):
    def _call():
        return supabase.table("guru_studios").select("*").eq("guru_id", guru_id).limit(1).execute()
    res = _sb_retry(_call)
    return res.data[0] if getattr(res, 'data', None) else None


def _get_guru_account(guru_id: str):
    def _call():
        return supabase.table("guru_accounts").select("*").eq("id", guru_id).limit(1).execute()
    res = _sb_retry(_call)
    return res.data[0] if getattr(res, 'data', None) else None


def _get_registration_record(record_id: str):
    def _call():
        return supabase.table("guru_registrations").select("*").eq("id", record_id).limit(1).execute()
    res = _sb_retry(_call)
    return res.data[0] if getattr(res, 'data', None) else None


def _build_account_meta(account: dict | None, registration: dict | None):
    country_code = _get_country_code(account, registration)
    country_meta = COUNTRY_MAPPING.get(country_code, {"name": country_code, "flag": "🌐"}) if country_code else {"name": None, "flag": "🌐"}

    return {
        "guru_id": (account or {}).get('id') or (registration or {}).get('id'),
        "display_name": (account or {}).get('display_name') or (registration or {}).get('display_name'),
        "real_name": (account or {}).get('real_name') or (registration or {}).get('real_name'),
        "avatar": (account or {}).get('profile_image_url'),
        "country": country_code,
        "country_flag": country_meta.get('flag'),
        "country_name": country_meta.get('name'),
        "phone_prefix": (account or {}).get('phone_prefix') or (registration or {}).get('phone_prefix'),
        "expertise": (account or {}).get('expertise') or (registration or {}).get('expertise'),
    }


def _extract_calling_code(value: str | None):
    """Extract leading calling code digits from strings like '+66 8123...', '66-8123...', '+86', etc."""
    if not value:
        return None
    s = str(value).strip()
    if not s:
        return None
    # Remove common separators
    s = s.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')
    # Handle international prefix 00 -> treat as +
    if s.startswith('00'):
        s = s[2:]
    if s.startswith('+'):
        s = s[1:]
    m = re.match(r'^\d{1,4}', s)
    return m.group(0) if m else None


def _infer_country_from_phone(account: dict | None, registration: dict | None):
    """Infer ISO country code from phone_prefix/phone when 'country' column is not set."""
    phone_prefix = (account or {}).get('phone_prefix') or (registration or {}).get('phone_prefix')
    phone = (account or {}).get('phone') or (registration or {}).get('phone')

    # Prefer an explicit phone_prefix if present
    code = _extract_calling_code(phone_prefix) or _extract_calling_code(phone)
    if not code:
        return None

    # Longest-prefix-first to avoid conflicts (e.g., 886 vs 86)
    calling_code_to_country = {
        '886': 'TW',
        '852': 'HK',
        '853': 'MO',
        '66': 'TH',
        '86': 'CN',
        '65': 'SG',
        '60': 'MY',
        '84': 'VN',
        '62': 'ID',
        '63': 'PH',
        '81': 'JP',
        '82': 'KR',
        '61': 'AU',
        '64': 'NZ',
        '44': 'GB',
        '91': 'IN',
        # North America (cannot reliably distinguish US/CA by code alone)
        '1': 'US',
    }

    for prefix in sorted(calling_code_to_country.keys(), key=len, reverse=True):
        if code.startswith(prefix):
            return calling_code_to_country[prefix]
    return None


def _get_country_code(account: dict | None, registration: dict | None):
    """Country resolution priority: explicit country > inferred from phone."""
    explicit = (account or {}).get('country') or (registration or {}).get('country')
    if explicit:
        return explicit
    return _infer_country_from_phone(account, registration)

@guru_bp.route('/api/guru/profile/<guru_id>', methods=['GET'])
def get_guru_profile(guru_id):
    """
    Get Guru profile data by ID.
    Returns merged data from guru_accounts, guru_registrations, and guru_studios.
    Priority: guru_accounts > guru_registrations
    """
    if not supabase:
        # Return 200 to avoid noisy console 500s on static-export pages.
        return jsonify({"success": False, "error": "Database not configured", "error_code": "DB_NOT_CONFIGURED"}), 200

    try:
        account = _get_guru_account(guru_id)
        registration = None

        if not account:
            registration = _get_registration_record(guru_id)
            if not registration:
                return jsonify({"success": False, "error": "Guru not found"}), 404
        elif account.get('registration_id'):
            registration = _get_registration_record(account.get('registration_id'))
        else:
            # Fallback: try to locate a matching registration by email (common in this project)
            try:
                email = account.get('email')
                if email:
                    reg_res = (
                        supabase.table("guru_registrations")
                        .select("*")
                        .eq("email", email)
                        .order("created_at", desc=True)
                        .limit(1)
                        .execute()
                    )
                    if reg_res.data:
                        registration = reg_res.data[0]
            except Exception as _lookup_err:
                logging.warning(f"Registration lookup by email failed: {_lookup_err}")

        studio = _get_studio_record(guru_id) or {}
        snapshot = _with_snapshot_defaults(studio.get('profile_snapshot')) if studio else _with_snapshot_defaults(None)

        country_code = _get_country_code(account, registration)
        country_meta = COUNTRY_MAPPING.get(country_code, {"name": country_code, "flag": "🌐"}) if country_code else {"name": None, "flag": "🌐"}

        profile = {
            "id": guru_id,
            "name": (account or {}).get('display_name') or (registration or {}).get('display_name') or snapshot['hero']['guruName'] or snapshot['hero']['studioName'] or 'Unknown Guru',
            "real_name": (account or {}).get('real_name') or (registration or {}).get('real_name'),
            "id_card": (account or {}).get('id_card') or (registration or {}).get('id_card'),
            "phone": (account or {}).get('phone') or (registration or {}).get('phone'),
            "email": (account or {}).get('email') or (registration or {}).get('email') or snapshot.get('contact', {}).get('email'),
            "avatar": (account or {}).get('profile_image_url') or (registration or {}).get('profile_image_url') or snapshot.get('hero', {}).get('avatar') or None,
            "expertise": (account or {}).get('expertise') or (registration or {}).get('expertise') or snapshot['basic'].get('specialties', []),
            "bio": (account or {}).get('bio') or (registration or {}).get('introduction') or snapshot['basic'].get('bio'),
            "country": country_code,
            "country_name": country_meta.get('name'),
            "country_flag": country_meta.get('flag'),
            "phone_prefix": (account or {}).get('phone_prefix') or (registration or {}).get('phone_prefix'),
            "studio": {
                "name": snapshot['hero']['studioName'],
                "location": snapshot['hero']['location'],
                "phone": snapshot.get('contact', {}).get('phone'),
                "email": snapshot.get('contact', {}).get('email'),
                "profile_snapshot": snapshot,
                "is_published": studio.get('is_published') if studio else False,
                "published_at": studio.get('published_at') if studio else None
            },
            "stats": {
                "consultations": (account or {}).get('consultations_count', 0),
                "rating": (account or {}).get('rating', 5.0)
            }
        }

        return jsonify({"success": True, "data": profile}), 200

    except Exception as e:
        # In dev we still want the traceback to diagnose root causes.
        logging.exception("Profile fetch error")
        # Return 200 so frontend won't show a scary 500 in the console.
        # Clients should rely on `success` to decide how to render.
        return jsonify({
            "success": False,
            "error": "Profile temporarily unavailable",
            "error_code": "PROFILE_TEMP_UNAVAILABLE",
            "details": str(e),
        }), 200

@guru_bp.route('/api/guru/onboarding/complete', methods=['POST'])
def complete_onboarding():
    """
    Handle Guru profile completion.
    Expects multipart/form-data with:
    - avatar: File (optional)
    - studioName, studioLocation, studioPhone, studioEmail
    - serviceIntro
    - expertise: JSON string or comma-separated list
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        # 1. Extract Form Data
        studio_name = request.form.get('studioName')
        studio_location = request.form.get('studioLocation')
        studio_phone = request.form.get('studioPhone')
        studio_email = request.form.get('studioEmail')
        service_intro = request.form.get('serviceIntro')
        expertise_raw = request.form.get('expertise', '[]')
        
        try:
            expertise = json.loads(expertise_raw)
        except:
            expertise = expertise_raw.split(',') if expertise_raw else []

        avatar_file = request.files.get('avatar')
        avatar_url = None

        # 2. Upload Avatar (if present)
        if avatar_file:
            try:
                # Ensure bucket exists (or catch error)
                bucket_name = "guru-media"
                file_ext = avatar_file.filename.split('.')[-1] if '.' in avatar_file.filename else 'jpg'
                # Use a somewhat unique filename. In real app, use UUID or user ID.
                # For now, we use a random prefix + sanitised name
                import uuid
                safe_filename = f"{uuid.uuid4()}-{avatar_file.filename}"
                file_path = f"avatars/{safe_filename}"
                file_content = avatar_file.read()
                
                # Upload to Supabase Storage
                supabase.storage.from_(bucket_name).upload(
                    file=file_content,
                    path=file_path,
                    file_options={"content-type": avatar_file.content_type}
                )
                
                # Get Public URL
                # Supabase-py v2 method might need revision depending on exact version, 
                # but get_public_url is standard.
                avatar_url = supabase.storage.from_(bucket_name).get_public_url(file_path)
            except Exception as upload_error:
                logging.error(f"Avatar upload failed: {upload_error}")
                # Continue without avatar update if failed, or handle error?
                # We'll continue for now.

        # 3. Create/Update DB Records
        # Since we lack an Auth Context (User Session), we will:
        # - Check if 'guru_accounts' has entries? No, that's risky.
        # - INSERT a NEW Guru Account for every request (Demo Mode).
        # - Return the new IDs.
        
        # Insert into guru_accounts
        account_data = {
            "display_name": studio_name, # Mapped from Studio Name
            "email": studio_email, # Mapped from Studio Email
            # "bio": service_intro, # Column does not exist in DB
            # "expertise": expertise, # Column does not exist in DB
            # "status": "pending_approval" # Example field
        }
        if avatar_url:
            account_data["profile_image_url"] = avatar_url

        # Check for 'real_name' if we missed it, or just insert what we have
        # If the table requires a USER_ID (auth.uid()), we might fail here if we don't mock it.
        # Assuming the user created tables with nullable FKs or we can insert freely.
        
        try:
            # Try inserting. Note: if RLS is on and we are not authenticated, this might fail 
            # unless using Service Key (SUPABASE_KEY usually is Anon Key, Service Key is different).
            # If using Anon key, we need RLS policies allowing insert.
            
            # Using table().insert(data).execute()
            account_res = supabase.table("guru_accounts").insert(account_data).execute()
            
            if not account_res.data:
                raise Exception("Failed to create guru account")
                
            guru_id = account_res.data[0]['id']

            # Insert into guru_studios (Optional - Graceful Failure)
            try:
                studio_data = {
                    "guru_id": guru_id,
                    "profile_snapshot": {
                        "hero": {"studioName": studio_name, "location": studio_location},
                        "basic": {},
                        "contact": {"phone": studio_phone, "email": studio_email}
                    },
                    "is_published": False
                }
                supabase.table("guru_studios").insert(studio_data).execute()
            except Exception as studio_error:
                # Log error but do not fail the whole request
                logging.warning(f"Guru Studio creation failed (Non-fatal): {studio_error}")

            return jsonify({
                "success": True, 
                "message": "Registration successful",
                "guru_id": guru_id,
                "redirect_url": f"/uxbot/guru-profile-setup.html?guru_id={guru_id}" 
            }), 200

        except Exception as db_error:
            logging.error(f"Database operation failed: {db_error}")
            return jsonify({"success": False, "error": f"Database Error: {str(db_error)}"}), 500

    except Exception as e:
        logging.error(f"Onboarding endpoint error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/profile/<guru_id>/update', methods=['POST'])
def update_guru_profile(guru_id):
    """
    Update Guru personal profile data.
    Expects JSON with: real_name, id_card, phone, email
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json() or {}
        
        # Prepare update data for guru_accounts table
        update_data = {}
        
        if 'real_name' in data and data['real_name']:
            update_data['real_name'] = data['real_name']
            update_data['display_name'] = data['real_name']  # Also update display name
            
        if 'id_card' in data:
            update_data['id_card'] = data['id_card']
            
        if 'phone' in data:
            update_data['phone'] = data['phone']
            
        if 'email' in data:
            update_data['email'] = data['email']

        # Allow updating avatar URL directly (frontend uses a dedicated upload endpoint,
        # but keeping this here makes the API more resilient.)
        if 'profile_image_url' in data and data['profile_image_url']:
            update_data['profile_image_url'] = data['profile_image_url']
        
        if not update_data:
            return jsonify({"success": False, "error": "No data to update"}), 400
        
        # Update guru_accounts table
        result = supabase.table("guru_accounts").update(update_data).eq("id", guru_id).execute()
        
        if not result.data:
            # If no record found in guru_accounts, try to update guru_registrations
            result = supabase.table("guru_registrations").update(update_data).eq("id", guru_id).execute()
        
        return jsonify({
            "success": True,
            "message": "Profile updated successfully"
        }), 200
        
    except Exception as e:
        logging.error(f"Profile update error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/profile/<guru_id>/avatar', methods=['POST'])
def upload_guru_avatar(guru_id):
    """Upload avatar image, store in Supabase Storage, and persist profile_image_url."""
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        avatar_file = request.files.get('avatar')
        if not avatar_file:
            return jsonify({"success": False, "error": "Missing avatar file"}), 400

        bucket_name = SUPABASE_STORAGE_BUCKET
        import uuid
        file_ext = avatar_file.filename.split('.')[-1] if '.' in avatar_file.filename else 'jpg'
        safe_filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = f"avatars/{guru_id}/{safe_filename}"
        file_content = avatar_file.read()

        try:
            supabase.storage.from_(bucket_name).upload(
                file=file_content,
                path=file_path,
                file_options={"content-type": avatar_file.content_type}
            )
        except Exception as upload_err:
            err_text = str(upload_err)
            has_service_role = bool((os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or "").strip())
            # Most common misconfig: bucket not created
            if 'Bucket not found' in err_text or 'bucket not found' in err_text:
                return jsonify({
                    "success": False,
                    "error": f"Supabase Storage bucket '{bucket_name}' not found. Create it in Supabase Storage, or set SUPABASE_STORAGE_BUCKET to an existing bucket.",
                    "bucket": bucket_name
                }), 500

            # Common misconfig: Storage RLS blocks upload when using anon key.
            if ('row-level security' in err_text.lower()) or ('statuscode' in err_text.lower() and '403' in err_text) or ('unauthorized' in err_text.lower()):
                hint = (
                    "Supabase Storage RLS blocked the upload. "
                    "Recommended fix: set SUPABASE_SERVICE_ROLE_KEY (backend-only) in .env and restart the server. "
                    "Alternative: adjust Supabase Storage policies to allow uploads to this bucket."
                )
                return jsonify({
                    "success": False,
                    "error": f"Avatar upload failed: {err_text}",
                    "hint": hint,
                    "bucket": bucket_name,
                    "using_service_role": has_service_role,
                }), 403
            return jsonify({
                "success": False,
                "error": f"Avatar upload failed: {err_text}",
                "bucket": bucket_name
            }), 500

        avatar_url = supabase.storage.from_(bucket_name).get_public_url(file_path)

        # Persist to account first, fallback to registration
        update_data = {"profile_image_url": avatar_url}
        res = supabase.table("guru_accounts").update(update_data).eq("id", guru_id).execute()
        if not res.data:
            supabase.table("guru_registrations").update(update_data).eq("id", guru_id).execute()

        return jsonify({"success": True, "avatar_url": avatar_url}), 200

    except Exception as e:
        logging.error(f"Avatar upload error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/profile/<guru_id>/password', methods=['POST'])
def set_or_change_guru_password(guru_id):
    """Set or change a guru account password.

    Body JSON:
    - new_password or password (required)
    - current_password (required only if password already set)

    Notes:
    - We store only a password hash in guru_accounts.password_hash.
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json(silent=True) or {}
        new_password = (data.get('new_password') or data.get('password') or '').strip()
        current_password = (data.get('current_password') or '').strip()

        if not new_password:
            return jsonify({"success": False, "error": "Missing new_password"}), 400
        if len(new_password) < 8:
            return jsonify({"success": False, "error": "Password must be at least 8 characters"}), 400

        # Password is stored on guru_accounts (login identity)
        acct_res = supabase.table('guru_accounts').select('id,password_hash').eq('id', guru_id).limit(1).execute()
        account = acct_res.data[0] if acct_res.data else None
        if not account:
            return jsonify({"success": False, "error": "Guru account not found"}), 404

        existing_hash = account.get('password_hash')
        if existing_hash:
            if not current_password:
                return jsonify({"success": False, "error": "Missing current_password"}), 400
            try:
                if not check_password_hash(existing_hash, current_password):
                    return jsonify({"success": False, "error": "Current password incorrect"}), 400
            except Exception:
                # If stored hash is invalid/corrupted, require reset through admin flow.
                return jsonify({"success": False, "error": "Password hash invalid; cannot verify"}), 500

        new_hash = generate_password_hash(new_password, method='pbkdf2:sha256', salt_length=16)
        update_payload = {
            'password_hash': new_hash,
            'password_updated_at': _now_iso(),
        }

        try:
            upd = supabase.table('guru_accounts').update(update_payload).eq('id', guru_id).execute()
        except Exception as e:
            err = str(e)
            if 'password_hash' in err or 'password_updated_at' in err:
                return jsonify({
                    "success": False,
                    "error": "Database schema missing password columns on guru_accounts.",
                    "hint": "Add columns: password_hash (text), password_updated_at (timestamptz) to guru_accounts."
                }), 500
            raise

        if not upd.data:
            return jsonify({"success": False, "error": "Failed to update password"}), 500

        return jsonify({"success": True, "message": "Password updated"}), 200

    except Exception as e:
        logging.error(f"Password update error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/login', methods=['POST'])
def guru_password_login():
    """Login for guru accounts using phone + password.

    Body JSON:
    {"phone": "+66123456789", "password": "..."}
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json(silent=True) or {}
        phone = _normalize_phone(data.get('phone'))
        password = (data.get('password') or '').strip()

        if not phone or not password:
            return jsonify({"success": False, "error": "Missing phone or password"}), 400

        res = (
            supabase.table('guru_accounts')
            .select('id,status,phone,password_hash,real_name,display_name')
            .eq('phone', phone)
            .order('created_at', desc=True)
            .limit(1)
            .execute()
        )
        account = res.data[0] if res.data else None
        if not account:
            return jsonify({"success": False, "error": "Account not found"}), 404

        pw_hash = account.get('password_hash')
        if not pw_hash:
            return jsonify({"success": False, "error": "Password not set"}), 400

        if not check_password_hash(pw_hash, password):
            return jsonify({"success": False, "error": "Invalid credentials"}), 401

        return jsonify({
            "success": True,
            "guru_id": account.get('id'),
            "status": account.get('status'),
            "name": account.get('display_name') or account.get('real_name') or '命理师'
        }), 200

    except Exception as e:
        logging.error(f"Guru login error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/countries', methods=['GET'])
def get_countries():
    try:
        countries_list = [
            {
                "code": code,
                "name_cn": data["name"],
                "flag": data["flag"]
            }
            for code, data in COUNTRY_MAPPING.items()
        ]
        return jsonify({"success": True, "data": countries_list}), 200
    except Exception as e:
        logging.error(f"Countries fetch error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/studio/<guru_id>', methods=['GET'])
def get_guru_studio_state(guru_id):
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        studio = _get_studio_record(guru_id)
        account = _get_guru_account(guru_id)
        registration = None
        if not account:
            registration = _get_registration_record(guru_id)
        elif account.get('registration_id'):
            registration = _get_registration_record(account.get('registration_id'))

        snapshot = _with_snapshot_defaults(studio.get('profile_snapshot') if studio else None)

        return jsonify({
            "success": True,
            "data": {
                "guru_id": guru_id,
                "studio_id": studio.get('id') if studio else None,
                "snapshot": snapshot,
                "is_published": studio.get('is_published') if studio else False,
                "published_at": studio.get('published_at') if studio else None,
                "updated_at": studio.get('updated_at') if studio else None,
                "account": _build_account_meta(account, registration)
            }
        }), 200
    except Exception as e:
        logging.error(f"Studio state fetch error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/studio/<guru_id>/save', methods=['POST'])
def save_guru_studio_state(guru_id):
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        payload = request.get_json(silent=True) or {}
        logging.info(f"[Studio Save] Raw payload: {json.dumps(payload, ensure_ascii=False)[:500]}")
        
        snapshot = payload.get('snapshot') or payload.get('studioState') or {}
        logging.info(f"[Studio Save] Extracted snapshot keys: {list(snapshot.keys()) if isinstance(snapshot, dict) else 'not a dict'}")

        if not isinstance(snapshot, dict):
            return jsonify({"success": False, "error": "Invalid snapshot payload"}), 400

        sanitized_snapshot = _with_snapshot_defaults(snapshot)
        logging.info(f"[Studio Save] Sanitized basic.realName: {sanitized_snapshot.get('basic',{}).get('realName')}")

        studio = _get_studio_record(guru_id)
        now_iso = _now_iso()

        # Only include columns that exist in the migration
        studio_payload = {
            "profile_snapshot": sanitized_snapshot,
            "updated_at": now_iso
        }

        if studio:
            supabase.table("guru_studios").update(studio_payload).eq("id", studio.get('id')).execute()
        else:
            studio_payload["guru_id"] = guru_id
            studio_payload.setdefault("created_at", now_iso)
            supabase.table("guru_studios").insert(studio_payload).execute()

        refreshed = _get_studio_record(guru_id)

        return jsonify({
            "success": True,
            "message": "Studio draft saved",
            "data": {
                "guru_id": guru_id,
                "studio_id": refreshed.get('id') if refreshed else None,
                "snapshot": _with_snapshot_defaults(refreshed.get('profile_snapshot') if refreshed else None),
                "updated_at": refreshed.get('updated_at') if refreshed else now_iso
            }
        }), 200

    except Exception as e:
        logging.error(f"Studio save error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/studio/<guru_id>/publish', methods=['POST'])
def publish_guru_studio(guru_id):
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        payload = request.get_json(silent=True) or {}
        snapshot_override = payload.get('snapshot')

        studio = _get_studio_record(guru_id)

        # First-time publish: if no studio exists yet, create one instead of failing.
        # This matches the UX expectation of "保存并同步" working without requiring a prior "保存更改".
        publish_source = None
        if isinstance(snapshot_override, dict):
            publish_source = snapshot_override
        elif studio:
            publish_source = studio.get('profile_snapshot')

        publish_snapshot = _with_snapshot_defaults(publish_source)

        now_iso = _now_iso()

        # Update both profile_snapshot AND published_snapshot
        update_payload = {
            "profile_snapshot": publish_snapshot,  # Also update draft
            "published_snapshot": publish_snapshot,
            "is_published": True,
            "published_at": now_iso,
            "updated_at": now_iso
        }

        if studio:
            supabase.table("guru_studios").update(update_payload).eq("id", studio.get('id')).execute()
        else:
            # Create a new studio record
            insert_payload = {
                "guru_id": guru_id,
                "created_at": now_iso,
                **update_payload
            }
            supabase.table("guru_studios").insert(insert_payload).execute()

        refreshed = _get_studio_record(guru_id)

        return jsonify({
            "success": True,
            "message": "Studio published",
            "data": {
                "guru_id": guru_id,
                "studio_id": refreshed.get('id') if refreshed else None,
                "snapshot": _with_snapshot_defaults(refreshed.get('published_snapshot')),
                "published_at": refreshed.get('published_at'),
                "is_published": refreshed.get('is_published', False)
            }
        }), 200

    except Exception as e:
        logging.error(f"Studio publish error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/public/<guru_id>', methods=['GET'])
def get_public_guru_profile(guru_id):
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        studio = _get_studio_record(guru_id)
        account = _get_guru_account(guru_id)
        registration = None
        if account and account.get('registration_id'):
            registration = _get_registration_record(account.get('registration_id'))

        if not studio:
            return jsonify({"success": False, "error": "Studio not found"}), 404

        snapshot_source = studio.get('published_snapshot') or studio.get('profile_snapshot')
        snapshot = _with_snapshot_defaults(snapshot_source)

        return jsonify({
            "success": True,
            "data": {
                "guru_id": guru_id,
                "studio_id": studio.get('id'),
                "snapshot": snapshot,
                "is_published": studio.get('is_published', False),
                "published_at": studio.get('published_at'),
                "account": _build_account_meta(account, registration)
            }
        }), 200
    except Exception as e:
        logging.error(f"Public profile error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/guru/search', methods=['GET'])
def guru_search():
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        keyword = request.args.get('keyword', '').strip()
        page = max(request.args.get('page', 1, type=int), 1)
        page_size = request.args.get('page_size', 12, type=int)
        page_size = min(max(page_size, 1), 40)

        start = (page - 1) * page_size
        end = start + page_size - 1

        query = supabase.table("guru_studios").select("*", count='exact').eq("is_published", True)

        if keyword:
            like_keyword = f"%{keyword}%"
            query = query.or_(f"name.ilike.{like_keyword},location.ilike.{like_keyword}")

        query = query.order("published_at", desc=True).range(start, end)

        result = query.execute()
        studios = result.data or []
        total = getattr(result, 'count', None)

        guru_ids = [studio.get('guru_id') for studio in studios if studio.get('guru_id')]
        accounts_map = {}

        if guru_ids:
            account_res = supabase.table("guru_accounts").select("*").in_("id", guru_ids).execute()
            accounts_map = {acc['id']: acc for acc in (account_res.data or []) if acc.get('id')}

        cards = []
        for studio in studios:
            guru_id = studio.get('guru_id')
            account = accounts_map.get(guru_id)
            snapshot = _with_snapshot_defaults(studio.get('published_snapshot') or studio.get('profile_snapshot'))
            hero = snapshot.get('hero', {})
            meta = _build_account_meta(account, None)

            cards.append({
                "guru_id": guru_id,
                "studio_id": studio.get('id'),
                "studio_name": hero.get('studioName') or studio.get('name'),
                "guru_name": hero.get('guruName') or meta.get('display_name'),
                "tagline": hero.get('tagline'),
                "location": hero.get('location') or studio.get('location'),
                "country_flag": hero.get('flag') or meta.get('country_flag'),
                "country_name": hero.get('region') or meta.get('country_name'),
                "rating": (account or {}).get('rating', 5.0),
                "consultations": (account or {}).get('consultations_count', 0),
                "starting_price": hero.get('stats', {}).get('startingPrice'),
                "services": snapshot.get('services', []),
                "pricing": snapshot.get('pricing', []),
                "published_at": studio.get('published_at')
            })

        if total is None:
            total = start + len(cards)

        has_more = total > end + 1 if total else len(cards) == page_size

        return jsonify({
            "success": True,
            "data": cards,
            "pagination": {
                "page": page,
                "page_size": page_size,
                "total": total,
                "has_more": has_more
            }
        }), 200

    except Exception as e:
        logging.error(f"Guru search error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# ============================================================
# User (普通用户) APIs - check phone, login
# ============================================================

@guru_bp.route('/api/guru/check-phone', methods=['POST'])
def guru_check_phone():
    """Check if a guru account exists for the given phone number.
    
    Body JSON:
    {"phone": "+66123456789"}
    
    Returns:
    {"exists": true/false, "id": "uuid" (if exists)}
    """
    if not supabase:
        return jsonify({"exists": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json(silent=True) or {}
        phone = _normalize_phone(data.get('phone'))

        if not phone:
            return jsonify({"exists": False, "error": "Missing phone"}), 400

        res = (
            supabase.table('guru_accounts')
            .select('id,status,password_hash')
            .eq('phone', phone)
            .order('created_at', desc=True)
            .limit(1)
            .execute()
        )
        account = res.data[0] if res.data else None
        
        if account:
            return jsonify({
                "exists": True,
                "id": account.get('id'),
                "has_password": bool(account.get('password_hash'))
            }), 200
        else:
            return jsonify({"exists": False}), 200

    except Exception as e:
        logging.error(f"Guru check phone error: {e}")
        return jsonify({"exists": False, "error": str(e)}), 500


@guru_bp.route('/api/user/check-phone', methods=['POST'])
def user_check_phone():
    """Check if a user account exists for the given phone number.
    
    Body JSON:
    {"phone": "+66123456789"}
    
    Returns:
    {"exists": true/false, "id": "uuid" (if exists)}
    """
    if not supabase:
        return jsonify({"exists": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json(silent=True) or {}
        phone = _normalize_phone(data.get('phone'))

        if not phone:
            return jsonify({"exists": False, "error": "Missing phone"}), 400

        # Try user_accounts table
        res = (
            supabase.table('user_accounts')
            .select('id,status,password_hash')
            .eq('phone', phone)
            .order('created_at', desc=True)
            .limit(1)
            .execute()
        )
        account = res.data[0] if res.data else None
        
        if account:
            return jsonify({
                "exists": True,
                "id": account.get('id'),
                "has_password": bool(account.get('password_hash'))
            }), 200
        else:
            return jsonify({"exists": False}), 200

    except Exception as e:
        logging.error(f"User check phone error: {e}")
        return jsonify({"exists": False, "error": str(e)}), 500


@guru_bp.route('/api/user/check-email', methods=['POST'])
def user_check_email():
    """Check if a user account exists for the given email.

    Body JSON:
    {"email": "someone@example.com"}

    Returns:
    {"exists": true/false, "id": "uuid" (if exists), "has_password": true/false}
    """
    if not supabase:
        return jsonify({"exists": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json(silent=True) or {}
        email = _normalize_email(data.get('email'))

        if not email:
            return jsonify({"exists": False, "error": "Missing email"}), 400

        # Basic email sanity check (keep permissive; validation is primarily client-side)
        if '@' not in email:
            return jsonify({"exists": False, "error": "Invalid email"}), 400

        # 1) Preferred: real login-capable account in user_accounts (UUID id)
        res = (
            supabase.table('user_accounts')
            .select('id,status,email,password_hash')
            .ilike('email', email)
            .order('created_at', desc=True)
            .limit(1)
            .execute()
        )
        account = res.data[0] if getattr(res, 'data', None) else None

        if account:
            return jsonify({
                "exists": True,
                "id": account.get('id'),
                "has_password": bool(account.get('password_hash'))
            }), 200

        # 2) Fallback: legacy UXBot registrations stored in user_registrations (often BIGSERIAL id)
        reg_res = (
            supabase.table('user_registrations')
            .select('id,email,pseudonym,created_at')
            .ilike('email', email)
            .order('created_at', desc=True)
            .limit(1)
            .execute()
        )
        reg = reg_res.data[0] if getattr(reg_res, 'data', None) else None
        if reg:
            # user_registrations does not represent a password-based login by default.
            return jsonify({
                "exists": True,
                "id": str(reg.get('id')),
                "has_password": False,
                "source": "user_registrations"
            }), 200

        return jsonify({"exists": False}), 200

    except Exception as e:
        logging.error(f"User check email error: {e}")
        return jsonify({"exists": False, "error": str(e)}), 500


@guru_bp.route('/api/user/login', methods=['POST'])
def user_password_login():
    """Login for user accounts using email+password (preferred) or phone+password (legacy).

    Body JSON:
    - Email flow: {"email": "someone@example.com", "password": "..."}
    - Phone flow: {"phone": "+66123456789", "password": "..."}
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json(silent=True) or {}
        email = _normalize_email(data.get('email'))
        phone = _normalize_phone(data.get('phone'))
        password = (data.get('password') or '').strip()

        if not password or (not email and not phone):
            return jsonify({"success": False, "error": "Missing email/phone or password"}), 400

        query = (
            supabase.table('user_accounts')
            .select('id,status,phone,email,password_hash,display_name,nickname')
            .order('created_at', desc=True)
            .limit(1)
        )
        if email:
            query = query.ilike('email', email)
        else:
            query = query.eq('phone', phone)

        res = query.execute()
        account = res.data[0] if res.data else None
        if not account:
            return jsonify({"success": False, "error": "Account not found"}), 404

        pw_hash = account.get('password_hash')
        if not pw_hash:
            return jsonify({"success": False, "error": "Password not set"}), 400

        if not check_password_hash(pw_hash, password):
            return jsonify({"success": False, "error": "Invalid credentials"}), 401

        return jsonify({
            "success": True,
            "user_id": account.get('id'),
            "status": account.get('status'),
            "name": account.get('display_name') or account.get('nickname') or '用户'
        }), 200

    except Exception as e:
        logging.error(f"User login error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/user/password', methods=['POST'])
def user_set_password():
    """Set or update password for a user (email-based), and bind legacy registration profile.

    Security model (beta-safe):
      - Requires a server session that has user_email matching the requested email.
        (Users typically obtain session via Google OAuth callback or immediately after registration.)

    Body JSON:
      {"email": "someone@example.com", "new_password": "...", "current_password": "..." (optional)}

    Returns:
      {success: true, user_id: "uuid", created: bool, updated: bool}
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json(silent=True) or {}
        email = _normalize_email(data.get('email'))
        new_password = (data.get('new_password') or '').strip()
        current_password = (data.get('current_password') or '').strip()

        if not email or '@' not in email:
            return jsonify({"success": False, "error": "Missing/invalid email"}), 400
        if len(new_password) < 8:
            return jsonify({"success": False, "error": "Password must be at least 8 characters"}), 400

        # Require verified session for this email to avoid takeover.
        sess_email = _normalize_email(session.get('user_email'))
        if not sess_email or sess_email != email:
            return jsonify({
                "success": False,
                "error": "Please login with Google to verify this email before setting a password"
            }), 401

        # Find existing account by email
        res = (
            supabase.table('user_accounts')
            .select('id,email,password_hash,display_name,nickname,created_at')
            .ilike('email', email)
            .order('created_at', desc=True)
            .limit(1)
            .execute()
        )
        account = res.data[0] if getattr(res, 'data', None) else None
        created = False
        updated = False

        if not account:
            # Create a minimal user_accounts row.
            # Try to use a reasonable display name from legacy registration.
            display_name = None
            try:
                reg_res = (
                    supabase.table('user_registrations')
                    .select('pseudonym,email,created_at')
                    .ilike('email', email)
                    .order('created_at', desc=True)
                    .limit(1)
                    .execute()
                )
                reg = reg_res.data[0] if getattr(reg_res, 'data', None) else None
                display_name = (reg or {}).get('pseudonym')
            except Exception:
                display_name = None

            new_account = {
                'email': email,
                'status': 'active',
                'display_name': display_name,
                'nickname': display_name,
                'password_hash': generate_password_hash(new_password)
            }

            insert_res = supabase.table('user_accounts').insert(new_account).execute()
            account = insert_res.data[0] if getattr(insert_res, 'data', None) else None
            if not account:
                return jsonify({"success": False, "error": "create_failed"}), 500
            created = True
        else:
            # If password already exists, require current_password to change it.
            existing_hash = account.get('password_hash')
            if existing_hash:
                if not current_password:
                    return jsonify({"success": False, "error": "Current password required"}), 400
                if not check_password_hash(existing_hash, current_password):
                    return jsonify({"success": False, "error": "Current password incorrect"}), 401

            supabase.table('user_accounts').update({
                'password_hash': generate_password_hash(new_password)
            }).eq('id', account.get('id')).execute()
            updated = True

        user_id = str(account.get('id'))

        # Bind legacy UXBot registration profile (if any) to this UUID user_id.
        _bind_legacy_user_profile_by_email(email, user_id)

        # Keep server session aligned to UUID user_id.
        try:
            session['user_id'] = user_id
            session['user_email'] = email
        except Exception:
            pass

        return jsonify({
            "success": True,
            "user_id": user_id,
            "created": created,
            "updated": updated
        }), 200

    except Exception as e:
        logging.error(f"User set password error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/auth/validate', methods=['GET'])
def auth_validate():
    """Validate that an auth identity exists in DB.

    Query params:
      - role: 'user' | 'guru'
      - id: uuid

    Returns:
      {success: true, exists: true/false}

    Notes:
      - This is intentionally lightweight and does NOT expose sensitive fields.
      - Used by landing pages to prevent stale localStorage from showing an avatar.
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        role = (request.args.get('role') or 'user').strip()
        _id = (request.args.get('id') or '').strip()
        if role not in ('user', 'guru') or not _id:
            return jsonify({"success": True, "exists": False}), 200

        if role == 'guru':
            res = (
                supabase.table('guru_accounts')
                .select('id')
                .eq('id', _id)
                .limit(1)
                .execute()
            )
            exists = bool(getattr(res, 'data', None))
            return jsonify({"success": True, "exists": exists}), 200

        # role == 'user'
        # Prefer UUID-based user_accounts id.
        res = (
            supabase.table('user_accounts')
            .select('id')
            .eq('id', _id)
            .limit(1)
            .execute()
        )
        if getattr(res, 'data', None):
            return jsonify({"success": True, "exists": True}), 200

        # Fallback: BIGSERIAL registrations (id is often integer)
        rid = _maybe_int(_id)
        if rid is not None:
            reg = (
                supabase.table('user_registrations')
                .select('id')
                .eq('id', rid)
                .limit(1)
                .execute()
            )
            if getattr(reg, 'data', None):
                return jsonify({"success": True, "exists": True}), 200

        # Fallback: profile row exists (normal_user_profiles.user_id is TEXT)
        prof = (
            supabase.table('normal_user_profiles')
            .select('user_id')
            .eq('user_id', _id)
            .limit(1)
            .execute()
        )
        exists = bool(getattr(prof, 'data', None))
        return jsonify({"success": True, "exists": exists}), 200

    except Exception as e:
        logging.error(f"Auth validate error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@guru_bp.route('/api/user/profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    """Get a regular user's lightweight profile.

    This endpoint exists because the landing page expects /api/user/profile/<id>.
    It merges:
      - user_accounts (name)
      - normal_user_profiles (avatar_url)
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        # 1) Try UUID-based user_accounts (newer flow)
        acc = (
            supabase.table('user_accounts')
            .select('id,display_name,nickname')
            .eq('id', user_id)
            .limit(1)
            .execute()
        )
        account = acc.data[0] if getattr(acc, 'data', None) else None

        # 2) Avatar/pseudonym from normal_user_profiles (works for both UUID and legacy BIGSERIAL ids)
        prof = (
            supabase.table('normal_user_profiles')
            .select('user_id,avatar_url,pseudonym')
            .eq('user_id', user_id)
            .order('id', desc=True)
            .limit(1)
            .execute()
        )
        profile = prof.data[0] if getattr(prof, 'data', None) else {}

        # 3) Legacy registration (no user_accounts row). Use user_registrations as fallback for display name.
        reg = None
        rid = _maybe_int(user_id)
        if rid is not None:
            reg_res = (
                supabase.table('user_registrations')
                .select('id,pseudonym,email')
                .eq('id', rid)
                .limit(1)
                .execute()
            )
            reg = reg_res.data[0] if getattr(reg_res, 'data', None) else None

        if not account and not profile and not reg:
            return jsonify({"success": False, "error": "not found"}), 404

        name = (
            (account or {}).get('display_name')
            or (account or {}).get('nickname')
            or (profile or {}).get('pseudonym')
            or (reg or {}).get('pseudonym')
            or '用户'
        )
        avatar_url = (profile or {}).get('avatar_url') or ''

        return jsonify({
            "success": True,
            "data": {
                "id": user_id,
                "name": name,
                "avatar_url": avatar_url
            }
        }), 200

    except Exception as e:
        logging.error(f"User profile fetch error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# ============================================================
# Google OAuth APIs
# ============================================================

# Google OAuth 配置 - 兼容 VITE_ 前缀和标准命名
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID") or os.environ.get("VITE_GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET") or os.environ.get("VITE_GOOGLE_CLIENT_SECRET", "")
# 本地开发使用 localhost，生产环境使用配置的 URI
GOOGLE_REDIRECT_URI = "http://localhost:8080/api/auth/google/callback"


def _get_google_redirect_uri() -> str:
    """Return the redirect_uri used for BOTH the auth request and token exchange.

    IMPORTANT: Google requires the redirect_uri to match exactly what is configured
    in Google Cloud Console. Using request.host (e.g. 127.0.0.1 / LAN IP) can cause
    redirect_uri_mismatch, so we prefer the env-configured value when available.
    """
    configured = (
        os.environ.get("GOOGLE_REDIRECT_URI")
        or os.environ.get("VITE_GOOGLE_REDIRECT_URI")
        or ""
    ).strip()
    if configured:
        # Allow setting either the full callback URL or a base URL.
        if configured.startswith("http://") or configured.startswith("https://"):
            if configured.endswith("/api/auth/google/callback"):
                return configured
            # If it's a base URL, append our callback path.
            return configured.rstrip("/") + "/api/auth/google/callback"

    # Fallback: derive from current host.
    host = request.host
    # Normalize common local hosts to "localhost" to reduce mismatch risk.
    # (If you need LAN testing, add that exact IP redirect URI in Google Console.)
    if host.startswith("127.0.0.1"):
        host = host.replace("127.0.0.1", "localhost", 1)
    return f"http://{host}/api/auth/google/callback"


def _encode_oauth_state(payload: dict) -> str:
    """Encode a small JSON payload into a URL-safe state string."""
    raw = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")


def _decode_oauth_state(state: str):
    """Decode a URL-safe state string back into an object.

    Backwards compatible with the old format where state was simply 'user' or 'guru'.
    """
    if not state:
        return None
    if state in ("user", "guru"):
        return {"role": state}
    try:
        padded = state + "=" * (-len(state) % 4)
        raw = base64.urlsafe_b64decode(padded.encode("ascii"))
        obj = json.loads(raw.decode("utf-8"))
        return obj if isinstance(obj, dict) else None
    except Exception:
        return None


def _sanitize_next_path(next_path: str) -> str:
    """Allow only safe in-app paths under /uxbot/ to avoid open redirects."""
    if not next_path:
        return "/uxbot/index.html"
    next_path = str(next_path).strip()
    # Disallow absolute URLs or protocol-relative URLs
    if "://" in next_path or next_path.startswith("//"):
        return "/uxbot/index.html"
    if not next_path.startswith("/uxbot/"):
        return "/uxbot/index.html"
    return next_path


@guru_bp.route('/api/auth/google/login', methods=['GET'])
def google_login():
    """Initiate Google OAuth login flow.
    
    Query params:
    - role: 'user' or 'guru'
    - redirect_uri: where to redirect after auth (optional)
    """
    role = request.args.get('role', 'user')
    next_path = request.args.get('next') or request.args.get('redirect_uri')
    next_path = _sanitize_next_path(next_path) if next_path else None
    
    # 重新读取环境变量（确保最新）
    client_id = os.environ.get("GOOGLE_CLIENT_ID") or os.environ.get("VITE_GOOGLE_CLIENT_ID", "")
    
    if not client_id:
        return jsonify({"error": "Google OAuth not configured"}), 500

    # Use a stable redirect_uri (prefer env-configured) to avoid redirect_uri_mismatch.
    redirect_uri = _get_google_redirect_uri()
    try:
        # Helpful diagnostics for redirect_uri_mismatch.
        # NOTE: safe to log (no secrets), but do not log client_secret.
        logging.info(
            f"[Google OAuth] login: request.host={request.host} redirect_uri={redirect_uri} "
            f"env.GOOGLE_REDIRECT_URI={(os.environ.get('GOOGLE_REDIRECT_URI') or '').strip()} "
            f"env.VITE_GOOGLE_REDIRECT_URI={(os.environ.get('VITE_GOOGLE_REDIRECT_URI') or '').strip()}"
        )
    except Exception:
        pass
    
    # 构建 Google OAuth URL
    scope = "openid email profile"
    # Save role + optional next landing page.
    state_payload = {"role": role}
    if next_path:
        state_payload["next"] = next_path
    state = _encode_oauth_state(state_payload)
    
    from urllib.parse import quote
    auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={client_id}&"
        f"redirect_uri={quote(redirect_uri, safe='')}&"
        f"response_type=code&"
        f"scope={quote(scope)}&"
        f"state={state}&"
        f"access_type=offline&"
        f"prompt=consent"
    )
    
    from flask import redirect
    return redirect(auth_url)


@guru_bp.route('/api/auth/google/callback', methods=['GET'])
def google_callback():
    """Handle Google OAuth callback.
    
    Query params:
    - code: authorization code from Google
    - state: role info
    """
    from flask import redirect
    import requests as http_requests
    
    code = request.args.get('code')
    state_raw = request.args.get('state', 'user')
    error = request.args.get('error')

    state_obj = _decode_oauth_state(state_raw) or {"role": "user"}
    role = state_obj.get('role') or 'user'
    next_path = _sanitize_next_path(state_obj.get('next'))
    
    if error:
        return redirect(f"{next_path}?error={error}")
    
    if not code:
        return redirect(f"{next_path}?error=no_code")
    
    # 重新读取环境变量
    client_id = os.environ.get("GOOGLE_CLIENT_ID") or os.environ.get("VITE_GOOGLE_CLIENT_ID", "")
    client_secret = os.environ.get("GOOGLE_CLIENT_SECRET") or os.environ.get("VITE_GOOGLE_CLIENT_SECRET", "")
    
    if not client_id or not client_secret:
        return redirect(f"{next_path}?error=oauth_not_configured")
    
    # 根据请求来源动态设置 redirect_uri（必须与登录时一致）
    # Must match exactly the redirect_uri used in the initial auth request.
    redirect_uri = _get_google_redirect_uri()
    try:
        logging.info(
            f"[Google OAuth] callback: request.host={request.host} redirect_uri={redirect_uri} "
            f"env.GOOGLE_REDIRECT_URI={(os.environ.get('GOOGLE_REDIRECT_URI') or '').strip()} "
            f"env.VITE_GOOGLE_REDIRECT_URI={(os.environ.get('VITE_GOOGLE_REDIRECT_URI') or '').strip()}"
        )
    except Exception:
        pass
    
    try:
        # 交换 code 获取 token
        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code"
        }
        
        token_resp = http_requests.post(token_url, data=token_data)
        if token_resp.status_code != 200:
            logging.error(f"Google token error: {token_resp.text}")
            return redirect(f"{next_path}?error=token_error")
        
        tokens = token_resp.json()
        access_token = tokens.get("access_token")
        
        # 获取用户信息
        userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        userinfo_resp = http_requests.get(userinfo_url, headers=headers)
        
        if userinfo_resp.status_code != 200:
            logging.error(f"Google userinfo error: {userinfo_resp.text}")
            return redirect(f"{next_path}?error=userinfo_error")
        
        userinfo = userinfo_resp.json()
        email = userinfo.get("email")
        name = userinfo.get("name", "")
        picture = userinfo.get("picture", "")
        
        if not email:
            return redirect(f"{next_path}?error=no_email")
        
        # 根据角色处理
        if role == 'guru':
            # 命理师登录/注册
            result = _handle_google_guru_login(email, name, picture)
        else:
            # 普通用户登录/注册
            result = _handle_google_user_login(email, name, picture)
        
        if result.get("success"):
            user_id = result.get("id")
            user_name = result.get("name", name)

            # Establish server session so UXBot profile APIs can use the Google-generated user_id.
            # NOTE: this is the missing piece that caused profile updates to bind to the wrong identity.
            try:
                if role == 'guru':
                    session['guru_id'] = str(user_id)
                    session['guru_email'] = email
                    session['guru_name'] = user_name
                else:
                    session['user_id'] = str(user_id)
                    session['user_email'] = email
                    session['user_pseudonym'] = user_name

                    # Ensure a normal_user_profiles row exists for this Google user_id.
                    # user_id column is TEXT, so it can store UUID strings from user_accounts.
                    if supabase:
                        try:
                            existing_profile = supabase.table('normal_user_profiles') \
                                .select('id') \
                                .eq('user_id', str(user_id)) \
                                .execute()
                            if not getattr(existing_profile, 'data', None):
                                supabase.table('normal_user_profiles').insert({
                                    'user_id': str(user_id),
                                    'pseudonym': user_name or '灵客用户',
                                    'avatar_url': picture or None,
                                    # Do not write demo/mock defaults here.
                                    # Let the product/user choose provider/language later.
                                }).execute()
                        except Exception as _profile_err:
                            logging.warning(f"[google_callback] Could not ensure normal_user_profiles: {_profile_err}")
            except Exception as sess_err:
                logging.warning(f"[google_callback] Could not set session: {sess_err}")

            id_param = "guru_id" if role == 'guru' else "user_id"
            avatar_q = quote(picture) if picture else ''
            email_q = quote(email)
            return redirect(
                f"{next_path}?google_auth=success&{id_param}={user_id}&name={quote(user_name)}&email={email_q}&role={role}&avatar={avatar_q}"
            )
        else:
            error_msg = result.get("error", "unknown_error")
            return redirect(f"{next_path}?error={error_msg}")
    
    except Exception as e:
        logging.error(f"Google OAuth callback error: {e}")
        return redirect(f"{next_path}?error={quote(str(e))}")


def _handle_google_guru_login(email, name, picture):
    """Handle Google login for guru accounts."""
    if not supabase:
        return {"success": False, "error": "db_not_configured"}
    
    try:
        # 检查是否已有该 email 的命理师账号
        res = (
            supabase.table('guru_accounts')
            .select('id,status,real_name,display_name,email')
            .eq('email', email)
            .limit(1)
            .execute()
        )
        
        if res.data and len(res.data) > 0:
            # 已存在，直接登录
            account = res.data[0]
            return {
                "success": True,
                "id": account.get('id'),
                "name": account.get('display_name') or account.get('real_name') or name
            }
        else:
            # 不存在，创建新账号
            new_account = {
                "email": email,
                "real_name": name,
                "display_name": name,
                "profile_image_url": picture,
                "status": "pending",  # 命理师需要审核
            }
            
            insert_res = supabase.table('guru_accounts').insert(new_account).execute()
            if insert_res.data and len(insert_res.data) > 0:
                account = insert_res.data[0]
                return {
                    "success": True,
                    "id": account.get('id'),
                    "name": name,
                    "is_new": True
                }
            else:
                return {"success": False, "error": "create_failed"}
    
    except Exception as e:
        logging.error(f"Google guru login error: {e}")
        return {"success": False, "error": str(e)}


def _handle_google_user_login(email, name, picture):
    """Handle Google login for regular user accounts."""
    if not supabase:
        return {"success": False, "error": "db_not_configured"}
    
    try:
        # 检查是否已有该 email 的用户账号
        res = (
            supabase.table('user_accounts')
            .select('id,status,nickname,display_name,email')
            .eq('email', email)
            .limit(1)
            .execute()
        )
        
        if res.data and len(res.data) > 0:
            # 已存在，直接登录
            account = res.data[0]
            return {
                "success": True,
                "id": account.get('id'),
                "name": account.get('display_name') or account.get('nickname') or name
            }
        else:
            # 不存在，创建新账号
            new_account = {
                "email": email,
                "nickname": name,
                "display_name": name,
                "avatar_url": picture,
                "status": "active",
            }
            
            insert_res = supabase.table('user_accounts').insert(new_account).execute()
            if insert_res.data and len(insert_res.data) > 0:
                account = insert_res.data[0]
                return {
                    "success": True,
                    "id": account.get('id'),
                    "name": name,
                    "is_new": True
                }
            else:
                return {"success": False, "error": "create_failed"}
    
    except Exception as e:
        logging.error(f"Google user login error: {e}")
        return {"success": False, "error": str(e)}
