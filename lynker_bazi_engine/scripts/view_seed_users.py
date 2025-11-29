"""
查看当前种子用户状态
View current seed users status
"""

from supabase_client import get_supabase_client

def check_seed_users():
    client = get_supabase_client()
    
    print("=" * 70)
    print("📊 当前种子用户状态")
    print("=" * 70)
    
    # 查询2001-2051范围的用户
    res = client.table("chart_time_layers_v2")\
        .select("chart_id, year, month, day, hour, point_column, ke_column, fen_column")\
        .gte("chart_id", 2001)\
        .lte("chart_id", 2051)\
        .order("chart_id")\
        .execute()
    
    users = res.data if res.data else []
    
    print(f"\n找到 {len(users)} 个种子用户 (chart_id: 2001-2051)\n")
    
    if not users:
        print("⚠️ 未找到任何种子用户")
        return
    
    # 分析梯度
    BASE = {
        "year": 2000,
        "month": 3,
        "day": 20,
        "hour": 8,
        "point_column": 0,
        "ke_column": 0,
        "fen_column": 0,
    }
    
    categories = {
        "完美同频(100分)": 0,
        "fen级(80分)": 0,
        "ke级(65分)": 0,
        "point级(50分)": 0,
        "hour级(30分)": 0,
        "day级(15分)": 0,
        "month级(10分)": 0,
        "year级(5分)": 0,
    }
    
    # 重点展示前几个
    print("🌟 核心测试用户:")
    print("-" * 70)
    
    for u in users[:5]:  # 显示前5个
        cid = u["chart_id"]
        
        # 判断类别
        if (u["year"] == BASE["year"] and 
            u["month"] == BASE["month"] and 
            u["day"] == BASE["day"] and 
            u["hour"] == BASE["hour"] and 
            u["point_column"] == BASE["point_column"] and 
            u["ke_column"] == BASE["ke_column"] and 
            u["fen_column"] == BASE["fen_column"]):
            cat = "完美同频(100分)"
        elif (u["year"] == BASE["year"] and 
              u["month"] == BASE["month"] and 
              u["day"] == BASE["day"] and 
              u["hour"] == BASE["hour"] and 
              u["point_column"] == BASE["point_column"] and 
              u["ke_column"] == BASE["ke_column"]):
            cat = "fen级(80分)"
        elif u["hour"] == BASE["hour"]:
            cat = "ke级或更细"
        else:
            cat = "其他"
        
        print(f"  T{cid}: {cat}")
        print(f"    时间: {u['year']}-{u['month']:02d}-{u['day']:02d} "
              f"{u['hour']:02d}:{u['point_column']:02d}:{u['ke_column']:02d}:{u['fen_column']:02d}")
    
    if len(users) > 5:
        print(f"  ... 还有 {len(users) - 5} 个用户")
    
    print("\n" + "=" * 70)
    print("✅ 种子用户已就绪")
    print("=" * 70)
    print("\n💡 使用方法:")
    print("  1. 前往前端页面，输入 chart_id=2001")
    print("  2. 点击「时间同频搜索」")
    print("  3. TimeMatchAgent 会匹配所有种子用户并保存分数")
    print("  4. 查看排行榜验证梯度分布")
    print("=" * 70)

if __name__ == "__main__":
    check_seed_users()
