"""
清理并刷新排行榜
Clean and Refresh Leaderboard
"""
import requests
import sys
import os

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from supabase_client import get_supabase_client

def clean_and_refresh():
    print("=" * 60)
    print("正在清理旧数据并刷新排行榜...")
    print("=" * 60)
    
    client = get_supabase_client()
    
    # 1. 清空排行榜表
    print("\n1. 清空 chart_leaderboards 表...")
    try:
        # 删除所有记录 (neq id 0 是一个删除所有行的技巧，或者直接用 delete)
        client.table("chart_leaderboards").delete().neq("id", 0).execute()
        print("  ✓ 已清空旧排行榜数据")
    except Exception as e:
        print(f"  ✗ 清空失败: {e}")
        # 如果失败，可能是表为空，继续

    # 2. 重新计算排行榜
    print("\n2. 触发排行榜重新计算...")
    try:
        res = requests.post("http://localhost:5000/api/leaderboard/calculate")
        if res.status_code == 200:
            data = res.json()
            print(f"  ✓ {data.get('message')}")
            print(f"  ✓ 生成了 {data.get('count')} 条新记录")
        else:
            print(f"  ✗ 计算失败: {res.text}")
    except Exception as e:
        print(f"  ✗ 请求失败: {e}")

    print("\n" + "=" * 60)
    print("✅ 刷新完成！请刷新浏览器查看最新排行榜。")
    print("=" * 60)

if __name__ == "__main__":
    clean_and_refresh()
