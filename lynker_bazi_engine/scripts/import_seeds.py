"""
导入测试种子命盘数据
Import Seed Charts for Testing
"""
import sys
import os

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from supabase_client import get_supabase_client
import time

def import_seeds():
    print("=" * 60)
    print("开始导入测试种子数据...")
    print("=" * 60)
    
    client = get_supabase_client()
    
    # 1. 准备测试数据
    seed_charts = [
        {
            "user_id": 1001, "chart_code": "TEST_A", "name": "测试用户A", "gender": "M",
            "birth_year": 1995, "birth_month": 6, "birth_day": 16, "birth_hour": 11, "birth_minute": 30, "longitude": 120.0
        },
        {
            "user_id": 1002, "chart_code": "TEST_A_CLONE", "name": "测试用户A克隆", "gender": "M",
            "birth_year": 1995, "birth_month": 6, "birth_day": 16, "birth_hour": 11, "birth_minute": 30, "longitude": 120.0
        },
        {
            "user_id": 1003, "chart_code": "TEST_B", "name": "测试用户B", "gender": "M",
            "birth_year": 1995, "birth_month": 6, "birth_day": 16, "birth_hour": 11, "birth_minute": 45, "longitude": 120.0
        },
        {
            "user_id": 1004, "chart_code": "TEST_C", "name": "测试用户C", "gender": "M",
            "birth_year": 1995, "birth_month": 6, "birth_day": 16, "birth_hour": 11, "birth_minute": 50, "longitude": 120.0
        },
        {
            "user_id": 1005, "chart_code": "TEST_D", "name": "测试用户D", "gender": "M",
            "birth_year": 1995, "birth_month": 6, "birth_day": 16, "birth_hour": 11, "birth_minute": 51, "longitude": 120.0
        },
        {
            "user_id": 1006, "chart_code": "TEST_X", "name": "测试用户X", "gender": "F",
            "birth_year": 2001, "birth_month": 3, "birth_day": 20, "birth_hour": 8, "birth_minute": 18, "longitude": 120.0
        }
    ]
    
    # 2. 插入 user_charts
    print("\n1. 插入 user_charts...")
    inserted_charts = []
    
    for chart in seed_charts:
        try:
            # 先检查是否存在
            existing = client.table("user_charts").select("id").eq("chart_code", chart["chart_code"]).execute()
            
            if existing.data:
                print(f"  - 更新 {chart['chart_code']}...")
                res = client.table("user_charts").update(chart).eq("chart_code", chart["chart_code"]).execute()
                if res.data:
                    inserted_charts.append(res.data[0])
            else:
                print(f"  - 插入 {chart['chart_code']}...")
                res = client.table("user_charts").insert(chart).execute()
                if res.data:
                    inserted_charts.append(res.data[0])
                    
        except Exception as e:
            print(f"  ✗ 插入失败 {chart['chart_code']}: {e}")
            # 如果表不存在，可能需要先执行 SQL
            if "relation" in str(e) and "does not exist" in str(e):
                print("    提示：请先在 Supabase SQL 编辑器中执行 supabase_seed_charts.sql 创建表结构")
                return

    print(f"  ✓ 完成，共处理 {len(inserted_charts)} 条记录")
    
    # 3. 插入 chart_family_columns
    print("\n2. 插入 chart_family_columns...")
    for chart in inserted_charts:
        chart_id = chart["id"]
        # 生成模拟数据
        family_data = {
            "chart_id": chart_id,
            "father_presence": 70 + (chart_id % 10),
            "father_authority": 60 + (chart_id % 10),
            "father_resource": 80 - (chart_id % 5),
            "father_conflict": 40 + (chart_id % 5),
            "father_distance": 50,
            "mother_presence": 75 + (chart_id % 8),
            "mother_bond": 85 - (chart_id % 6),
            "mother_nurture": 70 + (chart_id % 4),
            "mother_control": 30 + (chart_id % 5),
            "mother_empty": 20
        }
        
        try:
            # Upsert
            client.table("chart_family_columns").upsert(family_data, on_conflict="chart_id").execute()
            print(f"  - 已更新 chart_id={chart_id} 的家庭数据")
        except Exception as e:
            print(f"  ✗ 更新家庭数据失败 chart_id={chart_id}: {e}")

    # 4. 插入 chart_time_layers
    print("\n3. 插入 chart_time_layers...")
    for chart in inserted_charts:
        chart_id = chart["id"]
        code = chart["chart_code"]
        
        # 简化的时间层级逻辑
        time_data = {"chart_id": chart_id}
        
        if code in ['TEST_A', 'TEST_A_CLONE']:
            time_data.update({"parent_column": 6, "point_column": 0, "ke_column": 0, "fen_column": 0})
        elif code == 'TEST_B':
            time_data.update({"parent_column": 6, "point_column": 1, "ke_column": 0, "fen_column": 0})
        elif code == 'TEST_C':
            time_data.update({"parent_column": 6, "point_column": 1, "ke_column": 1, "fen_column": 0})
        elif code == 'TEST_D':
            time_data.update({"parent_column": 6, "point_column": 1, "ke_column": 1, "fen_column": 1})
        elif code == 'TEST_X':
            time_data.update({"parent_column": 4, "point_column": 1, "ke_column": 0, "fen_column": 3})
            
        try:
            client.table("chart_time_layers").upsert(time_data, on_conflict="chart_id").execute()
            print(f"  - 已更新 chart_id={chart_id} 的时间层级")
        except Exception as e:
            print(f"  ✗ 更新时间层级失败 chart_id={chart_id}: {e}")

    print("\n" + "=" * 60)
    print("✅ 种子数据导入完成！")
    print("=" * 60)

if __name__ == "__main__":
    import_seeds()
