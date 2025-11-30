# Weight Tuner Engine - Flask backend
# Provides API endpoints for matching, family columns, leaderboard, and weight tuning.
from flask import Blueprint, request, jsonify, render_template, session
# from flask_cors import CORS # CORS handled by main app
import os
from .engines.family_engine import calculate_family_columns, interpret_family_column
from .engines.match_engine import calculate_composite_match, interpret_match_score
from .engines.leaderboard_engine import (
    calculate_leaderboard,
    get_top_leaderboard,
    get_dynamic_leaderboard,
    get_user_rank,
    recalculate_leaderboard,
    get_latest_weight_version
)
from .db.family_columns_db import insert_family_columns, get_family_columns_by_chart_id, upsert_family_columns
from .db.match_scores_db import insert_match_score, get_match_score, get_top_matches, upsert_match_score
from .supabase_client import test_connection
from .engines.weight_tuner import tune_weights
from .engines.time_match_agent import find_time_matches, build_criteria_text
from .engines.bazi_match_agent import run_bazi_match, build_bazi_criteria_text

bazi_bp = Blueprint('bazi', __name__, template_folder='templates', static_folder='static')
# CORS(bazi_bp) # Optional: configure if needed specific to blueprint

# ✅ Session configuration for birth time storage
# app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production') # Handled by main app
# app.config['SESSION_TYPE'] = 'filesystem' # Handled by main app

@bazi_bp.route('/')
def index():
    """主页 - 现代时间匹配页面"""
    return render_template('modernmatch.html')


@bazi_bp.route('/modernmatch')
def modernmatch_page():
    """现代时间匹配页面"""
    return render_template('modernmatch.html')


@bazi_bp.route('/api/match-same-life', methods=['POST'])
def match_same_life_api():
    """
    同命匹配 API
    
    请求体:
    {
        "mode": "fen"  // hour | point | ke | fen
    }
    
    响应:
    {
        "matches": [
            {
                "user_id": "abc123",
                "similarity": 98,
                "birth_time": "2000-03-20 08:18",
                "true_solar_time": "08:10"
            }
        ]
    }
    """
    data = request.json
    mode = data.get("mode", "fen")
    
    # TODO: 这里之后对接 Supabase RPC
    # 暂时用假数据测试
    
    # 模拟不同模式的匹配结果
    mock_data = {
        "hour": [
            {"user_id": "abc123def456", "similarity": 78, "birth_time": "2000-03-20 08:30", "true_solar_time": "08:22"},
            {"user_id": "ghi789jkl012", "similarity": 72, "birth_time": "2000-05-15 08:45", "true_solar_time": "08:37"},
            {"user_id": "mno345pqr678", "similarity": 68, "birth_time": "2000-07-08 08:15", "true_solar_time": "08:07"},
        ],
        "point": [
            {"user_id": "stu901vwx234", "similarity": 85, "birth_time": "2000-03-20 08:20", "true_solar_time": "08:12"},
            {"user_id": "yza567bcd890", "similarity": 82, "birth_time": "2000-04-12 08:25", "true_solar_time": "08:17"},
        ],
        "ke": [
            {"user_id": "efg123hij456", "similarity": 92, "birth_time": "2000-03-20 08:18", "true_solar_time": "08:10"},
            {"user_id": "klm789nop012", "similarity": 89, "birth_time": "2000-03-20 08:19", "true_solar_time": "08:11"},
            {"user_id": "qrs345tuv678", "similarity": 87, "birth_time": "2000-06-10 08:17", "true_solar_time": "08:09"},
            {"user_id": "wxy901zab234", "similarity": 84, "birth_time": "2000-08-22 08:16", "true_solar_time": "08:08"},
        ],
        "fen": [
            {"user_id": "cde567fgh890", "similarity": 98, "birth_time": "2000-03-20 08:18", "true_solar_time": "08:10"},
            {"user_id": "ijk123lmn456", "similarity": 96, "birth_time": "2000-03-20 08:18", "true_solar_time": "08:10"},
        ]
    }
    
    matches = mock_data.get(mode, [])
    
    return jsonify({
        "success": True,
        "mode": mode,
        "matches": matches
    })


