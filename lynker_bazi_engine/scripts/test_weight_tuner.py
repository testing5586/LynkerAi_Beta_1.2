"""
测试权重调优 API
Test Weight Tuner API
"""
import requests
import json

def test_weight_tuner():
    print("=" * 60)
    print("测试权重调优 API")
    print("=" * 60)
    
    url = "http://localhost:5000/api/weights/tune"
    
    try:
        print("正在发送请求 (可能需要几秒钟)...")
        res = requests.post(url)
        
        if res.status_code == 200:
            data = res.json()
            if data.get("success"):
                result = data["result"]
                print("\n✅ 调优成功！")
                print(f"  - 最佳准确率: {result['accuracy_score']}")
                print(f"  - 时间权重: {result['time_weight']}")
                print(f"  - 父柱权重: {result['father_weight']}")
                print(f"  - 母柱权重: {result['mother_weight']}")
            else:
                print(f"\n❌ 调优失败: {data.get('message')}")
        else:
            print(f"\n❌ HTTP 请求失败: {res.status_code}")
            print(res.text)
            
    except Exception as e:
        print(f"\n❌ 请求异常: {e}")

if __name__ == "__main__":
    test_weight_tuner()
