from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify
from datetime import datetime
import sys
import os

# Try to import utils, handle if not found (for robustness)
try:
    from ..utils.solar_time import calculate_true_solar_time, get_shichen
except ImportError:
    def calculate_true_solar_time(dt_str, lng, tz):
        return {"true_solar_datetime": dt_str}
    def get_shichen(h):
        return "Unknown"

# Define Blueprints
birth_input_bp = Blueprint('birth_input', __name__)
api_bp = Blueprint('api', __name__, url_prefix='/api')
modernmatch_bp = Blueprint('modernmatch', __name__, url_prefix='/bazi/modernmatch')
bazi_bp = Blueprint('bazi', __name__, url_prefix='/bazi')
ziwei_bp = Blueprint('ziwei', __name__, url_prefix='/ziwei')

# --- Helper Functions ---
def get_current_birth_data():
    return session.get('birth_data', {})

# --- Birth Input Routes ---

@birth_input_bp.route('/birth-input', methods=['GET', 'POST'])
def birth_input_form():
    # Handle Form Submission
    if request.method == 'POST':
        try:
            # Extract form data
            name = request.form.get('name')
            gender = request.form.get('gender')
            
            birth_date_str = request.form.get('birth_date')
            birth_time_str = request.form.get('birth_time')
            location_code = request.form.get('location')

            if not birth_date_str or not birth_time_str:
                 return "Date and Time are required", 400

            # Parse date and time
            try:
                # birth_date is usually YYYY-MM-DD, birth_time is HH:MM
                dt_str = f"{birth_date_str} {birth_time_str}"
                if len(birth_time_str) == 5: # HH:MM
                     dt_str += ":00"
                
                dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S")
                hour = dt.hour
                
                birth_time_str = dt.strftime("%Y-%m-%d %H:%M:%S")
                
            except ValueError:
                 return "Invalid date/time format received", 400

            # Location mapping
            coords_map = {
                'beijing': {'name': '北京市', 'lng': 116.41},
                'shanghai': {'name': '上海市', 'lng': 121.47},
                'guangzhou': {'name': '广州市', 'lng': 113.26},
                'hong_kong': {'name': '香港', 'lng': 114.17},
                'taipei': {'name': '台北', 'lng': 121.57},
                'singapore': {'name': '新加坡', 'lng': 103.82},
                'kuala_lumpur': {'name': '吉隆坡', 'lng': 101.69}
            }
            location_info = coords_map.get(location_code, {'name': 'Default (120°E)', 'lng': 120.0})

            # Calculate True Solar Time
            tst_result = calculate_true_solar_time(birth_time_str, location_info['lng'], "+08:00")
            true_solar_time = tst_result.get('true_solar_datetime', birth_time_str)

            shichen = get_shichen(hour)

            # Store in session
            session['birth_data'] = {
                'name': name or "灵友",
                'gender': gender,
                'local_datetime': birth_time_str,
                'true_solar_datetime': true_solar_time,
                'location': location_info,
                'shichen': shichen,
                'uid': '8829301' # Mock UID
            }

            return redirect(url_for('birth_input.dashboard'))
            
        except Exception as e:
            print(f"Error processing birth data: {e}")
            return f"Processing Error: {e}", 500
            
    # Handle GET Request (Render Form)
    return render_template('birth_input.html')

@birth_input_bp.route('/dashboard')
def dashboard():
    birth_data = get_current_birth_data()
    if not birth_data:
        return redirect(url_for('birth_input.birth_input_form'))
        
    # Mock chart summary status
    chart_summary = {
        'time_layers': {'ready': True},
        'bazi': {'ready': True},
        'ziwei': {'ready': True}
    }
    return render_template('dashboard.html', birth_data=birth_data, chart_summary=chart_summary)

@birth_input_bp.route('/clear-session')
def clear_session():
    session.clear()
    return redirect(url_for('birth_input.birth_input_form'))

# --- ModernMatch Routes ---
@modernmatch_bp.route('/')
def modernmatch_index():
    birth_data = get_current_birth_data()
    
    # Mock Data for ModernMatch
    matches = [
        {
            'friend_id': '1001', 
            'score': 98, 
            'summary': '完美同频 (Perfect Resonance)', 
            'same_year': True, 
            'same_month': True,
            'same_day': True,
            'same_shichen': True,
            'tags': ['天干合', '地支合']
        },
        {
            'friend_id': '1002', 
            'score': 88, 
            'summary': '高度同频 (High Resonance)', 
            'same_year': False, 
            'same_month': True,
            'same_day': True,
            'same_shichen': False,
            'tags': ['月柱同']
        }
    ]
    leaderboard = [
        {'friend_id': '1001', 'match_count': 12, 'verify_count': 5, 'final_score': 98},
        {'friend_id': '1002', 'match_count': 8, 'verify_count': 3, 'final_score': 88}
    ]
    filters = {'same_year': True, 'same_month': False}
    
    return render_template('modernmatch_unified_v3.html', 
                         birth_data=birth_data, 
                         matches=matches, 
                         leaderboard=leaderboard,
                         filters=filters)

@modernmatch_bp.route('/detail/<friend_id>')
def modernmatch_detail(friend_id):
    return f"ModernMatch Detail for {friend_id}"

