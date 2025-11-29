# Supabase 集成设置指南

## 1. 安装依赖

```bash
pip install -r requirements.txt
```

这将安装以下包：
- Flask==3.0.0
- Flask-CORS==4.0.0
- python-dotenv==1.0.0
- supabase==2.3.0

## 2. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 创建新项目或使用现有项目
3. 在项目设置中找到以下信息：
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. 执行 SQL 创建表

在 Supabase SQL Editor 中执行 `supabase_family_columns.sql` 文件内容：

1. 打开 Supabase Dashboard
2. 进入 SQL Editor
3. 创建新查询
4. 复制粘贴 `supabase_family_columns.sql` 的全部内容
5. 点击 "Run" 执行

执行后会创建：
- `chart_family_columns` 表
- 相关索引
- 字段注释

## 4. 配置环境变量

在项目根目录创建 `.env` 文件：

```bash
# 复制模板文件
cp .env.example .env
```

编辑 `.env` 文件，填入你的 Supabase 凭证：

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key-here
```

⚠️ **重要**: `.env` 文件已在 `.gitignore` 中，不会被提交到 Git

## 5. 测试连接

启动 Flask 服务器：

```bash
python app.py
```

测试 Supabase 连接：

```bash
curl http://localhost:5000/api/supabase-test
```

预期响应：
```json
{
  "success": true,
  "message": "Supabase 连接成功！"
}
```

## 6. API 使用示例

### 6.1 计算并保存父母柱数据

```bash
curl -X POST http://localhost:5000/api/calc/family-columns \
  -H "Content-Type: application/json" \
  -d '{
    "chart_id": 12345,
    "save_to_db": true,
    "chart_data": {
      "parents_palace": {
        "main_stars": ["太阳", "天府", "太阴"],
        "transformations": {
          "化禄": true,
          "化权": false,
          "化科": true,
          "化忌": false
        }
      }
    }
  }'
```

响应：
```json
{
  "success": true,
  "family_data": {
    "father_presence": 65,
    "father_authority": 50,
    ...
  },
  "interpretation": {
    "father_summary": "...",
    "mother_summary": "...",
    "structure_type": {...}
  },
  "db_saved": true,
  "db_record_id": 1
}
```

### 6.2 查询已保存的父母柱数据

```bash
curl http://localhost:5000/api/family-columns/12345
```

响应：
```json
{
  "success": true,
  "family_data": {
    "id": 1,
    "chart_id": 12345,
    "father_presence": 65,
    ...
  },
  "interpretation": {
    "father_summary": "...",
    "mother_summary": "...",
    "structure_type": {...}
  }
}
```

## 7. 数据库操作函数

在 Python 代码中直接使用：

```python
from db.family_columns_db import (
    insert_family_columns,
    get_family_columns_by_chart_id,
    upsert_family_columns,
    update_family_columns,
    delete_family_columns
)

# 插入数据
result = insert_family_columns(chart_id=12345, family_data=family_data)

# 查询数据
record = get_family_columns_by_chart_id(chart_id=12345)

# 插入或更新（如果已存在则更新）
result = upsert_family_columns(chart_id=12345, family_data=family_data)

# 更新数据
result = update_family_columns(record_id=1, family_data=new_data)

# 删除数据
success = delete_family_columns(record_id=1)
```

## 8. 故障排查

### 连接失败

如果 `/api/supabase-test` 返回失败：

1. 检查 `.env` 文件是否存在且配置正确
2. 确认 `SUPABASE_URL` 和 `SUPABASE_KEY` 无误
3. 检查网络连接
4. 确认 Supabase 项目状态正常

### 表不存在错误

如果出现 "relation does not exist" 错误：

1. 确认已在 Supabase SQL Editor 中执行了 `supabase_family_columns.sql`
2. 检查表名是否正确：`chart_family_columns`
3. 在 Supabase Table Editor 中确认表已创建

### 权限错误

如果出现权限相关错误：

1. 确认使用的是 `anon` key（公开密钥）
2. 检查 Supabase 的 Row Level Security (RLS) 策略
3. 在开发环境可以暂时禁用 RLS 进行测试

## 9. 下一步

- [ ] 集成到实际的命盘计算流程
- [ ] 添加用户认证和权限控制
- [ ] 实现批量数据导入
- [ ] 添加数据分析和统计功能
