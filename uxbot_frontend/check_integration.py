# -*- coding: utf-8 -*-
"""
UXBot前端集成检查脚本
验证UXBot前端与后端系统的集成状态
"""
import os
import sys
import requests
import json
from pathlib import Path

class UXBotIntegrationChecker:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.results = {}
        
    def check_file_structure(self):
        """检查文件结构"""
        print("🔍 检查文件结构...")
        
        required_files = [
            'uxbot_frontend/__init__.py',
            'uxbot_frontend/uxbot_routes.py', 
            'uxbot_frontend/config.py',
            'uxbot_frontend/static_handler.py',
            'uxbot_frontend/api_bridge.py',
            'static/templates/uxbot/index.html'
        ]
        
        missing_files = []
        for file_path in required_files:
            full_path = self.project_root / file_path
            if not full_path.exists():
                missing_files.append(file_path)
        
        if missing_files:
            print(f"❌ 缺少文件: {missing_files}")
            self.results['file_structure'] = False
        else:
            print("✅ 所有必需文件存在")
            self.results['file_structure'] = True
            
    def check_uxbot_templates(self):
        """检查UXBot模板文件"""
        print("🔍 检查UXBot模板文件...")
        
        uxbot_dir = self.project_root / 'static/templates/uxbot'
        if not uxbot_dir.exists():
            print("❌ UXBot模板目录不存在")
            self.results['templates'] = False
            return
            
        html_files = list(uxbot_dir.glob('*.html'))
        print(f"✅ 找到 {len(html_files)} 个HTML模板文件")
        
        # 检查关键页面
        key_pages = [
            'index.html',
            'user-dashb-main.html',
            'samedestiny-matching.html',
            '我的真命盘.html',
            'guru-search.html',
            'lynkerforum.html'
        ]
        
        missing_pages = []
        for page in key_pages:
            if not (uxbot_dir / page).exists():
                missing_pages.append(page)
        
        if missing_pages:
            print(f"⚠️ 缺少关键页面: {missing_pages}")
        
        self.results['templates'] = len(missing_pages) == 0
        
    def check_admin_integration(self):
        """检查管理后台集成"""
        print("🔍 检查管理后台集成...")
        
        app_py = self.project_root / 'admin_dashboard/app.py'
        if not app_py.exists():
            print("❌ 管理后台app.py不存在")
            self.results['admin_integration'] = False
            return
            
        content = app_py.read_text(encoding='utf-8')
        if 'uxbot_frontend' in content and 'init_uxbot_frontend' in content:
            print("✅ UXBot前端已集成到管理后台")
            self.results['admin_integration'] = True
        else:
            print("❌ UXBot前端未集成到管理后台")
            self.results['admin_integration'] = False
            
    def check_test_server(self):
        """检查测试服务器"""
        print("🔍 检查测试服务器...")
        
        try:
            # 检查健康端点
            response = requests.get('http://localhost:8080/uxbot/api/health', timeout=5)
            if response.status_code == 200:
                print("✅ 测试服务器运行正常")
                health_data = response.json()
                print(f"   版本: {health_data.get('version', 'unknown')}")
                print(f"   状态: {health_data.get('status', 'unknown')}")
                self.results['test_server'] = True
            else:
                print(f"❌ 测试服务器异常: HTTP {response.status_code}")
                self.results['test_server'] = False
        except requests.exceptions.RequestException as e:
            print(f"❌ 无法连接测试服务器: {e}")
            print("   请确保运行了 python uxbot_frontend/test_server.py")
            self.results['test_server'] = False
            
    def check_api_endpoints(self):
        """检查API端点"""
        print("🔍 检查API端点...")
        
        if not self.results.get('test_server'):
            print("⏭️ 跳过API检查（测试服务器未运行）")
            return
            
        api_endpoints = [
            '/uxbot/api/health',
            '/uxbot/api/user/profile',
            '/uxbot/api/guru/search',
            '/uxbot/api/forum/posts'
        ]
        
        working_apis = []
        for endpoint in api_endpoints:
            try:
                response = requests.get(f'http://localhost:8080{endpoint}', timeout=3)
                if response.status_code in [200, 405]:  # 405 for POST-only endpoints
                    working_apis.append(endpoint)
                    print(f"✅ {endpoint}")
                else:
                    print(f"❌ {endpoint}: HTTP {response.status_code}")
            except Exception as e:
                print(f"❌ {endpoint}: {e}")
        
        self.results['api_endpoints'] = len(working_apis) >= len(api_endpoints) * 0.75
        
    def check_page_accessibility(self):
        """检查页面可访问性"""
        print("🔍 检查页面可访问性...")
        
        if not self.results.get('test_server'):
            print("⏭️ 跳过页面检查（测试服务器未运行）")
            return
            
        test_pages = [
            '/uxbot/',
            '/uxbot/dashboard',
            '/uxbot/matching',
            '/uxbot/truechart',
            '/uxbot/guru/search',
            '/uxbot/forum'
        ]
        
        accessible_pages = []
        for page in test_pages:
            try:
                response = requests.get(f'http://localhost:8080{page}', timeout=5)
                if response.status_code == 200:
                    accessible_pages.append(page)
                    print(f"✅ {page}")
                else:
                    print(f"❌ {page}: HTTP {response.status_code}")
            except Exception as e:
                print(f"❌ {page}: {e}")
        
        self.results['page_accessibility'] = len(accessible_pages) >= len(test_pages) * 0.8
        
    def generate_report(self):
        """生成检查报告"""
        print("\n" + "="*50)
        print("📋 UXBot前端集成检查报告")
        print("="*50)
        
        total_checks = len(self.results)
        passed_checks = sum(1 for result in self.results.values() if result)
        
        for check_name, result in self.results.items():
            status = "✅ 通过" if result else "❌ 失败"
            print(f"{check_name:20} : {status}")
        
        print(f"\n总体状态: {passed_checks}/{total_checks} 检查通过")
        
        if passed_checks == total_checks:
            print("🎉 恭喜！UXBot前端集成完全成功！")
            print("\n🚀 下一步操作:")
            print("1. 启动完整系统: 运行 run_app.bat")
            print("2. 访问 http://localhost:5000/uxbot/")
            print("3. 开始使用UXBot前端界面")
        elif passed_checks >= total_checks * 0.75:
            print("⚠️ UXBot前端基本集成成功，有部分问题需要解决")
            print("\n🔧 建议操作:")
            print("1. 检查失败项目的具体错误信息")
            print("2. 参考README.md中的故障排除部分")
        else:
            print("❌ UXBot前端集成存在较多问题，需要进一步排查")
            print("\n🆘 建议操作:")
            print("1. 检查项目文件结构是否完整")
            print("2. 确认UXBot HTML文件是否正确复制")
            print("3. 查看详细错误日志")
            
    def run_all_checks(self):
        """运行所有检查"""
        print("🔍 开始UXBot前端集成检查...\n")
        
        self.check_file_structure()
        self.check_uxbot_templates()
        self.check_admin_integration()
        self.check_test_server()
        self.check_api_endpoints()
        self.check_page_accessibility()
        
        self.generate_report()

if __name__ == '__main__':
    checker = UXBotIntegrationChecker()
    checker.run_all_checks()