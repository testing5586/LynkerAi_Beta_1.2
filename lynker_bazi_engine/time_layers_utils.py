"""
时间层级计算工具
用于从出生时间计算 chart_time_layers 表的各层级字段值
"""

from datetime import datetime, time
from typing import Dict


def calculate_time_layers(birth_datetime: datetime) -> Dict[str, int]:
    """
    从出生时间计算时间层级索引
    
    Args:
        birth_datetime: 出生时间（datetime 对象）
        
    Returns:
        包含各层级索引的字典:
        {
            'parent_column': 0-23,      # 小时
            'point_column': 0-3,        # 点柱（15分钟/段）
            'ke_column': 0-2,           # 刻柱（5分钟/刻）
            'fen_column': 0-4,          # 分柱（1分钟/分）
            'micro_fen_column': 0-59    # 微分柱（秒）
        }
    
    示例:
        >>> birth = datetime(2000, 3, 20, 8, 18, 30)
        >>> layers = calculate_time_layers(birth)
        >>> print(layers)
        {'parent_column': 8, 'point_column': 1, 'ke_column': 0, 'fen_column': 3, 'micro_fen_column': 30}
    """
    
    hour = birth_datetime.hour
    minute = birth_datetime.minute
    second = birth_datetime.second
    
    # 层级 1: parent_column (0-23) - 小时
    parent_column = hour
    
    # 层级 2: point_column (0-3) - 每小时4段，每段15分钟
    # 0 = 00-14分, 1 = 15-29分, 2 = 30-44分, 3 = 45-59分
    point_column = minute // 15
    
    # 层级 3: ke_column (0-2) - 每点柱3刻，每刻5分钟
    # 0 = 0-4分, 1 = 5-9分, 2 = 10-14分
    ke_column = (minute % 15) // 5
    
    # 层级 4: fen_column (0-4) - 每刻5分，每分1分钟
    # 0 = 第1分钟, 1 = 第2分钟, ..., 4 = 第5分钟
    fen_column = (minute % 5)
    
    # 层级 5: micro_fen_column (0-59) - 秒
    micro_fen_column = second
    
    return {
        'parent_column': parent_column,
        'point_column': point_column,
        'ke_column': ke_column,
        'fen_column': fen_column,
        'micro_fen_column': micro_fen_column
    }


def format_time_layer_display(layers: Dict[str, int]) -> str:
    """
    格式化显示时间层级信息
    
    Args:
        layers: calculate_time_layers 返回的字典
        
    Returns:
        格式化的字符串
    """
    return (
        f"时柱: {layers['parent_column']}时 | "
        f"点柱: {layers['point_column']} | "
        f"刻柱: {layers['ke_column']} | "
        f"分柱: {layers['fen_column']} | "
        f"微分: {layers['micro_fen_column']}秒"
    )


def reconstruct_time_from_layers(
    parent: int,
    point: int,
    ke: int,
    fen: int,
    micro: int = 0
) -> time:
    """
    从层级索引反推时间（用于验证）
    
    Args:
        parent: parent_column (0-23)
        point: point_column (0-3)
        ke: ke_column (0-2)
        fen: fen_column (0-4)
        micro: micro_fen_column (0-59)
        
    Returns:
        time 对象
    """
    hour = parent
    minute = (point * 15) + (ke * 5) + fen
    second = micro
    
    return time(hour, minute, second)


# ============================================
# 测试示例
# ============================================
if __name__ == "__main__":
    # 测试案例 1
    birth1 = datetime(2000, 3, 20, 8, 18, 30)
    layers1 = calculate_time_layers(birth1)
    print(f"出生时间: {birth1}")
    print(f"层级数据: {layers1}")
    print(f"显示格式: {format_time_layer_display(layers1)}")
    print()
    
    # 测试案例 2
    birth2 = datetime(1995, 7, 15, 14, 47, 55)
    layers2 = calculate_time_layers(birth2)
    print(f"出生时间: {birth2}")
    print(f"层级数据: {layers2}")
    print(f"显示格式: {format_time_layer_display(layers2)}")
    print()
    
    # 验证反推
    reconstructed = reconstruct_time_from_layers(
        layers1['parent_column'],
        layers1['point_column'],
        layers1['ke_column'],
        layers1['fen_column'],
        layers1['micro_fen_column']
    )
    print(f"反推时间: {reconstructed}")
    print(f"原始时间: {birth1.time()}")
    print(f"匹配: {reconstructed == birth1.time()}")
