
import os
import sys
from flask import Flask, render_template

# Add workspace root to sys.path
sys.path.insert(0, os.getcwd())

# Create a minimal Flask app context
app = Flask(__name__, 
            template_folder='lynker_bazi_engine/templates',
            static_folder='lynker_bazi_engine/static')

# Mock url_for to avoid RuntimeError in debug script
def mock_url_for(endpoint, **values):
    return f"/mock/{endpoint}"

app.jinja_env.globals['url_for'] = mock_url_for

# Mock data based on what we expect the template needs
birth_data_mock = {
    'name': 'Debug User',
    'gender': 'male',
    'location': {'name': 'Test City'},
    'local_datetime': '2023-01-01T12:00:00',
    'true_solar_datetime': '2023-01-01T12:00:00',
    'shichen': 'Wu'
}

bazi_mock = {
    'four_pillars': {
        'year': {'stem': 'Jia', 'branch': 'Zi'},
        'month': {'stem': 'Yi', 'branch': 'Chou'},
        'day': {'stem': 'Bing', 'branch': 'Yin'},
        'hour': {'stem': 'Ding', 'branch': 'Mao'}
    },
    'pending': False
}

leaderboard_mock = [
    {'friend_id': '101', 'match_count': 5, 'verify_count': 2, 'final_score': 90}
]

matches_mock = [
    {
        'friend_id': '202',
        'score': 88,
        'bazi_code': 'JiaZi-YiChou-BingYin-DingMao',
        'same_year_pillar': True,
        'same_month_pillar': False,
        'same_day_pillar': False,
        'same_hour_pillar': False,
        'same_stem_structure': True,
        'same_branch_structure': False,
        'same_pattern': False,
        'same_yongshen': False
    }
]

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

with app.app_context():
    try:
        print("Attempting to render bazi_unified.html...")
        rendered = render_template(
            'bazi_unified.html',
            birth_data=birth_data_mock,
            bazi=bazi_mock,
            leaderboard=leaderboard_mock,
            matches=matches_mock,
            filters=filters_mock,
            active_mode_label="Debug Mode",
            current_user_avatar=None,
            current_user_uid="DEBUG123"
        )
        print("Successfully rendered template!")
        print("Length:", len(rendered))
    except Exception as e:
        print("\n!!! RENDER FAILED !!!")
        print(e)
        import traceback
        traceback.print_exc()
