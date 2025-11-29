"""
直接测试 Supabase 连接
"""
import os
from dotenv import load_dotenv
from supabase import create_client

# 加载环境变量
load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

print("=" * 60)
print("Supabase 连接测试")
print("=" * 60)
print(f"URL: {supabase_url}")
print(f"Key 前缀: {supabase_key[:20]}...")
print()

try:
    print("正在创建 Supabase 客户端...")
    supabase = create_client(supabase_url, supabase_key)
    print("✓ 客户端创建成功")
    print()
    
    print("正在测试数据库连接...")
    # 尝试查询 chart_family_columns 表
    result = supabase.table("chart_family_columns").select("id").limit(1).execute()
    print("✓ 数据库连接成功！")
    print(f"  查询结果: {result}")
    print()
    print("=" * 60)
    print("✓✓✓ Supabase 连接完全正常！")
    print("=" * 60)
    
except Exception as e:
    print("✗ 连接失败")
    print()
    print("错误详情:")
    print(f"  类型: {type(e).__name__}")
    print(f"  消息: {str(e)}")
    print()
    print("=" * 60)
    print("可能的原因:")
    print("1. API Key 不正确")
    print("   - 确认使用的是 'anon public' key")
    print("   - 不是 'service_role' key")
    print("2. 表 'chart_family_columns' 不存在")
    print("   - 需要先在 Supabase 执行 SQL 创建表")
    print("3. Row Level Security (RLS) 策略阻止访问")
    print("   - 可以在 Supabase 中暂时禁用 RLS 测试")
    print("=" * 60)
