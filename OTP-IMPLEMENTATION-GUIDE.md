# Twilio OTP 验证系统 - 实施指南

## 📋 概述

为灵客AI接入基于 Twilio 的手机 OTP 验证机制，用于命理师（Guru）电话验证。

**核心规则：**
- ✅ 手机验证解锁站内功能（Guru Dashboard）
- ❌ 发布内容仍需通过管理员审核
- 🔒 双重验证：`phone_verified=true` + `status='approved'`

---

## 🎯 已完成的实施步骤

### 1️⃣ 环境准备
- ✅ 安装 Twilio SDK: `pip install twilio`
- ✅ `.env` 配置模板已添加（需填写实际值）

### 2️⃣ 后端实现
- ✅ 创建 `uxbot_frontend/otp_routes.py`
  - POST `/uxbot/api/otp/send` - 发送OTP
  - POST `/uxbot/api/otp/verify` - 验证OTP
- ✅ 注册 OTP 蓝图到 Flask app
- ✅ 更新 `approve_guru` 端点包含 phone 字段
- ✅ 创建 `guru/publish` 端点（双重权限检查）

### 3️⃣ 数据库准备
- ✅ SQL文件已生成: `supabase_otp_schema.sql`
- 📝 需要执行（见下方说明）

---

## 🗄️ 数据库配置（必须执行）

### 在 Supabase 中执行 SQL

1. 打开 Supabase Dashboard
2. 进入 **SQL Editor**
3. 复制执行 `supabase_otp_schema.sql` 内容

**创建的表/字段：**

```sql
-- phone_otp_verifications 表
CREATE TABLE phone_otp_verifications (
  id uuid PRIMARY KEY,
  phone text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- guru_accounts 新增字段
ALTER TABLE guru_accounts
ADD COLUMN phone_verified boolean DEFAULT false,
ADD COLUMN phone_verified_at timestamptz,
ADD COLUMN phone text;
```

---

## 🔐 Twilio 配置

### 获取凭证

1. 注册 Twilio 账号: https://www.twilio.com/try-twilio
2. 前往 Console: https://console.twilio.com
3. 获取以下信息：
   - Account SID
   - Auth Token
   - Twilio Phone Number (购买或使用试用号码)

### 更新 .env 文件

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM_PHONE=+1xxxxxxxxxx
```

**⚠️ 测试模式：**
- 如果未配置 Twilio，系统自动启用测试模式
- 测试模式下，API 会返回 OTP 码（用于开发调试）

---

## 🔌 API 端点

### 1. 发送 OTP
**POST** `/uxbot/api/otp/send`

**请求：**
```json
{
  "phone": "+8613800138000"
}
```

**响应（生产模式）：**
```json
{
  "success": true
}
```

**响应（测试模式）：**
```json
{
  "success": true,
  "test_mode": true,
  "otp_code": "123456"
}
```

---

### 2. 验证 OTP
**POST** `/uxbot/api/otp/verify`

**请求：**
```json
{
  "phone": "+8613800138000",
  "otp": "123456"
}
```

**响应（成功）：**
```json
{
  "success": true
}
```

**响应（失败）：**
```json
{
  "error": "otp expired or invalid"
}
```

---

### 3. 发布内容（权限校验）
**POST** `/uxbot/api/guru/publish`

**请求：**
```json
{
  "guru_id": "xxxx-xxxx-xxxx",
  "content": "..."
}
```

**响应（手机未验证）：**
```json
{
  "error": "phone not verified",
  "message": "请先完成手机号验证"
}
```

**响应（未审核）：**
```json
{
  "error": "not approved",
  "message": "您的申请还在审核中，暂时无法发布内容"
}
```

---

## 🎨 前端集成建议

### 验证流程 UI

```
[提交申请] 
    ↓
[显示「📞 验证手机号」模态框]
    ↓
[输入手机号] → [发送验证码] → 调用 /api/otp/send
    ↓
