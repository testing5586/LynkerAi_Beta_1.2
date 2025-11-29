"""
权重调优引擎
Weight Tuner Engine

功能：
1. 读取历史匹配样本
2. 暴力枚举权重组合
3. 寻找最佳权重配置
4. 保存结果到数据库
"""
import sys
import os
from typing import List, Dict, Tuple, Any
import json

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from lynker_bazi_engine.supabase_client import get_supabase_client

def get_match_samples() -> List[Dict[str, Any]]:
    """
    获取用于训练的样本数据
    
    返回包含 time_score, father_score, mother_score 和 label (is_similar) 的列表
    """
    client = get_supabase_client()
    
    # 1. 获取所有匹配记录
    matches = client.table("chart_match_scores").select("*").execute().data
    
    # 2. 获取种子盘信息以确定标签
    # 我们需要知道 chart_id 对应的 chart_code 或 test_group
    charts = client.table("seed_charts").select("id, chart_code, test_group").execute().data
    chart_map = {c['id']: c for c in charts}
    
    samples = []
    
    for m in matches:
        id_a = m['chart_id_a']
        id_b = m['chart_id_b']
        
        if id_a not in chart_map or id_b not in chart_map:
            continue
            
        chart_a = chart_map[id_a]
        chart_b = chart_map[id_b]
        
        # 定义标签逻辑
        # 同组 (T1 vs T1) 或 克隆盘 视为相似 (Positive)
        # 不同组 (T1 vs T5) 视为不同 (Negative)
        is_similar = False
        if chart_a['test_group'] == chart_b['test_group']:
            is_similar = True
        
        # 特殊处理：TEST_A vs TEST_A_CLONE 是强相似
        if 'CLONE' in chart_a['chart_code'] or 'CLONE' in chart_b['chart_code']:
            if chart_a['test_group'] == chart_b['test_group']:
                is_similar = True
                
        samples.append({
            "time_score": m['time_score'],
            "father_score": m['father_score'],
            "mother_score": m['mother_score'],
            "is_similar": is_similar,
            "pair": f"{chart_a['chart_code']} vs {chart_b['chart_code']}"
        })
        
    return samples

def test_weights(t_w: float, f_w: float, m_w: float, samples: List[Dict[str, Any]]) -> float:
    """
    测试特定权重组合的准确率
    
    准确率定义：(正样本平均分 - 负样本平均分) * 100
    旨在最大化区分度
    """
    pos_scores = []
    neg_scores = []
    
    for s in samples:
        # 重新计算综合分
        composite = (
            s['time_score'] * t_w +
            s['father_score'] * f_w +
            s['mother_score'] * m_w
        )
        
        if s['is_similar']:
            pos_scores.append(composite)
        else:
            neg_scores.append(composite)
            
    if not pos_scores or not neg_scores:
        return 0.0
        
    avg_pos = sum(pos_scores) / len(pos_scores)
    avg_neg = sum(neg_scores) / len(neg_scores)
    
    # 分数差异作为准确率指标
    return avg_pos - avg_neg

def tune_weights() -> Dict[str, Any]:
    """
    执行权重调优
    """
    print("开始权重调优...")
    samples = get_match_samples()
    print(f"加载了 {len(samples)} 个样本")
    
    best_score = -float('inf')
    best_weights = None
    
    # 暴力寻优 (20% - 60%, 步长 5%)
    # 范围可以根据需要调整，这里遵循用户建议
    for t in range(20, 65, 5):
        for f in range(20, 65, 5):
            m = 100 - t - f
            
            # 确保母柱权重也在合理范围内 (例如 10-60)
            if m < 10 or m > 60:
                continue
                
            t_w = t / 100.0
            f_w = f / 100.0
            m_w = m / 100.0
            
            accuracy = test_weights(t_w, f_w, m_w, samples)
            
            if accuracy > best_score:
                best_score = accuracy
                best_weights = (t_w, f_w, m_w)
                
    if best_weights:
        result = {
            "time_weight": best_weights[0],
            "father_weight": best_weights[1],
            "mother_weight": best_weights[2],
            "accuracy_score": round(best_score, 2)
        }
        
        # 保存到数据库
        version_record = save_weight_version(result)
        if version_record and version_record.get("id") is not None:
            result["weight_version_id"] = version_record.get("id")
        
        return result
    else:
        return None

def save_weight_version(result: Dict[str, Any]):
    """
    ??????????
    """
    try:
        client = get_supabase_client()

        data = {
            "time_weight": result["time_weight"],
            "father_weight": result["father_weight"],
            "mother_weight": result["mother_weight"],
            "accuracy_score": result["accuracy_score"],
            "details": json.dumps({"algorithm": "brute_force_v1"})
        }

        res = client.table("weight_versions").insert(data).execute()
        print("???????????")
        if res.data and len(res.data) > 0:
            return res.data[0]
        return None

    except Exception as e:
        print(f"??????: {e}")
        return None


if __name__ == "__main__":
    # 本地测试
    res = tune_weights()
    print("最佳权重:", res)
