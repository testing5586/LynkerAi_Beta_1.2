# 命理师权限系统 - 修改完成摘要

## ✅ 完成的修改

### 1. 核心逻辑变更

#### 📍 OTP验证接口 (`/uxbot/api/otp/verify`)
**文件：** `uxbot_frontend/otp_routes.py`

**变更内容：**
- ✅ 验证成功后自动创建 `guru_account`
- ✅ 幂等性检查：已存在账号不重复创建
- ✅ 新建账号默认值：
  - `status = 'pending'`
  - `phone_verified = true`
  - `phone_verified_at = 当前时间`
  - `workspace_enabled = true`
- ✅ 从 `guru_registrations` 获取 email/display_name
- ✅ 返回 `guru_account_id` 和 `status`

**新响应格式：**
```json
{
  "success": true,
  "guru_account_id": "xxx-xxx-xxx",
  "status": "pending",
  "message": "验证成功，命理师账号已创建，等待审核通过后可发布工作室"
}
```

---

#### 📍 发布工作室接口 (`/uxbot/api/guru/publish`)
**文件：** `uxbot_frontend/api_bridge.py`

**变更内容：**
- ❌ 移除 `phone_verified` 检查（已是创建前置条件）
- ✅ 只检查 `status === 'approved'`
- ✅ 更清晰的错误消息

**权限检查逻辑：**
```python
# 旧版：检查 phone_verified + status
if not guru["phone_verified"]:
    return 403, "请先完成手机号验证"
if guru["status"] != "approved":
    return 403, "审核中"

# 新版：只检查 status
if guru["status"] != "approved":
    return 403, "审核通过后才能发布工作室"
```

---

#### 📍 新增：Guru状态查询接口 (`/uxbot/api/guru/status`)
**文件：** `uxbot_frontend/api_bridge.py`

**用途：** 前端判断用户权限

**请求：**
```
GET /uxbot/api/guru/status?phone=+8613800138000
```

**响应：**
```json
{
  "exists": true,
  "status": "pending",
  "can_access_dashboard": true,
  "can_publish": false,
  "guru_account": {
    "id": "xxx",
    "display_name": "张大师",
    "email": "guru@example.com",
    "phone": "+8613800138000",
    "status": "pending",
    "phone_verified": true,
    "workspace_enabled": true
  }
}
```

---

### 2. 数据库 Schema 更新

**文件：** `supabase_otp_schema.sql`

**新增/确认字段：**
```sql
ALTER TABLE guru_accounts
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS display_name text,
ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS phone_verified_at timestamptz,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS workspace_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS registration_id uuid;
```

**新增索引：**
- `idx_guru_phone`
- `idx_guru_email`
- `idx_guru_status`

---

### 3. 文档创建

#### 📄 [GURU-PERMISSION-GUIDE.md](GURU-PERMISSION-GUIDE.md)
完整的前端集成指南，包含：
- ✅ 核心规则说明
- ✅ API 端点详细文档
- ✅ 完整的 JavaScript 示例代码
- ✅ UI/UX 设计建议
- ✅ 路由守卫实现
- ✅ 测试场景清单
- ✅ cURL 测试命令

---

## 🎯 核心规则总结

### 权限层级

| 状态 | guru_account | status | Dashboard | Publish |
|------|--------------|--------|-----------|---------|
| 未验证手机 | ❌ | - | ❌ | ❌ |
| OTP已验证 | ✅ | pending | ✅ | ❌ |
| 管理员审核 | ✅ | approved | ✅ | ✅ |

### 判断逻辑

```javascript
// 是否为Guru（可以登录Guru系统）
const isGuru = guru_account存在;

// 是否可以访问Dashboard
const canAccessDashboard = guru_account存在;

// 是否可以发布工作室
const canPublish = guru_account.status === 'approved';
```

---

## 📋 待执行任务

### 1. 数据库配置（必须）
```sql
-- 在 Supabase SQL Editor 执行
-- 文件：supabase_otp_schema.sql
```

