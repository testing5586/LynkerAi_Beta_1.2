"""
Fixed birth input routes with mock data for all templates (v3).
Includes shared mock data helpers and public API endpoints for ModernMatch.
"""

from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify

TIME_LAYER_STEPS = [
    ("same_year", "同年"),
    ("same_month", "同月"),
    ("same_day", "同日"),
    ("same_shichen", "同时辰"),
    ("same_hour", "同小时"),
    ("same_quarter", "同刻"),
    ("same_minute", "同分"),
]

TIME_LAYER_KEYS = [step[0] for step in TIME_LAYER_STEPS]
TIME_LAYER_LABEL_MAP = {key: label for key, label in TIME_LAYER_STEPS}

DEFAULT_FILTER_STATE = {
    "same_year": True,
    "same_month": False,
    "same_day": False,
    "same_shichen": False,
    "same_hour": False,
    "same_quarter": False,
    "same_minute": False,
}


def get_default_birth_profile():
    return {
        "name": "访客",
        "uid": "10000",
        "year": 1990,
        "month": 1,
        "day": 1,
        "hour": 12,
        "minute": 0,
        "solar_time": "12:00",
        "true_solar_time": "12:07",
        "shichen": "午时",
        "quarter": "初刻",
        "location": "北京",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    }


def get_current_birth_data():
    profile = get_default_birth_profile()
    stored = session.get("birth_data")
    if isinstance(stored, dict):
        profile.update({k: v for k, v in stored.items() if v is not None})
    return profile


def get_mock_leaderboard():
    return [
        {"friend_id": "10001", "match_count": 12, "verify_count": 8, "final_score": 98},
        {"friend_id": "10002", "match_count": 10, "verify_count": 7, "final_score": 95},
        {"friend_id": "10003", "match_count": 8, "verify_count": 5, "final_score": 92},
    ]


def get_mock_filters():
    return DEFAULT_FILTER_STATE.copy()


def get_mock_matches():
    return [
        {
            "friend_id": "10001",
            "score": 98,
            "summary": "完美同频",
            "same_year": True,
            "same_month": True,
            "same_day": True,
            "same_shichen": True,
            "same_hour": True,
            "same_quarter": False,
            "same_minute": False,
        },
        {
            "friend_id": "10002",
            "score": 85,
            "summary": "高度同频",
            "same_year": True,
            "same_month": True,
            "same_day": True,
            "same_shichen": False,
            "same_hour": False,
            "same_quarter": False,
            "same_minute": False,
        },
        {
            "friend_id": "10003",
            "score": 72,
            "summary": "结构相似",
            "same_year": True,
            "same_month": True,
            "same_day": False,
            "same_shichen": True,
            "same_hour": False,
            "same_quarter": False,
            "same_minute": False,
        },
    ]


def normalize_mode(mode: str) -> str:
    if mode in TIME_LAYER_KEYS:
        return mode
    return TIME_LAYER_KEYS[-1]


def build_match_response(mode: str):
    normalized_mode = normalize_mode(mode)
    active_keys = TIME_LAYER_KEYS[: TIME_LAYER_KEYS.index(normalized_mode) + 1]
    label_chain = " · ".join(TIME_LAYER_LABEL_MAP[k] for k in active_keys)

    filtered_results = []
    for match in get_mock_matches():
        if all(match.get(key) for key in active_keys):
            filtered_results.append(
                {
                    "chart_id": match["friend_id"],
                    "match_score": match["score"],
                    "match_summary": match.get("summary", "同频结构匹配中"),
                    "matching_flags": {key: bool(match.get(key)) for key in TIME_LAYER_KEYS},
                    "matched_layers": [TIME_LAYER_LABEL_MAP[key] for key in active_keys if match.get(key)],
                }
            )

    criteria_text = f"满足 {len(active_keys)} 项条件：{label_chain}"
    return normalized_mode, criteria_text, filtered_results


def _format_solar_date(birth_data):
    try:
        year = int(birth_data.get("year"))
        month = int(birth_data.get("month"))
        day = int(birth_data.get("day"))
        return f"{year:04d}-{month:02d}-{day:02d}"
    except (TypeError, ValueError):
        return "---"


def _format_solar_time(birth_data):
    try:
        hour = int(birth_data.get("hour"))
        minute = int(birth_data.get("minute"))
        return f"{hour:02d}:{minute:02d}"
    except (TypeError, ValueError):
        return "--:--"


# Birth input blueprint (no prefix - root level routes)
birth_input_bp = Blueprint('birth_input', __name__)


