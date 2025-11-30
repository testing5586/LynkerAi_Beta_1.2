"""Test script to verify modernmatch_unified.html renders correctly"""

from main import create_app

app = create_app()

with app.test_request_context():
    from flask import render_template
    
    # Mock data matching the template expectations
    birth_data = {
        'name': '测试用户',
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
    ]
    
    filters = {
        'same_year': True,
        'same_month': False,
        'same_day': False,
        'same_shichen': False,
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
        }
    ]
    
    try:
        html = render_template('modernmatch_unified.html',
                             birth_data=birth_data,
                             leaderboard=leaderboard,
                             filters=filters,
                             matches=matches)
        print("✓ Template renders successfully!")
        print(f"HTML length: {len(html)} characters")
    except Exception as e:
        print(f"✗ Template error: {e}")
        import traceback
        traceback.print_exc()
