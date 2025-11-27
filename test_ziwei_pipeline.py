#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试紫微斗数三层流程
Test Ziwei Vision Agent Three-Layer Pipeline

使用方法:
1. 确保已配置 OPENAI_API_KEY 环境变量
2. 准备一张紫微命盘图片（PNG/JPG）
3. 运行脚本: python test_ziwei_pipeline.py <image_path>

Example:
    python test_ziwei_pipeline.py attached_assets/ziwei_chart_sample.png
"""

import sys
import os
import json
import base64
from pathlib import Path

# 添加项目路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'admin_dashboard'))

from verify.ziwei_vision_agent import ZiweiVisionAgent
from verify.ziwei_normalizer import normalize_ziwei, validate_ziwei_structure
from verify.ziwei_analysis_agent import ZiweiAnalysisAgent


def load_image_as_base64(image_path):
    """将图片文件转换为 base64 编码"""
    try:
        with open(image_path, 'rb') as f:
            image_data = f.read()
            return base64.b64encode(image_data).decode('utf-8')
    except Exception as e:
        print(f"❌ 读取图片失败: {e}")
        return None


def test_ziwei_pipeline(image_path):
    """测试完整的紫微三层流程"""
    
    print("=" * 60)
    print("🔮 紫微斗数三层流程测试")
    print("=" * 60)
    print()
    
    # 检查 OpenAI API Key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ 错误: 未设置 OPENAI_API_KEY 环境变量")
        print("请先设置: export OPENAI_API_KEY='your-api-key'")
        return
    
    # 检查图片文件
    if not os.path.exists(image_path):
        print(f"❌ 错误: 图片文件不存在: {image_path}")
        return
    
    print(f"📁 加载图片: {image_path}")
    image_base64 = load_image_as_base64(image_path)
    
    if not image_base64:
        return
    
    print(f"✅ 图片已加载 ({len(image_base64)} bytes)")
    print()
    
    # ========== Layer 1: OCR 识别 ==========
    print("=" * 60)
    print("📸 Layer 1: GPT-4-Turbo-Vision OCR 识别")
    print("=" * 60)
    
    def progress_callback(msg):
        print(f"  {msg}")
    
    vision_agent = ZiweiVisionAgent()
    raw_result = vision_agent.process_image(image_base64, progress_callback)
    
    if not raw_result.get("success"):
        print(f"❌ OCR 识别失败: {raw_result.get('error')}")
        return
    
    print("\n✅ Layer 1 完成")
    print(f"识别到的原始数据:")
    print(json.dumps(raw_result.get("data", {}), ensure_ascii=False, indent=2)[:500] + "...")
    print()
    
    # ========== Layer 2: 标准化 ==========
    print("=" * 60)
    print("📋 Layer 2: JSON 标准化为 ZiweiAI_v1.0")
    print("=" * 60)
    
    normalized = normalize_ziwei(raw_result)
    
    if not normalized.get("success"):
        print(f"❌ 标准化失败: {normalized.get('error')}")
        return
    
    print("\n✅ Layer 2 完成")
    print(f"标准化结构:")
    print(f"  - Parser Version: {normalized['meta']['parser_version']}")
    print(f"  - 基本信息: {normalized['basic_info']}")
    print(f"  - 十二宫数量: {len(normalized['star_map'])}")
    print(f"  - 四化信息: {normalized['transformations']}")
    print(f"  - 自动标签: {normalized['tags']}")
    print()
    
    # 数据验证
    validation = validate_ziwei_structure(normalized)
    print("数据验证结果:")
    print(f"  - 有效性: {'✅ 通过' if validation['valid'] else '❌ 失败'}")
    if validation['errors']:
        print(f"  - 错误: {validation['errors']}")
    if validation['warnings']:
        print(f"  - 警告: {validation['warnings']}")
    print()
    
    # ========== Layer 3: AI 分析 ==========
    print("=" * 60)
    print("🧠 Layer 3: AI 命理分析")
    print("=" * 60)
    
    analysis_agent = ZiweiAnalysisAgent()
    
    # 生成简短摘要
    brief_summary = analysis_agent.generate_brief_summary(normalized)
    print(f"\n📝 命盘摘要: {brief_summary}")
    print()
    
    # 完整分析
    print("正在调用 GPT-4-Turbo 进行深度分析...")
    analysis_result = analysis_agent.analyze_ziwei(normalized)
    
    if not analysis_result.get("success"):
        print(f"❌ AI 分析失败: {analysis_result.get('error')}")
        return
    
    print("\n✅ Layer 3 完成")
    print("\n命理分析报告:")
    print("-" * 60)
    
    analysis_data = analysis_result.get("analysis", {})
    
    # 打印分析结果
    if isinstance(analysis_data, dict):
        for key, value in analysis_data.items():
            if isinstance(value, dict):
                print(f"\n【{key}】")
                for sub_key, sub_value in value.items():
                    print(f"  {sub_key}: {sub_value}")
            elif isinstance(value, list):
                print(f"\n【{key}】")
                for item in value:
                    print(f"  - {item}")
            else:
                print(f"\n【{key}】\n  {value}")
    else:
        print(analysis_data)
    
    print("\n" + "-" * 60)
    
    # ========== 总结 ==========
    print("\n" + "=" * 60)
    print("✨ 三层流程全部完成！")
    print("=" * 60)
    print(f"""
📊 处理结果摘要:
  - Layer 1 (OCR):      ✅ 识别成功
  - Layer 2 (标准化):   ✅ 结构完整
  - Layer 3 (AI分析):   ✅ 报告生成
  
💾 完整数据可通过 API 端点获取:
  POST /verify/api/ziwei/full_pipeline
  
  请求体:
  {{
    "image_base64": "<base64_encoded_image>",
    "analysis_focus": "career" (可选)
  }}
""")


def main():
    """主函数"""
    if len(sys.argv) < 2:
        print("用法: python test_ziwei_pipeline.py <image_path>")
        print()
        print("示例:")
        print("  python test_ziwei_pipeline.py attached_assets/ziwei_chart.png")
        print()
        sys.exit(1)
    
    image_path = sys.argv[1]
    test_ziwei_pipeline(image_path)


if __name__ == "__main__":
    main()
