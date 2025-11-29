"""
初始化种子数据的匹配和排行榜
Initialize Matches and Leaderboard for Seed Charts
"""
import requests
import json
import sys
import os
import random

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from supabase_client import get_supabase_client

def init_seed_matches():
    print("=" * 60)
    print("正在初始化种子数据匹配...")
    print("=" * 60)
    
    client = get_supabase_client()
    
    # 1. 获取所有种子盘
    print("\n1. 获取种子盘数据 (seed_charts)...")
    try:
        res = client.table("seed_charts").select("*").execute()
        charts = res.data
        print(f"  ✓ 找到 {len(charts)} 个种子盘")
        for c in charts:
            print(f"    - [{c['id']}] {c['chart_code']} ({c['test_group']})")
    except Exception as e:
        print(f"  ✗ 获取失败: {e}")
        return

    # 2. 确保每个种子盘都有家庭数据 (chart_family_columns)
    # 注意：这里我们使用 seed_charts.id 作为 chart_id
    print("\n2. 初始化家庭结构数据...")
    for c in charts:
        chart_id = c['id']
        try:
            # 检查是否存在
            exists = client.table("chart_family_columns").select("id").eq("chart_id", chart_id).execute()
            
            if not exists.data:
                # 生成模拟数据
                # T1 和 T1_CLONE 应该有相似的数据
                base_val = 50
                if "TEST_A" in c['chart_code']:
                    base_val = 80
                elif "TEST_B" in c['chart_code']:
                    base_val = 70
                
                family_data = {
                    "chart_id": chart_id,
                    "father_presence": base_val + random.randint(-5, 5),
                    "father_authority": base_val + random.randint(-5, 5),
                    "father_resource": base_val + random.randint(-5, 5),
                    "father_conflict": 50,
                    "father_distance": 50,
                    "mother_presence": base_val + random.randint(-5, 5),
                    "mother_bond": base_val + random.randint(-5, 5),
                    "mother_nurture": base_val + random.randint(-5, 5),
                    "mother_control": 50,
                    "mother_empty": 20
                }
                
                client.table("chart_family_columns").insert(family_data).execute()
                print(f"  + 为 {c['chart_code']} 创建了家庭数据")
            else:
                print(f"  . {c['chart_code']} 已有家庭数据")
                
        except Exception as e:
            print(f"  ✗ 处理家庭数据失败 {c['chart_code']}: {e}")

    # 3. 执行两两匹配
    print("\n3. 执行两两匹配计算...")
    count = 0
    for i in range(len(charts)):
        for j in range(i + 1, len(charts)):
            chart_a = charts[i]
            chart_b = charts[j]
            
            print(f"  > 匹配 {chart_a['chart_code']} vs {chart_b['chart_code']} ...", end="")
            
            try:
                # 获取家庭数据
                fam_a = client.table("chart_family_columns").select("*").eq("chart_id", chart_a['id']).single().execute().data
                fam_b = client.table("chart_family_columns").select("*").eq("chart_id", chart_b['id']).single().execute().data
                
                # 计算时间差异 (简化逻辑：基于 hour/point/ke/fen)
                # 实际应该计算分钟差，这里简单模拟
                time_diff = 0
                if chart_a['hour_column'] != chart_b['hour_column']:
                    time_diff = 120
                elif chart_a['point_column'] != chart_b['point_column']:
                    time_diff = 15
                elif chart_a['ke_column'] != chart_b['ke_column']:
                    time_diff = 4 # 3.75
                
                # 调用 API 计算并保存
                payload = {
                    "chart_id_a": chart_a['id'],
                    "chart_id_b": chart_b['id'],
                    "chart_data_a": {"time_diff_minutes": 0},
                    "chart_data_b": {"time_diff_minutes": time_diff},
                    "family_data_a": fam_a,
                    "family_data_b": fam_b,
                    "save_to_db": True
                }
                
                res = requests.post("http://localhost:5000/api/match/calculate", json=payload)
                if res.status_code == 200:
                    data = res.json()
                    score = data['match_data']['composite_score']
                    saved = data.get('db_saved', False)
                    
                    if saved:
                        print(f" 成功 (分: {score})")
                        count += 1
                    else:
                        print(f" 计算成功但保存失败 (分: {score})")
                        # 尝试打印更多信息
                        print(f"    DB Record ID: {data.get('db_record_id')}")
                        print(f"    DB Error: {data.get('db_error')}")
                else:
                    print(f" 失败 ({res.status_code})")
                    
            except Exception as e:
                print(f" 错误: {e}")

    print(f"  ✓ 完成 {count} 组匹配")

    # 4. 刷新排行榜
    print("\n4. 刷新排行榜...")
    try:
        res = requests.post("http://localhost:5000/api/leaderboard/calculate")
        if res.status_code == 200:
            print(f"  ✓ {res.json().get('message')}")
        else:
            print(f"  ✗ 刷新失败: {res.text}")
    except Exception as e:
        print(f"  ✗ 请求失败: {e}")

    print("\n" + "=" * 60)
    print("✅ 初始化完成！现在可以查看排行榜了。")
    print("=" * 60)

if __name__ == "__main__":
    init_seed_matches()
