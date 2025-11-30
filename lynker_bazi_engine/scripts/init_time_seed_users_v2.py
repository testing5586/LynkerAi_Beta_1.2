"""
时间同频种子用户生成脚本 v2
Generate seed users for TimeMatch testing

基准时间: 2000-03-20 08:00 (point=0, ke=0, fen=0, micro_fen=0)
测试逐层梯度匹配
"""

from supabase_client import get_supabase_client

def init_time_seed_users():
    """初始化时间同频测试种子数据"""
    client = get_supabase_client()
    
    # 定义种子数据
    seed_data = [
        {
            "chart_id": 1001,
            "name": "完全同频",
            "year": 2000,
            "month": 3,
            "day": 20,
            "hour": 8,
            "point_column": 0,
            "ke_column": 0,
            "fen_column": 0,
            "micro_fen_column": 0,
        },
        {
            "chart_id": 1002,
            "name": "同年月日时点刻，分命不同",
            "year": 2000,
            "month": 3,
            "day": 20,
            "hour": 8,
            "point_column": 0,
            "ke_column": 0,
            "fen_column": 1,
            "micro_fen_column": 0,
        },
        {
            "chart_id": 1003,
            "name": "同年月日时点，不同刻",
            "year": 2000,
            "month": 3,
            "day": 20,
            "hour": 8,
            "point_column": 0,
            "ke_column": 1,
            "fen_column": 2,
            "micro_fen_column": 0,
        },
        {
            "chart_id": 1004,
            "name": "同年月日时，不同点",
            "year": 2000,
            "month": 3,
            "day": 20,
            "hour": 8,
            "point_column": 1,
            "ke_column": 0,
            "fen_column": 0,
            "micro_fen_column": 0,
        },
        {
            "chart_id": 1005,
            "name": "同年月日，不同时",
            "year": 2000,
            "month": 3,
            "day": 20,
            "hour": 9,
            "point_column": 0,
            "ke_column": 0,
            "fen_column": 0,
            "micro_fen_column": 0,
        },
        {
            "chart_id": 1006,
            "name": "同年月，不同日",
            "year": 2000,
            "month": 3,
            "day": 21,
            "hour": 8,
            "point_column": 0,
            "ke_column": 0,
            "fen_column": 0,
            "micro_fen_column": 0,
        },
        {
            "chart_id": 1007,
            "name": "同年，不同月",
            "year": 2000,
            "month": 4,
            "day": 20,
            "hour": 8,
            "point_column": 0,
            "ke_column": 0,
            "fen_column": 0,
            "micro_fen_column": 0,
        },
    ]
    
    print("=" * 70)
    print("🌱 初始化时间同频种子用户")
    print("=" * 70)
    print(f"基准时间: 2000-03-20 08:00:00 (point=0, ke=0, fen=0)")
    print(f"目标表: chart_time_layers_v2")
    print("-" * 70)
    
    inserted_count = 0
    skipped_count = 0
    
    for data in seed_data:
        chart_id = data["chart_id"]
        name = data.pop("name")
        
        try:
            # 检查是否已存在
            existing = client.table("chart_time_layers_v2")\
                .select("chart_id")\
                .eq("chart_id", chart_id)\
                .limit(1)\
                .execute()
            
            if existing.data:
                print(f"  ⏭️  T{chart_id}: 已存在 - {name}")
                skipped_count += 1
                continue
            
            # 插入新记录
            # 构造完整的时间层级码
            time_layer_code = (
                f"{data['year']:04d}"
                f"{data['month']:02d}"
                f"{data['day']:02d}"
                f"{data['hour']:02d}"
                f"{data['point_column']:02d}"
                f"{data['ke_column']:02d}"
                f"{data['fen_column']:02d}"
                f"{data['micro_fen_column']:02d}"
            )
            
            # 添加必要字段
            data["time_layer_code"] = time_layer_code
            data["user_id"] = None  # 测试数据无需真实 user_id
            
            # 插入
            client.table("chart_time_layers_v2").insert(data).execute()
            
            print(f"  ✅ T{chart_id}: 新增成功 - {name}")
            print(f"      时间层级: {data['year']}-{data['month']:02d}-{data['day']:02d} "
                  f"{data['hour']:02d}:{data['point_column']:02d}:{data['ke_column']:02d}:"
                  f"{data['fen_column']:02d}.{data['micro_fen_column']:02d}")
            inserted_count += 1
            
        except Exception as e:
            print(f"  ❌ T{chart_id}: 插入失败 - {name}")
            print(f"      错误: {e}")
    
    print("-" * 70)
    print(f"✅ 完成: 新增 {inserted_count} 条, 跳过 {skipped_count} 条")
    print("=" * 70)
    print("\n💡 提示: 前往前端页面点击「同频搜索」，TimeMatchAgent 会自动计算并保存匹配分数")

if __name__ == "__main__":
    init_time_seed_users()
