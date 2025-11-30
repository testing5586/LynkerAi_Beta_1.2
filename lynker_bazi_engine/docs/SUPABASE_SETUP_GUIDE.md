# Supabase 时间层级匹配 - 完整实施指南

## ✅ 已创建的文件

### 1. SQL 脚本
- **`supabase_time_layers.sql`** - 主脚本
  - ALTER TABLE 添加5个层级字段
  - 创建4个组合索引
  - RPC 函数 `match_by_time_layer()`

- **`supabase_test_data.sql`** - 测试数据
  - 10条示例记录
  - 验证查询示例

### 2. Python 工具
- **`time_layers_utils.py`** - 计算工具
  - `calculate_time_layers()` - 计算层级索引
  - `format_time_layer_display()` - 格式化显示
  - `reconstruct_time_from_layers()` - 反推验证

---

## 🚀 执行步骤

### 步骤 1: 执行主脚本

1. 打开 Supabase SQL Editor:
   ```
   https://supabase.com/dashboard/project/tojtfjkreudspzhkwdwj/sql
   ```

2. 复制 `supabase_time_layers.sql` 的全部内容

3. 粘贴到 SQL Editor 并点击 **Run**

4. 验证执行成功:
   - 检查 `chart_time_layers` 表是否有新字段
   - 检查 Functions 中是否有 `match_by_time_layer`

### 步骤 2: 插入测试数据

1. 复制 `supabase_test_data.sql` 的 INSERT 部分

2. 在 SQL Editor 中执行

3. 验证数据:
   ```sql
   SELECT COUNT(*) FROM chart_time_layers;
   -- 应该返回至少 10 条记录
   ```

### 步骤 3: 测试匹配查询

运行测试查询（在 `supabase_test_data.sql` 中）:

```sql
-- 同点柱匹配
SELECT * FROM chart_time_layers
WHERE parent_column = 8 AND point_column = 1;

-- 同刻柱匹配
SELECT * FROM chart_time_layers
WHERE parent_column = 8 AND point_column = 1 AND ke_column = 0;

-- 同分柱匹配
SELECT * FROM chart_time_layers
WHERE parent_column = 8 AND point_column = 1 
  AND ke_column = 0 AND fen_column = 3;
```

### 步骤 4: 测试 RPC 函数

```sql
-- 获取第一个用户的 UUID
SELECT user_id FROM chart_time_layers LIMIT 1;

-- 测试同点柱匹配
SELECT * FROM match_by_time_layer('用户UUID', 'point', 10);

-- 测试同刻柱匹配
SELECT * FROM match_by_time_layer('用户UUID', 'ke', 10);

-- 测试同分柱匹配
SELECT * FROM match_by_time_layer('用户UUID', 'fen', 10);
```

---

## 📊 字段结构说明

| 字段 | 类型 | 范围 | 说明 |
|------|------|------|------|
| `parent_column` | INT | 0-23 | 小时（24小时制） |
| `point_column` | INT | 0-3 | 点柱（15分钟/段） |
| `ke_column` | INT | 0-2 | 刻柱（5分钟/刻） |
| `fen_column` | INT | 0-4 | 分柱（1分钟/分） |
| `micro_fen_column` | INT | 0-59 | 微分柱（秒） |

---

## 🔍 匹配规则（铁板式逐层锁定）

| 模式 | 匹配条件 |
|------|----------|
| 同点柱 | `parent` 相同 + `point` 相同 |
| 同刻柱 | `parent` 相同 + `point` 相同 + `ke` 相同 |
| 同分柱 | `parent` 相同 + `point` 相同 + `ke` 相同 + `fen` 相同 |
| 微分柱 | 全部5层相同 |

---

## 🐍 Python 使用示例

```python
from datetime import datetime
from time_layers_utils import calculate_time_layers

# 计算层级
birth = datetime(2000, 3, 20, 8, 18, 30)
layers = calculate_time_layers(birth)

print(layers)
# {'parent_column': 8, 'point_column': 1, 'ke_column': 0, 
#  'fen_column': 3, 'micro_fen_column': 30}

# 存入数据库
# INSERT INTO chart_time_layers (user_id, parent_column, ...)
# VALUES (user_id, 8, 1, 0, 3, 30)
```

---

## 🔗 集成到 Flask API

更新 `app.py`:

```python
from supabase import create_client
from time_layers_utils import calculate_time_layers
import os

# 初始化 Supabase
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

@app.route('/api/match-same-life', methods=['POST'])
def match_same_life_api():
    data = request.json
    mode = data.get("mode", "fen")
    user_id = "当前用户UUID"  # 从 session 获取
    
    # 调用 Supabase RPC
    result = supabase.rpc(
        'match_by_time_layer',
        {
            'p_user_id': user_id,
            'p_mode': mode,
            'p_limit': 20
        }
    ).execute()
    
    return jsonify({
        "success": True,
        "matches": result.data
    })
```

---

## ✅ 验证清单

- [ ] `chart_time_layers` 表有5个新字段
- [ ] 4个组合索引已创建
- [ ] `match_by_time_layer` 函数存在
- [ ] 测试数据插入成功（10条）
- [ ] 同点柱查询返回正确结果
- [ ] 同刻柱查询返回正确结果
- [ ] 同分柱查询返回正确结果
- [ ] RPC 函数调用成功

---

## 🎉 完成！

所有脚本和工具已准备就绪，可以在 Supabase 中执行。
