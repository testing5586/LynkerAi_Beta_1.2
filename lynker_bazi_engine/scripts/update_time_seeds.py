"""
🔧 更新已有 51 条时间同频种子用户
- 采用分钟级别（point_column）生成真实 time_layer_code
- 只保留 1 条 100% 完美匹配、1 条 80% 高频共振
- 其余 49 条随机化，避免产生同频或高频匹配
"""

from supabase_client import get_supabase_client
import random

# 基准时间（完整到分钟）
BASE = {
    "year": 2000,
    "month": 3,
    "day": 20,
    "hour": 8,
    "point_column": 0,   # 分钟
    "ke_column": 0,
    "fen_column": 0,
    "micro_fen_column": 0,
}

def build_time_code(rec):
    """根据记录字段生成 16 位 time_layer_code"""
    return (
        f"{rec['year']:04d}"
        f"{rec['month']:02d}"
        f"{rec['day']:02d}"
        f"{rec['hour']:02d}"
        f"{rec['point_column']:02d}"
        f"{rec['ke_column']:02d}"
        f"{rec['fen_column']:02d}"
        f"{rec['micro_fen_column']:02d}"
    )

def update_seeds():
    client = get_supabase_client()
    print("=" * 70)
    print("🛠️  更新 51 条时间同频种子用户（2001‑2051）")
    print("=" * 70)

    updated = 0
    for cid in range(2001, 2052):  # 包含 2051
        # 读取已有记录（若不存在则跳过）
        res = client.table("chart_time_layers_v2")\
                    .select("*")\
                    .eq("chart_id", cid)\
                    .limit(1)\
                    .execute()
        if not res.data:
            print(f"⚠️  chart_id={cid} 不存在，跳过")
            continue

        # 生成新字段
        if cid == 2001:                     # 完美同频（100%）
            rec = {**BASE}
        elif cid == 2002:                   # 高频共振（80%）——仅 fen 不同
            rec = {**BASE, "fen_column": 3}
        else:                               # 其余随机化，确保不产生 100%/80% 匹配
            rec = {
                "year": BASE["year"],
                "month": BASE["month"],
                "day": BASE["day"],
                "hour": BASE["hour"],
                "point_column": random.randint(0, 59),   # 分钟 0‑59
                "ke_column": random.randint(0, 9),
                "fen_column": random.randint(0, 9),
                "micro_fen_column": random.randint(0, 9),
            }

        # 生成 time_layer_code
        rec["time_layer_code"] = build_time_code(rec)
        rec["user_id"] = None   # 测试数据不关联真实用户

        # 更新数据库
        client.table("chart_time_layers_v2")\
              .update(rec)\
              .eq("chart_id", cid)\
              .execute()
        updated += 1
        print(f"✅  chart_id={cid} 更新完成")

    print("-" * 70)
    print(f"🔚 完成：共更新 {updated} 条记录")
    print("=" * 70)
    print("\n💡 使用说明：")
    print("  1. 前往前端页面，输入 chart_id=2001（完美）或 2002（80%）")
    print("  2. 点击「时间同频搜索」")
    print("  3. 查看排行榜，只有 2001 能达到 100%，2002 达到约 80%")
    print("=" * 70)

if __name__ == "__main__":
    update_seeds()
