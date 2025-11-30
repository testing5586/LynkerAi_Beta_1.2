"""
Fixed birth input routes with mock data for all templates
"""
from flask import Blueprint, render_template, request, redirect, url_for, session

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
    return render_template('dashboard.html', birth_data=birth_data)

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
    birth_data = session.get('birth_data') or {
        'name': '访客',
        'year': 1990,
        'month': 1,
        'day': 1,
        'hour': 12,
        'minute': 0,
        'solar_time': '12:00',
        'shichen': '午时',
        'quarter': '初刻'
    }
    
    leaderboard = [
        {'friend_id': '10001', 'match_count': 12, 'verify_count': 8, 'final_score': 98},
        {'friend_id': '10002', 'match_count': 10, 'verify_count': 7, 'final_score': 95},
        {'friend_id': '10003', 'match_count': 8, 'verify_count': 5, 'final_score': 92},
    ]
    
    filters = {
        'same_year': True,
        'same_month': False,
        'same_day': False,
        'same_shichen': False,
        'same_hour': False,
        'same_quarter': False,
        'same_minute': False,
    }
    
    matches = [
        {
            'friend_id': '10001',
            'score': 98,
            'summary': '完美同频',
            'same_year': True,
            'same_month': True,
            'same_day': True,
            'same_shichen': True,
            'same_hour': True,
            'same_quarter': False,
            'same_minute': False,
        },
        {
            'friend_id': '10002',
            'score': 85,
            'summary': '高度同频',
            'same_year': True,
            'same_month': True,
            'same_day': False,
            'same_shichen': True,
            'same_hour': False,
            'same_quarter': False,
            'same_minute': False,
        },
    ]
    
    return render_template('modernmatch_unified.html',
                         birth_data=birth_data,
                         leaderboard=leaderboard,
                         filters=filters,
                         matches=matches)


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
    
    return render_template('bazi_unified.html',
                         birth_data=birth_data,
                         leaderboard=leaderboard,
                         filters=filters,
                         matches=matches,
                         active_mode_label='7 项条件生效')


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
    
    return render_template('ziwei_unified.html',
                         birth_data=birth_data,
                         leaderboard=leaderboard,
                         matches=matches)