# --- Bazi Routes ---
@bazi_bp.route('/match')
def bazi_match():
    birth_data = get_current_birth_data()

    # Mock Bazi data structure
    bazi_mock = {
        'four_pillars': {
            'year': {'stem': '甲', 'branch': '子'},
            'month': {'stem': '丙', 'branch': '寅'},
            'day': {'stem': '戊', 'branch': '辰'},
            'hour': {'stem': '庚', 'branch': '申'}
        },
        'pending': False
    }

    # Mock Matches
    matches_mock = [
        {
            'friend_id': '202',
            'score': 88,
            'bazi_code': '甲子·丙寅·戊辰·庚申',
            'same_year_pillar': True,
            'same_month_pillar': False,
            'same_day_pillar': False,
            'same_hour_pillar': False,
            'same_stem_structure': True,
            'same_branch_structure': False,
            'same_pattern': False,
            'same_yongshen': False
        },
        {
            'friend_id': '305',
            'score': 92,
            'bazi_code': '甲子·丙寅·戊辰·壬戌',
            'same_year_pillar': True,
            'same_month_pillar': True,
            'same_day_pillar': True,
            'same_hour_pillar': False,
            'same_stem_structure': True,
            'same_branch_structure': True,
            'same_pattern': True,
            'same_yongshen': False
        }
    ]

    # Mock Leaderboard
    leaderboard_mock = [
        {'friend_id': '305', 'match_count': 15, 'verify_count': 8, 'final_score': 92},
        {'friend_id': '202', 'match_count': 5, 'verify_count': 2, 'final_score': 88}
    ]

    # Mock Filters
    filters_mock = {
        'same_year_pillar': True,
        'same_month_pillar': False,
        'same_day_pillar': False,
        'same_hour_pillar': False,
        'same_stem_structure': False,
        'same_branch_structure': False,
        'same_pattern': False,
        'same_yongshen': False
    }

    return render_template('bazi_unified.html',
                         birth_data=birth_data,
                         bazi=bazi_mock,
                         matches=matches_mock,
                         leaderboard=leaderboard_mock,
                         filters=filters_mock,
                         active_mode_label="演示模式")

@bazi_bp.route('/detail/<friend_id>')
def bazi_detail(friend_id):
    return f"Bazi Detail for {friend_id}"

# --- Ziwei Routes ---
@ziwei_bp.route('/match')
def ziwei_match():
    birth_data = get_current_birth_data()
    return render_template('ziwei_unified.html', birth_data=birth_data, matches=[], leaderboard=[])

@ziwei_bp.route('/detail/<friend_id>')
def ziwei_detail(friend_id):
    return f"Ziwei Detail for {friend_id}"

# --- API Routes (Mock) ---
@api_bp.route('/get-current-user')
def get_current_user():
    data = get_current_birth_data()
    if not data:
        return jsonify({'success': False})
    
    # Format for frontend
    local_dt = data.get('local_datetime', '')
    true_dt = data.get('true_solar_datetime', '')
    
    return jsonify({
        'success': True,
        'name': data.get('name'),
        'uid': data.get('uid'),
        'solar_date': local_dt.split(' ')[0] if local_dt else '',
        'solar_time': local_dt.split(' ')[1] if local_dt else '',
        'true_solar_time': true_dt
    })

@api_bp.route('/match/bazi')
def match_bazi():
    # Mock results for BaziMatch
    mode = request.args.get('mode', 'same_year_pillar')
    chart_id = request.args.get('chart_id', '1')
    
    results = [
        {
            'chart_id': '202',
            'score': 88,
            'score_label': '88分匹配',
            'bazi_code': '甲子·丙寅·戊辰·庚申',
            'criteria_text': f'匹配模式: {mode}',
            'matched_flags': {
                'same_year_pillar': True,
                'same_month_pillar': mode in ['same_month_pillar', 'same_day_pillar', 'same_hour_pillar', 'same_tiangan', 'same_dizhi', 'same_pattern', 'same_yongshen'],
                'same_day_pillar': mode in ['same_day_pillar', 'same_hour_pillar', 'same_tiangan', 'same_dizhi', 'same_pattern', 'same_yongshen'],
                'same_hour_pillar': mode in ['same_hour_pillar', 'same_tiangan', 'same_dizhi', 'same_pattern', 'same_yongshen'],
                'same_tiangan': mode in ['same_tiangan', 'same_dizhi', 'same_pattern', 'same_yongshen'],
                'same_dizhi': mode in ['same_dizhi', 'same_pattern', 'same_yongshen'],
                'same_pattern': mode in ['same_pattern', 'same_yongshen'],
                'same_yongshen': mode == 'same_yongshen'
            },
            'auto_derived': False
        }
    ]
    return jsonify({'results': results, 'criteria_text': f'当前模式: {mode}'})

@api_bp.route('/match/time')
def match_time():
    # Mock results for ModernMatch
    results = [
        {
            'chart_id': '1001',
            'match_score': 98,
            'time_layer_code': 'MOCK_CODE_123',
            'criteria_text': '完美同频 (Perfect Resonance)'
        },
        {
            'chart_id': '1002',
            'match_score': 88,
            'time_layer_code': 'MOCK_CODE_456',
            'criteria_text': '高度同频 (High Resonance)'
        }
    ]
    return jsonify({'results': results})

@api_bp.route('/leaderboard/top')
def leaderboard_top():
    # Mock leaderboard data
    leaderboard = [
        {'user_id': '1001', 'match_count': 12, 'verified_count': 5, 'final_score': 0.98, 'display_score': 98},
        {'user_id': '1002', 'match_count': 8, 'verified_count': 3, 'final_score': 0.88, 'display_score': 88},
        {'user_id': '1003', 'match_count': 6, 'verified_count': 2, 'final_score': 0.75, 'display_score': 75}
    ]
    return jsonify({
        'leaderboard': leaderboard,
        'weight_version_id': '1.0'
    })