@birth_input_bp.route('/birth-input', methods=['GET'])
def birth_input_form():
    """Display birth input form"""
    return render_template('birth_input.html')


@birth_input_bp.route('/birth-input', methods=['POST'])
def process_birth_data():
    """Process birth data submission"""
    birth_data = {
        'name': request.form.get('name'),
        'year': int(request.form.get('year')),
        'month': int(request.form.get('month')),
        'day': int(request.form.get('day')),
        'hour': int(request.form.get('hour')),
        'minute': int(request.form.get('minute')),
    }
    session['birth_data'] = birth_data
    return redirect(url_for('birth_input.dashboard'))


@birth_input_bp.route('/dashboard')
def dashboard():
    """Display dashboard"""
    birth_data = session.get('birth_data', {})
    chart_summary = {
        "time_layers": {
            "ready": True,
            "coverage": "7 层结构",
            "notes": "已载入毫秒级数据",
        },
        "bazi": {
            "ready": True,
            "pending": False,
            "insight": "四柱结构完整",
        },
        "ziwei": {
            "ready": True,
            "pending": False,
            "insight": "命宫守护完成校准",
        },
    }

    return render_template('dashboard.html', birth_data=birth_data, chart_summary=chart_summary)


@birth_input_bp.route('/clear-session')
def clear_session():
    """Clear session data"""
    session.clear()
    return redirect(url_for('birth_input.birth_input_form'))


# ModernMatch blueprint (with /bazi prefix)
modernmatch_bp = Blueprint('modernmatch', __name__, url_prefix='/bazi')


@modernmatch_bp.route('/modernmatch')
def modernmatch():
    """ModernMatch page with mock data"""
    birth_data = get_current_birth_data()
    leaderboard = get_mock_leaderboard()
    filters = get_mock_filters()
    matches = get_mock_matches()

    return render_template(
        'modernmatch_unified_v3.html',
        birth_data=birth_data,
        leaderboard=leaderboard,
        filters=filters,
        matches=matches,
    )


@modernmatch_bp.route('/detail/<friend_id>')
def modernmatch_detail(friend_id):
    """Placeholder for modernmatch detail"""
    return f"ModernMatch Detail for {friend_id} (Coming Soon)"


# API blueprint (with /api prefix)
api_bp = Blueprint('api', __name__, url_prefix='/api')


@api_bp.route('/get-current-user')
def api_get_current_user():
    """Return the active user's time profile from the session"""
    birth_data = get_current_birth_data()
    solar_time = birth_data.get('solar_time') or _format_solar_time(birth_data)
    true_solar_time = birth_data.get('true_solar_time') or solar_time

    return jsonify({
        'success': True,
        'uid': birth_data.get('uid', '10000'),
        'name': birth_data.get('name', '灵友'),
        'solar_date': _format_solar_date(birth_data),
        'solar_time': solar_time,
        'true_solar_time': true_solar_time,
        'shichen': birth_data.get('shichen', '未知时辰'),
        'quarter': birth_data.get('quarter', '未知刻度'),
        'location': birth_data.get('location', '未提供'),
    })


@api_bp.route('/match/time')
def api_match_time():
    """Return filtered matches for the requested time-layer mode"""
    requested_mode = request.args.get('mode', 'same_minute')
    normalized_mode, criteria_text, results = build_match_response(requested_mode)

    return jsonify({
        'success': True,
        'mode': normalized_mode,
        'criteria_text': criteria_text,
        'results': results,
        'total': len(results),
    })


@api_bp.route('/leaderboard/top')
def api_leaderboard_top():
    """Return leaderboard data for ModernMatch"""
    limit = request.args.get('limit', default=5, type=int) or 5
    exclude_user = request.args.get('exclude_user')

    leaderboard = get_mock_leaderboard()
    if exclude_user is not None:
        leaderboard = [item for item in leaderboard if str(item['friend_id']) != str(exclude_user)]

    payload = []
    for item in leaderboard[:limit]:
        payload.append({
            'user_id': item['friend_id'],
            'match_count': item['match_count'],
            'verified_count': item['verify_count'],
            'final_score': round(item['final_score'] / 100, 4),
            'display_score': item['final_score'],
        })

    return jsonify({
        'success': True,
        'weight_version_id': '0.92',
        'leaderboard': payload,
    })


