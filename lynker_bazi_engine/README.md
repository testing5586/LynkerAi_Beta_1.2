# 同命匹配测试页面

## 📁 项目结构（纯 HTML/JS/CSS）

```
lynker-engine/
├── app.py                      # Flask 后端 (端口 5000)
├── requirements.txt            # Python 依赖
├── templates/
│   └── samelife.html          # 测试页面 (纯 HTML)
└── static/
    ├── css/
    │   └── samelife.css       # 样式文件
    └── js/
        └── samelife.js        # 原生 JavaScript
```

## 🚀 快速启动

### 1. 安装 Python 依赖

```bash
pip install -r requirements.txt
```

### 2. 启动 Flask 服务器

```bash
python app.py
```

服务器将在 **http://localhost:5000** 启动

### 3. 访问测试页面

打开浏览器访问：**http://localhost:5000**

## 🎯 当前功能

### ✅ 已实现
- 纯 HTML/CSS/JavaScript（无框架）
- 四种匹配模式切换：同时辰 / 同点柱 / 同期刻 / 同分命
- 模拟 API 响应（不同模式返回不同数据）
- 加载状态、错误处理、空状态显示

### 📋 待实现
- [ ] Supabase 数据库连接
- [ ] 真实的点柱/刻柱/分柱匹配逻辑
- [ ] 用户认证（Flask-Login）
- [ ] 查看命盘功能
- [ ] 打招呼/消息功能
- [ ] 多语言支持（i18n.js）

## 🔧 API 接口

### POST /api/match-same-life

**请求体**:
```json
{
  "mode": "fen"  // hour | point | ke | fen
}
```

**响应**:
```json
{
  "success": true,
  "mode": "fen",
  "matches": [
    {
      "user_id": "cde567fgh890",
      "similarity": 98,
      "birth_time": "2000-03-20 08:18",
      "true_solar_time": "08:10"
    }
  ]
}
```

## 📊 匹配模式说明

| 模式 | 精度 | 说明 |
|------|------|------|
| hour (同时辰) | 2小时 | 匹配相同时辰（子丑寅卯...） |
| point (同点柱) | 1小时 | 匹配相同点柱 |
| ke (同期刻) | 15分钟 | 匹配相同刻柱 |
| fen (同分命) | 1分钟 | 精确到分钟匹配 |

## 🗄️ Supabase 表结构（待创建）

### users_charts 表
```sql
CREATE TABLE users_charts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  birth_time TIMESTAMP NOT NULL,
  true_solar_time TIME NOT NULL,
  hour_pillar VARCHAR(10),    -- 时柱
  point_pillar VARCHAR(10),   -- 点柱
  ke_pillar VARCHAR(10),      -- 刻柱
  fen_pillar VARCHAR(10),     -- 分柱
  created_at TIMESTAMP DEFAULT NOW()
);

-- 索引优化查询
CREATE INDEX idx_hour_pillar ON users_charts(hour_pillar);
CREATE INDEX idx_point_pillar ON users_charts(point_pillar);
CREATE INDEX idx_ke_pillar ON users_charts(ke_pillar);
CREATE INDEX idx_fen_pillar ON users_charts(fen_pillar);
```

## 🔄 下一步开发

1. **连接 Supabase**
   ```python
   from supabase import create_client
   
   supabase = create_client(
       os.getenv("SUPABASE_URL"),
       os.getenv("SUPABASE_KEY")
   )
   ```

2. **实现匹配逻辑**
   - 根据 mode 查询对应的柱
   - 计算相似度
   - 返回排序后的结果

3. **添加认证**
   - Flask-Login 集成
   - 获取当前用户的命盘数据

4. **实时功能**
   - Socket.io 集成（端口 3001）
   - 实时通知新的匹配

## 🐛 调试

### 查看控制台日志
打开浏览器开发者工具 (F12) 查看：
- 网络请求
- JavaScript 错误
- API 响应数据

### 测试 API
使用 curl 或 Postman 测试：
```bash
curl -X POST http://localhost:5000/api/match-same-life \
  -H "Content-Type: application/json" \
  -d '{"mode":"fen"}'
```

## 📝 注意事项

- 这是一个**测试页面**，用于验证逻辑和表结构
- 当前使用**模拟数据**，不连接真实数据库
- 生产环境需要添加：
  - 用户认证
  - 权限控制
  - 速率限制
  - 错误日志
