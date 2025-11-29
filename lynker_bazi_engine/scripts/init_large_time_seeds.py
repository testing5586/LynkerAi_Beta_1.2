"""
大规模时间同频种子用户生成脚本
Generate 50+ seed users for TimeMatch gradient testing

基准时间: 2000-03-20 08:00:00.00
覆盖所有时间层级的梯度分布
"""

import random
from supabase_client import get_supabase_client

def generate_time_seed_data():
    """生成50+个时间同频测试用户"""
    client = get_supabase_client()
    
    # 基准时间配置
    BASE = {
        "year": 2000,
        "month": 3,
        "day": 20,
        "hour": 8,
        "point_column": 0,
        "ke_column": 0,
        "fen_column": 0,
        "micro_fen_column": 0,
    }
    
    seed_users = []
    chart_id = 2001  # 从2001开始避免冲突
    
    # === 完美同频 (100分) - 1个用户 ===
    seed_users.append({
        "chart_id": chart_id,
        "category": "完美同频",
        **BASE
    })
    chart_id += 1
    
    # === 高频共振 - fen级 (80分) - 1个用户 ===
    seed_users.append({
        "chart_id": chart_id,
        "category": "高频共振(fen级)",
        **BASE,
        "fen_column": 3,  # 只有fen不同
    })
    chart_id += 1
    
    # 开始插入
    print("=" * 70)
    print("🌱 生成大规模时间同频种子用户")
    print("=" * 70)
    print(f"基准时间: {BASE['year']}-{BASE['month']:02d}-{BASE['day']:02d} "
          f"{BASE['hour']:02d}:00:00.00")
    print(f"总用户数: {len(seed_users)}")
    print("-" * 70)
    
    inserted = 0
    skipped = 0
    
    # 按类别统计
    category_stats = {}
    
    for user in seed_users:
        cid = user["chart_id"]
        category = user.pop("category")
        
        if category not in category_stats:
            category_stats[category] = {"total": 0, "inserted": 0, "skipped": 0}
        category_stats[category]["total"] += 1
        
        try:
            # 检查是否存在
            existing = client.table("chart_time_layers_v2")\
                .select("chart_id")\
                .eq("chart_id", cid)\
                .limit(1)\
                .execute()
            
            if existing.data:
                skipped += 1
                category_stats[category]["skipped"] += 1
                continue
            
            # 生成time_layer_code
            time_layer_code = (
                f"{user['year']:04d}"
                f"{user['month']:02d}"
                f"{user['day']:02d}"
                f"{user['hour']:02d}"
                f"{user['point_column']:02d}"
                f"{user['ke_column']:02d}"
                f"{user['fen_column']:02d}"
                f"{user['micro_fen_column']:02d}"
            )
            
            user["time_layer_code"] = time_layer_code
            user["user_id"] = None
            
            # 插入
            client.table("chart_time_layers_v2").insert(user).execute()
            inserted += 1
            category_stats[category]["inserted"] += 1
            
        except Exception as e:
            print(f"  ❌ T{cid}: 插入失败 - {e}")
    
    # 打印统计
    print("\n📊 分类统计:")
    print("-" * 70)
    for cat, stats in sorted(category_stats.items(), key=lambda x: -x[1]["total"]):
        print(f"  {cat:12} - 总计: {stats['total']:2}, "
              f"新增: {stats['inserted']:2}, 跳过: {stats['skipped']:2}")
    
    print("-" * 70)
    print(f"✅ 完成: 新增 {inserted}/{len(seed_users)} 个用户")
    print("=" * 70)
    print("\n💡 提示:")
    print("  1. 前往前端页面输入 chart_id=2001")
    print("  2. 点击「时间同频搜索」")
    print("  3. TimeMatchAgent 会自动计算并保存所有匹配分数")
    print("  4. 查看排行榜验证峰值共振评分逻辑")

if __name__ == "__main__":
    generate_time_seed_data()
