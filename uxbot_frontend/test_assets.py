# -*- coding: utf-8 -*-
"""
Assets文件访问测试脚本
验证UXBot assets文件是否可以正确访问
"""
import requests
import time

def test_assets_access():
    """测试assets文件访问"""
    print("🔍 测试UXBot Assets文件访问...")
    
    base_url = "http://localhost:8080"
    
    # 测试文件列表
    test_files = [
        "/uxbot/assets/html/55750/ai-assistant-interaction-floating-window.B4Td28i4.css",
        "/uxbot/assets/static/uxbot/25_6/holder.js",
        "/uxbot/api/health"
    ]
    
    results = []
    
    for file_path in test_files:
        try:
            print(f"  测试: {file_path}")
            response = requests.get(f"{base_url}{file_path}", timeout=5)
            
            if response.status_code == 200:
                content_length = len(response.content)
                content_type = response.headers.get('content-type', 'unknown')
                print(f"    ✅ 成功 (状态: {response.status_code}, 大小: {content_length} bytes, 类型: {content_type})")
                results.append(True)
            else:
                print(f"    ❌ 失败 (状态: {response.status_code})")
                results.append(False)
                
        except requests.exceptions.RequestException as e:
            print(f"    ❌ 连接错误: {e}")
            results.append(False)
        
        time.sleep(0.1)  # 短暂延迟
    
    success_count = sum(results)
    total_count = len(results)
    
    print(f"\n📋 测试结果: {success_count}/{total_count} 文件可正常访问")
    
    if success_count == total_count:
        print("🎉 所有assets文件访问正常！")
    elif success_count > 0:
        print("⚠️ 部分assets文件访问正常，请检查失败的文件")
    else:
        print("❌ 所有assets文件访问失败，请检查服务器和路径配置")

if __name__ == '__main__':
    print("⏰ 等待2秒让服务器完全启动...")
    time.sleep(2)
    test_assets_access()