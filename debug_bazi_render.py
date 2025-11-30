
from flask import Flask, render_template
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__, template_folder='lynker_bazi_engine/templates')
app.secret_key = 'test'

@app.route('/')
def test_render():
    birth_data = {
        'name': 'Test User',
        'gender': 'male',
        'location': {'name': 'Test City'},
        'true_solar_datetime': '2023-01-01 12:00:00',
        'shichen': 'Wu'
    }
    bazi_mock = {
        'four_pillars': {
            'year': {'stem': '甲', 'branch': '子'},
            'month': {'stem': '丙', 'branch': '寅'},
            'day': {'stem': '戊', 'branch': '辰'},
            'hour': {'stem': '庚', 'branch': '申'}
        }
    }
    try:
        return render_template('bazi_unified.html', 
                             birth_data=birth_data, 
                             bazi=bazi_mock,
                             matches=[], 
                             leaderboard=[])
    except Exception as e:
        import traceback
        return f"Error: {e}\n\nTraceback:\n{traceback.format_exc()}"

if __name__ == "__main__":
    with app.test_request_context():
        print(test_render())
