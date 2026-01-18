# guru_routes.py - Backend Updates for Nationality Support
# 文件: uxbot_frontend/guru_routes.py
# 说明: 本文件展示如何更新现有的 guru_routes.py 以支持国籍/地区字段

# ============================================================================
# 国家数据映射 (Country Data Mapping)
# ============================================================================
# 在文件开头添加国家数据映射（在导入之后）

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


# ============================================================================
# 更新: /api/guru/register 端点 (OTP Verification)
# ============================================================================
# 位置: guru_routes.py 中的 verify OTP 路由或类似位置
# 作用: 接收和保存国籍数据

# 示例代码（根据你的实际实现调整）:

@guru_bp.route('/api/otp/verify', methods=['POST'])
def verify_otp():
    """
    验证 OTP 并创建 Guru 账户
    现在接收: country（国家代码）和 phone_prefix（电话前缀）
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        data = request.get_json()
        phone = data.get('phone')
        otp = data.get('otp')
        email = data.get('email')
        display_name = data.get('display_name')
        
        # ✨ 新增字段
        country = data.get('country')
        phone_prefix = data.get('phone_prefix')

        # 这里验证 OTP（根据你的实现调整）
        # ...

        # 创建 Guru 账户
        account_data = {
            "display_name": display_name,
            "email": email,
            "phone": phone,
            # ✨ 新增字段
            "country": country,
            "phone_prefix": phone_prefix,
            "created_at": "now()",  # 或使用 datetime.utcnow()
        }

        # 插入到 Supabase
        account_res = supabase.table("guru_accounts").insert(account_data).execute()

        if not account_res.data:
            raise Exception("Failed to create guru account")

        guru_id = account_res.data[0]['id']

        return jsonify({
            "success": True,
            "message": "验证成功！命理师账号已创建。",
            "guru_account_id": guru_id,
            "status": "pending_approval"
        }), 200

    except Exception as e:
        logging.error(f"OTP verification error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# ============================================================================
# 更新: /api/guru/profile/<guru_id> 端点
# ============================================================================
# 位置: 现有的 get_guru_profile 函数
# 作用: 返回国籍信息，包括标志和本地化名称

@guru_bp.route('/api/guru/profile/<guru_id>', methods=['GET'])
def get_guru_profile(guru_id):
    """
    获取 Guru 个人资料数据
    现在返回: country_flag（旗帜）和 display_country（国家名称）
    """
    if not supabase:
        return jsonify({"success": False, "error": "Database not configured"}), 500

    try:
        # 获取账户数据
        account_res = supabase.table("guru_accounts").select("*").eq("id", guru_id).execute()
        
        if not account_res.data:
            return jsonify({"success": False, "error": "Guru not found"}), 404
            
        account = account_res.data[0]
        
        # 获取工作室数据
        studio_res = supabase.table("guru_studios").select("*").eq("guru_id", guru_id).execute()
        studio = studio_res.data[0] if studio_res.data else {}

        # 获取国籍信息
        country_code = account.get('country')
        country_info = COUNTRY_MAPPING.get(country_code, {'name': '', 'flag': ''})

        # 构建响应
        profile = {
            "id": account.get('id'),
            "name": account.get('display_name') or account.get('real_name') or studio.get('name', 'Unknown Guru'),
            "avatar": account.get('profile_image_url'),
            "expertise": account.get('expertise', []),
            "bio": account.get('bio'),
            "phone": account.get('phone'),
            # ✨ 新增字段
            "country": country_code,
            "phone_prefix": account.get('phone_prefix'),
            "country_flag": country_info['flag'],  # 例: 🇨🇳
            "display_country": country_info['name'],  # 例: 中国
            "studio": {
                "name": studio.get('name'),
                "location": studio.get('location')
            },
            "stats": {
                "consultations": account.get('consultations_count', 0),
                "rating": account.get('rating', 5.0)
            }
        }
        
        return jsonify({"success": True, "data": profile}), 200

    except Exception as e:
        logging.error(f"Profile fetch error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# ============================================================================
# 可选: 获取所有国家列表的新端点
# ============================================================================

@guru_bp.route('/api/countries', methods=['GET'])
def get_countries():
    """
    返回所有支持的国家列表
    前端可以使用此端点动态生成国家下拉框（如需要）
    """
    try:
        countries_list = [
            {
                "code": code,
                "name_cn": info['name'],
                "flag": info['flag'],
                "phone_prefix": "+86" if code == "CN" else "+60"  # 示例，需要完整数据
            }
            for code, info in COUNTRY_MAPPING.items()
        ]
        
        return jsonify({
            "success": True,
            "data": countries_list
        }), 200
    except Exception as e:
        logging.error(f"Countries fetch error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# ============================================================================
# 集成步骤
# ============================================================================
# 
# 1. 复制 COUNTRY_MAPPING 字典到你的 guru_routes.py 文件顶部
#
# 2. 修改现有的 /api/otp/verify 端点（或类似的注册端点）以：
#    - 接收 country 和 phone_prefix 参数
#    - 将这些值保存到 guru_accounts 表
#
# 3. 修改 /api/guru/profile/<guru_id> 端点以：
#    - 从 guru_accounts 获取 country 字段
#    - 使用 COUNTRY_MAPPING 查找国家名称和标志
#    - 在响应中返回 country_flag 和 display_country
#
# 4. 可选：添加 /api/countries 端点以提供国家列表给前端
#
# 5. 更新前端 (guru-dashboard-main.html) 以显示国籍信息
#
# ============================================================================
