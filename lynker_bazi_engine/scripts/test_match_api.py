"""
快速测试匹配引擎 API
"""
import requests
import json

# 测试数据
test_data = {
    "chart_id_a": 12345,
    "chart_id_b": 67890,
    "chart_data_a": {
        "time_diff_minutes": 0
    },
    "chart_data_b": {
        "time_diff_minutes": 5
    },
    "family_data_a": {
        "father_presence": 65,
        "father_authority": 70,
        "father_resource": 75,
        "father_conflict": 50,
        "father_distance": 50,
        "mother_presence": 70,
        "mother_bond": 80,
        "mother_nurture": 70,
        "mother_control": 35,
        "mother_empty": 30
    },
    "family_data_b": {
        "father_presence": 70,
        "father_authority": 65,
        "father_resource": 80,
        "father_conflict": 45,
        "father_distance": 55,
        "mother_presence": 75,
        "mother_bond": 75,
        "mother_nurture": 72,
        "mother_control": 40,
        "mother_empty": 35
    },
    "save_to_db": False
}

print("=" * 60)
print("测试匹配引擎 API")
print("=" * 60)
print()

try:
    print("正在调用 /api/match/calculate...")
    response = requests.post(
        "http://localhost:5000/api/match/calculate",
        json=test_data,
        timeout=5
    )
    
    print(f"状态码: {response.status_code}")
    print()
    
    if response.status_code == 200:
        data = response.json()
        
        if data.get("success"):
            print("✓ API 调用成功！")
            print()
            
            match_data = data.get("match_data", {})
            interpretation = data.get("interpretation", {})
            
            print("【三层评分】")
            print(f"  时间结构: {match_data.get('time_score')}分")
            print(f"  父柱相似度: {match_data.get('father_score')}分")
            print(f"  母柱相似度: {match_data.get('mother_score')}分")
            print(f"  综合匹配度: {match_data.get('composite_score')}分")
            print()
            
            print("【权重配置】")
            print(f"  时间: {match_data.get('time_weight')}%")
            print(f"  父柱: {match_data.get('father_weight')}%")
            print(f"  母柱: {match_data.get('mother_weight')}%")
            print()
            
            print("【解读】")
            print(f"  总体: {interpretation.get('overall_interpretation')}")
            print(f"  时间: {interpretation.get('time_summary')}")
            print(f"  父柱: {interpretation.get('father_summary')}")
            print(f"  母柱: {interpretation.get('mother_summary')}")
            print()
            
            print("=" * 60)
            print("✓✓✓ 匹配引擎测试通过！")
            print("=" * 60)
        else:
            print("✗ API 返回失败")
            print(f"错误: {data.get('error')}")
    else:
        print(f"✗ HTTP 错误: {response.status_code}")
        print(response.text)
        
except requests.exceptions.ConnectionError:
    print("✗ 连接失败")
    print("请确保 Flask 服务器正在运行: python app.py")
except Exception as e:
    print(f"✗ 测试失败: {e}")