[输入验证码] → [提交验证] → 调用 /api/otp/verify
    ↓
[验证成功] → 解锁 Guru Dashboard
    ↓
[显示 Badge：命理师申请审核中]
    ↓
[publish 按钮仍然灰色 - 等待管理员审核]
```

### 示例代码（JavaScript）

```javascript
// 发送OTP
async function sendOTP(phone) {
  const response = await fetch('/uxbot/api/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  
  const data = await response.json();
  
  if (data.test_mode) {
    console.log('测试OTP码:', data.otp_code);
    alert(`测试模式 - OTP: ${data.otp_code}`);
  }
  
  return data;
}

// 验证OTP
async function verifyOTP(phone, otp) {
  const response = await fetch('/uxbot/api/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });
  
  return response.json();
}

// 使用示例
document.getElementById('send-otp-btn').onclick = async () => {
  const phone = document.getElementById('phone-input').value;
  await sendOTP(phone);
  alert('验证码已发送');
};

document.getElementById('verify-btn').onclick = async () => {
  const phone = document.getElementById('phone-input').value;
  const otp = document.getElementById('otp-input').value;
  
  const result = await verifyOTP(phone, otp);
  
  if (result.success) {
    alert('验证成功！');
    // 解锁 Guru Dashboard
    window.location.href = '/uxbot/guru-dashboard.html';
  } else {
    alert('验证失败: ' + result.error);
  }
};
```

---

## 🧪 测试步骤

### 1. 启动服务器
```powershell
$env:UXBOT_DEBUG="1"; python "uxbot_frontend\run_server.py"
```

### 2. 测试 OTP 发送
```bash
curl -X POST http://localhost:8080/uxbot/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "+8613800138000"}'
```

### 3. 测试 OTP 验证
```bash
curl -X POST http://localhost:8080/uxbot/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"phone": "+8613800138000", "otp": "123456"}'
```

### 4. 测试发布权限
```bash
curl -X POST http://localhost:8080/uxbot/api/guru/publish \
  -H "Content-Type: application/json" \
  -d '{"guru_id": "xxx", "content": "test"}'
```

---

## 📝 TODO 清单

### 前端开发
- [ ] 创建手机验证 UI 组件
- [ ] 在注册成功后显示验证提示
- [ ] Guru Dashboard 显示验证状态 Badge
- [ ] 发布按钮根据权限状态显示

### 生产部署
- [ ] 购买 Twilio 正式号码
- [ ] 更新 .env 为生产凭证
- [ ] 删除测试模式的 `otp_code` 返回
- [ ] 配置 SMS 模板（中英文）
- [ ] 添加速率限制（防止OTP轰炸）

### 安全增强
- [ ] 添加 OTP 重发限制（同一号码5分钟内最多3次）
- [ ] 记录验证失败次数（超过5次锁定账号）
- [ ] 添加手机号格式验证
- [ ] 实现 OTP 记录自动清理（7天后）

---

## 🚀 快速启动命令

```powershell
# 1. 安装依赖（已完成）
# pip install twilio

# 2. 配置环境变量
# 编辑 .env 填写 Twilio 凭证

# 3. 执行数据库 SQL
# 在 Supabase SQL Editor 运行 supabase_otp_schema.sql

# 4. 启动开发服务器
$env:UXBOT_DEBUG="1"; python "uxbot_frontend\run_server.py"
```

---

## 🔗 相关资源

- Twilio 文档: https://www.twilio.com/docs/sms
- Twilio Console: https://console.twilio.com
- Supabase Dashboard: https://supabase.com/dashboard
- Flask Blueprint: https://flask.palletsprojects.com/en/2.3.x/blueprints/

---

## 📞 联系支持

如有问题，请检查：
1. `.env` 文件是否正确配置
2. Supabase SQL 是否执行成功
3. Flask 服务器日志中的错误信息

测试模式可用于本地开发，无需实际 Twilio 账号。