@api_bp.route('/calc/family-columns', methods=['POST'])
def api_calc_family_columns():
    """Mock endpoint for family column calculations"""
    payload = request.get_json(silent=True) or {}

    family_data = {
        'structure_type': '双核心 · 互补型',
        'stability_index': 0.82,
        'key_traits': ['父母协同', '结构稳定', '守护星强化'],
    }

    interpretation = {
        'summary': '父母宫呈现双核心守护组合，利于资源共鸣与家庭守护力。',
        'recommendations': [
            '保持真太阳时记录，便于后续迭代算法复现。',
            '建议增加验证样本，提升排行榜权重。',
            '可邀请灵友进行互验证，获取更多同频标签。',
        ],
        'received_payload': payload.get('chart_data'),
    }

    return jsonify({
        'success': True,
        'family_data': family_data,
        'interpretation': interpretation,
    })


# Bazi blueprint (with /bazi prefix)
bazi_bp = Blueprint('bazi', __name__, url_prefix='/bazi')


@bazi_bp.route('/match')
def bazi_page():
    """Bazi match page with mock data"""
    birth_data = session.get('birth_data') or {
        'name': '访客',
        'year': 1990,
        'month': 1,
        'day': 1,
        'hour': 12,
        'minute': 0,
    }

    leaderboard = [
        {'friend_id': '10001', 'match_count': 10, 'verify_count': 6, 'final_score': 95},
        {'friend_id': '10002', 'match_count': 8, 'verify_count': 5, 'final_score': 88},
    ]

    filters = {
        'same_year_pillar': True,
        'same_month_pillar': False,
        'same_day_pillar': False,
        'same_hour_pillar': False,
        'same_stem_structure': False,
        'same_branch_structure': False,
        'same_pattern': False,
        'same_yongshen': False,
    }

    matches = [
        {
            'friend_id': '10001',
            'score': 85,
            'bazi_code': '庚辰·戊寅·丁未·壬子',
            'same_year_pillar': True,
            'same_month_pillar': False,
            'same_day_pillar': True,
            'same_hour_pillar': False,
            'same_stem_structure': False,
            'same_branch_structure': False,
            'same_pattern': False,
            'same_yongshen': False,
        },
    ]

    bazi_data = {
        'four_pillars': {
            'year': {'stem': '庚', 'branch': '辰'},
            'month': {'stem': '戊', 'branch': '寅'},
            'day': {'stem': '丁', 'branch': '未'},
            'hour': {'stem': '壬', 'branch': '子'},
        },
        'pending': False,
    }

    return render_template(
        'bazi_unified_v2.html',
        birth_data=birth_data,
        leaderboard=leaderboard,
        filters=filters,
        matches=matches,
        bazi=bazi_data,
        active_mode_label='7 项条件生效',
    )


@bazi_bp.route('/detail/<friend_id>')
def bazi_detail(friend_id):
    """Placeholder for bazi detail"""
    return f"Bazi Detail for {friend_id} (Coming Soon)"


# Ziwei blueprint (with /ziwei prefix)
ziwei_bp = Blueprint('ziwei', __name__, url_prefix='/ziwei')


@ziwei_bp.route('/match')
def ziwei_page():
    """Ziwei match page with mock data"""
    birth_data = session.get('birth_data') or {
        'name': '访客',
        'year': 1990,
        'month': 1,
        'day': 1,
        'hour': 12,
        'minute': 0,
    }

    leaderboard = [
        {'friend_id': '10001', 'match_count': 8, 'verify_count': 5, 'final_score': 90},
        {'friend_id': '10002', 'match_count': 6, 'verify_count': 4, 'final_score': 82},
    ]

    matches = [
        {
            'friend_id': '10001',
            'score': 88,
            'summary': '命宫天府 · 身宫同落 · 福德武贪',
            'tags': ['命宫相似', '身宫同落', '福德宫同构'],
        },
        {
            'friend_id': '10002',
            'score': 75,
            'summary': '命宫紫微 · 三方相似',
            'tags': ['命宫主星同', '三方四正'],
        },
    ]

    return render_template(
        'ziwei_unified_v2.html',
        birth_data=birth_data,
        leaderboard=leaderboard,
        matches=matches,
    )


@ziwei_bp.route('/detail/<friend_id>')
def ziwei_detail(friend_id):
    """Placeholder for ziwei detail"""
    return f"Ziwei Detail for {friend_id} (Coming Soon)"


__all__ = [
    'birth_input_bp',
    'modernmatch_bp',
    'bazi_bp',
    'ziwei_bp',
    'api_bp',
    'get_current_birth_data',
]