### 2. 前端开发（推荐）
- [ ] 创建 OTP 验证 UI 组件
- [ ] 在注册成功后显示 OTP 验证模态框
- [ ] Dashboard 状态 Badge 显示
- [ ] Publish 按钮权限控制
- [ ] 路由守卫实现

### 3. 测试验证
- [ ] 测试未验证用户无法访问 Dashboard
- [ ] 测试 OTP 验证创建 guru_account
- [ ] 测试 pending 状态无法发布
- [ ] 测试 approved 状态可以发布
- [ ] 测试幂等性（重复验证不创建重复账号）

---

## 🧪 快速测试

### 测试场景1：OTP验证创建账号

```bash
# 1. 发送OTP
curl -X POST http://localhost:8080/uxbot/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "+8613800138000"}'

# 响应会包含测试OTP码（如 "123456"）

# 2. 验证OTP（自动创建guru_account）
curl -X POST http://localhost:8080/uxbot/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+8613800138000",
    "otp": "123456",
    "email": "test@example.com",
    "display_name": "测试大师"
  }'

# 预期响应：
# {
#   "success": true,
#   "guru_account_id": "xxx-xxx-xxx",
#   "status": "pending",
#   "message": "验证成功，命理师账号已创建..."
# }
```

### 测试场景2：查询Guru状态

```bash
curl "http://localhost:8080/uxbot/api/guru/status?phone=%2B8613800138000"

# 预期响应：
# {
#   "exists": true,
#   "status": "pending",
#   "can_access_dashboard": true,
#   "can_publish": false,
#   "guru_account": {...}
# }
```

### 测试场景3：尝试发布（pending状态应失败）

```bash
curl -X POST http://localhost:8080/uxbot/api/guru/publish \
  -H "Content-Type: application/json" \
  -d '{"guru_id": "xxx-xxx-xxx", "content": {}}'

# 预期响应：
# {
#   "error": "not approved",
#   "message": "审核通过后才能发布工作室"
# }
```

---

## 🔧 开发环境状态

✅ Flask 服务器运行中
- URL: http://localhost:8080
- 模式: Debug（自动重载已启用）
- OTP路由: `/uxbot/api/otp/*`
- Guru API: `/uxbot/api/guru/*`

✅ 代码已自动重载
- `otp_routes.py` - 已更新
- `api_bridge.py` - 已更新
- Watchdog 自动检测到更改并重载

---

## 📚 相关文件

| 文件 | 作用 | 状态 |
|------|------|------|
| `uxbot_frontend/otp_routes.py` | OTP验证逻辑 | ✅ 已更新 |
| `uxbot_frontend/api_bridge.py` | Guru API接口 | ✅ 已更新 |
| `supabase_otp_schema.sql` | 数据库Schema | ✅ 已更新 |
| `GURU-PERMISSION-GUIDE.md` | 前端集成指南 | ✅ 已创建 |
| `OTP-IMPLEMENTATION-GUIDE.md` | OTP实施指南 | ✅ 已存在 |

---

## ⚠️ 注意事项

1. **数据库必须先执行 SQL**
   - 在测试前先在 Supabase 执行 `supabase_otp_schema.sql`
   - 确保 `guru_accounts` 表有所有必需字段

2. **测试模式**
   - 未配置 Twilio 时自动启用测试模式
   - 测试模式下 OTP 码会在响应中返回

3. **幂等性**
   - 同一手机号多次验证不会创建重复账号
   - 已存在账号只更新 `phone_verified` 状态

4. **状态流转**
   - `pending` → 只能由管理员审核改为 `approved`
   - `approved` → 才能发布工作室

---

## ✅ 验证清单

- [x] OTP验证成功自动创建 guru_account
- [x] guru_account 默认 status='pending'
- [x] Publish接口只检查 status='approved'
- [x] 新增 guru/status 查询接口
- [x] 更新数据库 Schema
- [x] 创建前端集成文档
- [x] 服务器自动重载成功

---

**修改已完成！** 🎉

前端开发请参考 [GURU-PERMISSION-GUIDE.md](GURU-PERMISSION-GUIDE.md)
