"""
测试排行榜 API
"""
import requests

print("=" * 60)
print("测试排行榜引擎")
print("=" * 60)
print()

# 1. 先计算排行榜
print("1. 触发排行榜计算...")
try:
    res = requests.post("http://localhost:5000/api/leaderboard/calculate", timeout=5)
    data = res.json()
    if data.get("success"):
        print(f"✓ 排行榜计算成功：{data.get('message')}")
    else:
        print(f"✗ 计算失败：{data.get('error')}")
except Exception as e:
    print(f"✗ 请求失败：{e}")

print()

# 2. 获取排行榜前10名
print("2. 获取排行榜 Top 10...")
try:
    res = requests.get("http://localhost:5000/api/leaderboard/top?limit=10", timeout=5)
    data = res.json()
    
    if data.get("success"):
        leaderboard = data.get("leaderboard", [])
        print(f"✓ 获取成功，共 {len(leaderboard)} 条记录")
        print()
        print("【排行榜】")
        print("-" * 60)
        
        for item in leaderboard[:10]:
            rank = item.get("rank")
            user_id = item.get("user_id")
            similarity = item.get("similarity", 0)
            match_count = item.get("match_count", 0)
            verified = item.get("verified_count", 0)
            
            emoji = ""
            if rank == 1:
                emoji = "🥇"
            elif rank == 2:
                emoji = "🥈"
            elif rank == 3:
                emoji = "🥉"
            else:
                emoji = f"No.{rank}"
            
            print(f"{emoji:6} 用户#{user_id:4} - {int(similarity*100):2}% (匹配{match_count}次 验证{verified}次)")
        
        print("-" * 60)
    else:
        print(f"✗ 获取失败：{data.get('error')}")
        
except Exception as e:
    print(f"✗ 请求失败：{e}")

print()
print("=" * 60)
print("测试完成")
print("=" * 60)
