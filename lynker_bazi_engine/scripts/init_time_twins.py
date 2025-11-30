# scripts/init_time_twins.py

"""
初始化“同分命测试盘”数据，用来验证 TimeMatchAgent 递进逻辑。
会基于 chart_time_layers_v2 中的某个基准 chart_id（默认 1）克隆出几种不同相似层级的命盘。
"""

import sys
import os

# Add the project root directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from supabase_client import get_supabase_client


BASE_CHART_ID = 1  # 以哪一个 chart_id 作为基准命盘，你可以改成别的


def main():
    client = get_supabase_client()

    # 1. 取基准时间层记录
    res = client.table("chart_time_layers_v2") \
        .select("*") \
        .eq("chart_id", BASE_CHART_ID) \
        .limit(1) \
        .execute()

    base = res.data[0] if res.data else None
    if not base:
        print(f"[WARN] 在 chart_time_layers_v2 找不到 chart_id={BASE_CHART_ID} 的记录，正在创建默认基准命盘...")
        default_base = {
            "chart_id": BASE_CHART_ID,
            "year": 2000, "month": 3, "day": 20, "hour": 8,
            "point_column": 0, "ke_column": 0, "fen_column": 0, "micro_fen_column": 0,
            "ganzhi_hour": "辰", "time_layer_code": "2000032008000000"
        }
        client.table("chart_time_layers_v2").insert(default_base).execute()
        base = default_base
        print(f"[OK] 已创建基准命盘 chart_id={BASE_CHART_ID}")

    print(f"[INFO] 基准命盘 chart_id={BASE_CHART_ID}:",
          base["year"], base["month"], base["day"], base["hour"],
          "P", base["point_column"], "K", base["ke_column"], "F", base["fen_column"])

    # 我们要复制的字段
    fields = [
        "year", "month", "day", "hour",
        "point_column", "ke_column", "fen_column", "micro_fen_column",
        "ganzhi_hour", "time_layer_code"
    ]

    def clone_chart(new_chart_id: int, label: str, overrides: dict):
        data = {k: base.get(k) for k in fields}
        data.update(overrides)
        data["chart_id"] = new_chart_id

        # 防止重复插入：先删再插
        client.table("chart_time_layers_v2").delete() \
            .eq("chart_id", new_chart_id).execute()

        client.table("chart_time_layers_v2").insert(data).execute()
        print(f"[OK] 创建 {label} chart_id={new_chart_id}: overrides={overrides}")

    # 2. 完全同分命：所有层级完全相同
    clone_chart(
        new_chart_id=1001,
        label="TWIN_EXACT (完全同分命)",
        overrides={}
    )

    # 3. 同刻柱：到 ke_column 一样，fen 不同
    clone_chart(
        new_chart_id=1002,
        label="TWIN_SAME_KE (同刻柱，分不同)",
        overrides={
            "fen_column": (base["fen_column"] + 1) % 60
        }
    )

    # 4. 同点柱：到 point_column 一样，ke & fen 不同
    clone_chart(
        new_chart_id=1003,
        label="TWIN_SAME_POINT (同点柱，刻/分不同)",
        overrides={
            "ke_column": (base["ke_column"] + 1) % 3,
            "fen_column": (base["fen_column"] + 5) % 60
        }
    )

    # 5. 只同时辰：year/month/day/hour 一样，point/ke/fen 不同
    clone_chart(
        new_chart_id=1004,
        label="TWIN_SAME_HOUR (仅同时辰)",
        overrides={
            "point_column": (base["point_column"] + 1) % 4,
            "ke_column": 0,
            "fen_column": 0
        }
    )

    print("\n[完成] 已创建 4 个测试命盘：1001, 1002, 1003, 1004")


if __name__ == "__main__":
    main()
