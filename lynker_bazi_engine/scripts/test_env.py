"""
测试 .env 文件是否被正确读取
"""
import os
from dotenv import load_dotenv

# 加载 .env 文件
load_dotenv()

# 读取环境变量
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

print("=" * 60)
print("环境变量检查")
print("=" * 60)

if supabase_url:
    print(f"✓ SUPABASE_URL 已设置")
    print(f"  值: {supabase_url}")
    print(f"  长度: {len(supabase_url)} 字符")
else:
    print("✗ SUPABASE_URL 未设置")

print()

if supabase_key:
    print(f"✓ SUPABASE_KEY 已设置")
    print(f"  前10个字符: {supabase_key[:10]}...")
    print(f"  后10个字符: ...{supabase_key[-10:]}")
    print(f"  总长度: {len(supabase_key)} 字符")
    print(f"  是否以 'eyJ' 开头: {supabase_key.startswith('eyJ')}")
else:
    print("✗ SUPABASE_KEY 未设置")

print()
print("=" * 60)
print("提示:")
print("- SUPABASE_URL 应该类似: https://xxxxx.supabase.co")
print("- SUPABASE_KEY 应该以 'eyJ' 开头，长度约 200+ 字符")
print("- 确保 .env 文件在项目根目录")
print("- 确保没有多余的空格或引号")
print("=" * 60)
