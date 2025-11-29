"""
验证种子数据及匹配流程
Verify Seed Data and Match Flow
"""
import requests
import json
import sys
import os

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from supabase_client import get_supabase_client

def verify_seeds():
    print("=" * 60)
    print("验证种子数据及匹配流程")
    print("=" * 60)
    
    client = get_supabase_client()
    
    # 1. 检查种子数据
    print("\n1. 检查数据库中的种子数据...")
    try:
        res = client.table("user_charts").select("id, chart_code, name").like("chart_code", "TEST_%").execute()
        charts = res.data
        print(f"  ✓ 找到 {len(charts)} 个测试命盘:")
        
        chart_map = {}
        for c in charts:
            print(f"    - {c['chart_code']}: {c['name']} (ID: {c['id']})")
            chart_map[c['chart_code']] = c['id']
            
        if len(charts) < 5:
            print("  ⚠️ 警告: 测试数据似乎不完整")
            
    except Exception as e:
        print(f"  ✗ 查询失败: {e}")
        return

    # 2. 测试匹配计算 (TEST_A vs TEST_B)
    if 'TEST_A' in chart_map and 'TEST_B' in chart_map:
        id_a = chart_map['TEST_A']
        id_b = chart_map['TEST_B']
        
        print(f"\n2. 测试匹配计算: TEST_A ({id_a}) vs TEST_B ({id_b})...")
        
        # 获取家庭数据用于匹配
        try:
            fam_a = client.table("chart_family_columns").select("*").eq("chart_id", id_a).single().execute().data
            fam_b = client.table("chart_family_columns").select("*").eq("chart_id", id_b).single().execute().data
            
            # 构造请求
            payload = {
                "chart_id_a": id_a,
                "chart_id_b": id_b,
                "chart_data_a": {"time_diff_minutes": 0}, # 模拟数据
                "chart_data_b": {"time_diff_minutes": 15}, # 11:30 vs 11:45
                "family_data_a": fam_a,
                "family_data_b": fam_b,
                "save_to_db": True
            }
            
            # 调用 API
            api_url = "http://localhost:5000/api/match/calculate"
            res = requests.post(api_url, json=payload)
            
            if res.status_code == 200:
                data = res.json()
                if data.get("success"):
                    match = data["match_data"]
                    print(f"  ✓ 匹配计算成功!")
                    print(f"    - 综合评分: {match['composite_score']}")
                    print(f"    - 时间评分: {match['time_score']}")
                    print(f"    - 父柱评分: {match['father_score']}")
                    print(f"    - 母柱评分: {match['mother_score']}")
                    print(f"    - 解读: {data['interpretation']['overall_interpretation']}")
                else:
                    print(f"  ✗ API 返回错误: {data.get('error')}")
            else:
                print(f"  ✗ HTTP 请求失败: {res.status_code}")
                
        except Exception as e:
            print(f"  ✗ 匹配测试失败: {e}")
    else:
        print("  ⚠️ 跳过匹配测试: 缺少 TEST_A 或 TEST_B")

    # 3. 触发排行榜计算
    print("\n3. 触发排行榜计算...")
    try:
        res = requests.post("http://localhost:5000/api/leaderboard/calculate")
        if res.status_code == 200:
            print(f"  ✓ {res.json().get('message')}")
        else:
            print(f"  ✗ 计算失败: {res.text}")
    except Exception as e:
        print(f"  ✗ 请求失败: {e}")

    # 4. 查看排行榜
    print("\n4. 查看排行榜 Top 5...")
    try:
        res = requests.get("http://localhost:5000/api/leaderboard/top?limit=5")
        if res.status_code == 200:
            data = res.json()
            leaderboard = data.get("leaderboard", [])
            
            print(f"  ✓ 获取到 {len(leaderboard)} 条记录:")
            for item in leaderboard:
                # 尝试匹配回 chart_code
                chart_code = "未知"
                for code, cid in chart_map.items():
                    if cid == item['chart_id']:
                        chart_code = code
                        break
                        
                print(f"    {item['rank']}. {chart_code} (ID: {item['user_id']}) - {int(item['similarity']*100)}% (匹配{item['match_count']}次)")
        else:
            print(f"  ✗ 获取失败: {res.text}")
    except Exception as e:
        print(f"  ✗ 请求失败: {e}")

    print("\n" + "=" * 60)
    print("验证完成")
    print("=" * 60)

if __name__ == "__main__":
    verify_seeds()