@bazi_bp.route('/api/calc/family-columns', methods=['POST'])
def calc_family_columns():
    """
    计算父母柱数据
    
    请求体:
    {
        "chart_data": {
            "parents_palace": {
                "main_stars": ["太阳", "天府"],
                "transformations": {
                    "化禄": true,
                    "化权": false,
                    "化科": true,
                    "化忌": false
                }
            }
        }
    }
    
    响应:
    {
        "success": true,
        "family_data": {
            "father_presence": 65,
            "father_authority": 70,
            ...
        },
        "interpretation": {
            "father_summary": "...",
            "mother_summary": "...",
            "structure_type": {...}
        }
    }
    """
    try:
        data = request.json
        chart_data = data.get("chart_data", {})
        chart_id = data.get("chart_id")  # 可选：如果提供则保存到数据库
        save_to_db = data.get("save_to_db", False)  # 是否保存到数据库
        
        # 计算父母柱数据
        family_data = calculate_family_columns(chart_data)
        
        # 生成解读
        interpretation = interpret_family_column(family_data)
        
        # 如果提供了 chart_id 且要求保存，则保存到数据库
        db_record = None
        if save_to_db and chart_id:
            db_record = upsert_family_columns(chart_id, family_data)
        
        return jsonify({
            "success": True,
            "family_data": family_data,
            "interpretation": interpretation,
            "db_saved": db_record is not None,
            "db_record_id": db_record["id"] if db_record else None
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@bazi_bp.route('/api/family-columns/<int:chart_id>', methods=['GET'])
def get_family_columns(chart_id):
    """
    根据 chart_id 获取父母柱数据
    """
    try:
        record = get_family_columns_by_chart_id(chart_id)
        
        if record:
            # 重新生成解读
            interpretation = interpret_family_column(record)
            
            return jsonify({
                "success": True,
                "family_data": record,
                "interpretation": interpretation
            })
        else:
            return jsonify({
                "success": False,
                "error": "未找到该命盘的父母柱数据"
            }), 404
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@bazi_bp.route('/api/match/calculate', methods=['POST'])
def calculate_match():
    """
    计算两个命盘之间的三层匹配度
    
    请求体:
    {
        "chart_id_a": 12345,
        "chart_id_b": 67890,
        "chart_data_a": {"time_diff_minutes": 0},
        "chart_data_b": {"time_diff_minutes": 5},
        "family_data_a": {"father_presence": 65, ...},
        "family_data_b": {"father_presence": 70, ...},
        "save_to_db": true
    }
    
    响应:
    {
        "success": true,
        "match_data": {
            "time_score": 85,
            "father_score": 92,
            "mother_score": 88,
            "composite_score": 88
        },
        "interpretation": {
            "overall_interpretation": "...",
            "time_summary": "..."
        },
        "db_saved": true
    }
    """
    try:
        data = request.json
        
        chart_id_a = data.get("chart_id_a")
        chart_id_b = data.get("chart_id_b")
        chart_data_a = data.get("chart_data_a", {})
        chart_data_b = data.get("chart_data_b", {})
        family_data_a = data.get("family_data_a", {})
        family_data_b = data.get("family_data_b", {})
        save_to_db = data.get("save_to_db", False)
        
        # 计算三层匹配度
        match_data = calculate_composite_match(
            chart_data_a,
            chart_data_b,
            family_data_a,
            family_data_b
        )
        
        # 生成解读
        interpretation = interpret_match_score(match_data)
        
        # 如果提供了 chart_id 且要求保存，则保存到数据库
        db_saved = False
        db_record_id = None
        db_error = None
        
        if save_to_db and chart_id_a and chart_id_b:
            try:
                db_record = upsert_match_score(chart_id_a, chart_id_b, match_data)
                if db_record:
                    db_saved = True
                    db_record_id = db_record.get("id")
            except Exception as e:
                print(f"保存到数据库失败: {e}")
                db_error = str(e)
        
        return jsonify({
            "success": True,
            "match_data": match_data,
            "interpretation": interpretation,
            "db_saved": db_saved,
            "db_record_id": db_record_id,
            "db_error": db_error
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@bazi_bp.route('/api/supabase-test', methods=['GET'])
def supabase_test():
    """
    测试 Supabase 连接
    """
    try:
        is_connected = test_connection()
        
        if is_connected:
            return jsonify({
                "success": True,
                "message": "Supabase 连接成功！"
            })
        else:
            return jsonify({
                "success": False,
                "message": "Supabase 连接失败，请检查配置"
            }), 500
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@bazi_bp.route('/api/leaderboard/top', methods=['GET'])
def get_leaderboard_top():
    # 获取排行榜前 N 名
    # Query参数: limit (默认10), engine (默认time), exclude_user (排除用户ID)
    try:
        limit = request.args.get("limit", 10, type=int)
        engine = request.args.get("engine", "time")
        exclude_user = request.args.get("exclude_user", None, type=int)  # ✅ 新增：排除当前用户
        limit = min(limit, 100)  # 最多返回100条
        
        # 使用动态排行榜
        leaderboard = get_dynamic_leaderboard(engine, limit, exclude_user_id=exclude_user)
        
        weight_version = get_latest_weight_version()
        weight_version_id = weight_version.get("id") if weight_version else None
        
        return jsonify({
            "success": True,
            "leaderboard": leaderboard,
            "count": len(leaderboard),
            "weight_version_id": weight_version_id,
            "engine": engine
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@bazi_bp.route('/api/leaderboard/user/<int:user_id>', methods=['GET'])
def get_user_leaderboard_rank(user_id):
    # 获取指定用户的排名信息
    try:
        rank_info = get_user_rank(user_id)
        
        if rank_info:
            return jsonify({
                "success": True,
                "rank_info": rank_info
            })
        else:
            return jsonify({
                "success": False,
                "error": "用户排名不存在"
            }), 404
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@bazi_bp.route('/api/leaderboard/calculate', methods=['POST'])
def calculate_leaderboard_endpoint():
    # ???????(?????)
    try:
        result = recalculate_leaderboard()
        leaderboard = result.get("leaderboard", []) if isinstance(result, dict) else result
        weight_version_id = result.get("weight_version_id") if isinstance(result, dict) else None
        
        return jsonify({
            "success": True,
            "message": f"?????????{len(leaderboard)}???",
            "count": len(leaderboard),
            "weight_version_id": weight_version_id
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@bazi_bp.route('/api/weights/tune', methods=['POST'])
def tune_weights_endpoint():
    # 触发权重调优
    try:
        result = tune_weights()
        
        if result:
            version_id = result.get("weight_version_id")

            # === 联动排行榜刷新 ===
            leaderboard_result = recalculate_leaderboard(version_id)

            return jsonify({
                "status": "success",
                "success": True,
                "message": "Weights tuned & leaderboard updated",
                "version_id": version_id,
                "leaderboard_updated": True,
                "leaderboard": leaderboard_result.get("leaderboard") if isinstance(leaderboard_result, dict) else leaderboard_result,
                "result": result
            })
        else:
            return jsonify({
                "success": False,
                "message": "未找到最佳权重或样本不足"
            })
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@bazi_bp.route("/api/match/time")
def api_time_match():
    chart_id = request.args.get("chart_id", type=int)
    mode = request.args.get("mode", default="same_hour")

    matches = find_time_matches(chart_id, mode)
    criteria_text = build_criteria_text(mode)

    return jsonify({
        "mode": mode,
        "criteria_text": criteria_text,
        "count": len(matches),
        "results": matches
    })


@bazi_bp.route("/api/match/bazi")
def api_bazi_match():
    """八字同频匹配API"""
    chart_id = request.args.get("chart_id", type=int)
    mode = request.args.get("mode", default="same_yongshen")
    
    matches = run_bazi_match(chart_id, mode)
    criteria_text = build_bazi_criteria_text(mode)
    
    return jsonify({
        "mode": mode,
        "criteria_text": criteria_text,
        "count": len(matches),
        "results": matches
    })


@bazi_bp.route('/bazimatch')
def bazimatch_page():
    """八字同频匹配页面"""
    return render_template('bazimatch.html')


# ============================================================
# Birth Time Input Page Routes
# ============================================================

@bazi_bp.route('/birth-input')
def birth_input_page():
    """出生时间填写页面 - 命盘入口"""
    return render_template('index.html')


@bazi_bp.route('/api/calculate-true-solar-time', methods=['POST'])
def api_calculate_true_solar_time():
    """
    计算真太阳时
    
    Request body:
    {
        "solar_date": "2025-05-23",
        "solar_time": "21:29",
        "longitude": 116.40,
        "latitude": 39.90
    }
    """
    try:
        from .utils.true_solar_time import calculate_true_solar_time
        
        data = request.json
        solar_date = data['solar_date']
        solar_time = data['solar_time']
        longitude = data['longitude']
        latitude = data['latitude']
        
        true_solar_time = calculate_true_solar_time(solar_date, solar_time, longitude)
        
        return jsonify({
            "success": True,
            "true_solar_time": true_solar_time,
            "longitude": longitude,
            "latitude": latitude
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


@bazi_bp.route('/api/save-birth-time', methods=['POST'])
def api_save_birth_time():
    """
    保存出生时间到session并返回跳转URL
    
    Request body:
    {
        "name": "灵友",
        "gender": "男",
        "solar_date": "2025-05-23",
        "solar_time": "21:29",
        "birth_place": "北京市",
        "longitude": 116.40,
        "latitude": 39.90,
        "true_solar_time_enabled": true,
        ...
    }
    """
    try:
        from datetime import datetime
        from .utils.true_solar_time import calculate_true_solar_time
        
        data = request.json
        
        # Calculate true solar time if enabled
        solar_date = data['solar_date']
        solar_time = data['solar_time']
        longitude = data.get('longitude', 116.40)
        latitude = data.get('latitude', 39.90)
        
        if data.get('true_solar_time_enabled', True):
            true_solar_time = calculate_true_solar_time(solar_date, solar_time, longitude)
        else:
            true_solar_time = f"{solar_date} {solar_time}:00"
        
        # Parse and derive 7-level structure
        dt = datetime.strptime(true_solar_time, "%Y-%m-%d %H:%M:%S")
        
        year = dt.year
        month = dt.month
        day = dt.day
        hour = dt.hour
        minute = dt.minute
        
        # Shichen mapping
        SHICHEN_MAP = {
            23: '子', 0: '子', 1: '丑', 2: '丑', 3: '寅', 4: '寅',
            5: '卯', 6: '卯', 7: '辰', 8: '辰', 9: '巳', 10: '巳',
            11: '午', 12: '午', 13: '未', 14: '未', 15: '申', 16: '申',
            17: '酉', 18: '酉', 19: '戌', 20: '戌', 21: '亥', 22: '亥'
        }
        chinese_shichen = SHICHEN_MAP.get(hour, '子')
        quarter_15min = minute // 15
        
        # Save to session
        session['birth_time'] = {
            "name": data.get('name', '灵友'),
            "gender": data.get('gender', '男'),
            "solar_date": solar_date,
            "solar_time": solar_time,
            "true_solar_time": true_solar_time,
            "birth_place": data.get('birth_place', '北京市'),
            "longitude": longitude,
            "latitude": latitude,
            
            # 7-level structure
            "year": year,
            "month": month,
            "day": day,
            "chinese_shichen": chinese_shichen,
            "modern_hour": hour,
            "hour": hour,  # Backward compat
            "minute": minute,
            "quarter_15min": quarter_15min,
            
            # Legacy fields for compatibility
            "point_column": minute,
            "ke_column": quarter_15min,
            "fen_column": 0,
            "micro_fen_column": 0
        }
        
        return jsonify({
            "success": True,
            "redirect_url": "/modernmatch",
            "message": "出生时间已保存"
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"保存失败: {str(e)}"
        }), 400


@bazi_bp.route('/api/get-current-user', methods=['GET'])
def api_get_current_user():
    """获取当前用户的出生时间信息（从session）"""
    birth_time = session.get('birth_time', {})
    
    if not birth_time:
        # Fallback: return empty/default user
        return jsonify({
            "success": False,
            "message": "未找到出生时间，请先填写",
            "name": "灵友",
            "uid": "未设置",
            "solar_date": "---",
            "solar_time": "---",
            "true_solar_time": "--- ---"
        })
    
    return jsonify({
        "success": True,
        "name": birth_time.get("name", "灵友"),
        "gender": birth_time.get("gender", "男"),
        "uid": "自定义",
        "solar_date": birth_time["solar_date"],
        "solar_time": birth_time["solar_time"],
        "true_solar_time": birth_time["true_solar_time"],
        "birth_place": birth_time.get("birth_place", "未知"),
        **birth_time  # Include all 7-level fields
    })
