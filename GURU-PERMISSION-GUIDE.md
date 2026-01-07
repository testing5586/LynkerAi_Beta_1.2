# 命理师权限逻辑 - 前端集成指南

## 📋 核心规则总结

### 权限层级

```
未验证手机 → OTP验证 → 创建guru_account (pending) → 管理员审核 → approved → 可发布
     ❌           ✅            ✅ Dashboard           ❌ Publish    ✅ Publish
```

| 状态 | guru_account存在 | status | 可访问Dashboard | 可发布工作室 |
|------|-----------------|--------|----------------|-------------|
| 未验证手机 | ❌ | - | ❌ | ❌ |
| OTP已验证 | ✅ | pending | ✅ | ❌ |
| 管理员已审核 | ✅ | approved | ✅ | ✅ |

---

## 🔌 后端 API 端点

### 1. 发送 OTP
**POST** `/uxbot/api/otp/send`

```json
{
  "phone": "+8613800138000"
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

### 2. 验证 OTP（核心变更）
**POST** `/uxbot/api/otp/verify`

```json
{
  "phone": "+8613800138000",
  "otp": "123456",
  "email": "guru@example.com",  // 可选
  "display_name": "张大师"  // 可选
}
```

**✨ 新逻辑：验证成功后自动创建 guru_account**

**响应（首次验证 - 创建账号）：**
```json
{
  "success": true,
  "guru_account_id": "xxxx-xxxx-xxxx",
  "status": "pending",
  "message": "验证成功，命理师账号已创建，等待审核通过后可发布工作室"
}
```

**响应（账号已存在 - 幂等）：**
```json
{
  "success": true,
  "guru_account_id": "xxxx-xxxx-xxxx",
  "status": "pending"
}
```

---

### 3. 获取 Guru 状态（新增）
**GET** `/uxbot/api/guru/status?phone=+8613800138000`

**响应（未验证）：**
```json
{
  "exists": false,
  "can_access_dashboard": false,
  "can_publish": false,
  "message": "请先完成手机号验证以创建命理师账号"
}
```

**响应（pending状态）：**
```json
{
  "exists": true,
  "status": "pending",
  "can_access_dashboard": true,
  "can_publish": false,
  "guru_account": {
    "id": "xxxx",
    "display_name": "张大师",
    "email": "guru@example.com",
    "phone": "+8613800138000",
    "status": "pending",
    "phone_verified": true,
    "workspace_enabled": true
  }
}
```

**响应（approved状态）：**
```json
{
  "exists": true,
  "status": "approved",
  "can_access_dashboard": true,
  "can_publish": true,
  "guru_account": { ... }
}
```

---

### 4. 发布工作室（权限检查已修改）
**POST** `/uxbot/api/guru/publish`

```json
{
  "guru_id": "xxxx-xxxx-xxxx",
  "content": "..."
}
```

**✨ 权限检查变更：**
- ❌ 移除 `phone_verified` 检查（已是创建前置条件）
- ✅ 只检查 `status === 'approved'`

**响应（pending状态）：**
```json
{
  "error": "not approved",
  "message": "审核通过后才能发布工作室"
}
```

**响应（approved状态）：**
```json
{
  "success": true,
  "message": "工作室发布成功"
}
```

---

## 🎨 前端实现指南

### 完整流程示例

```javascript
// ==================== 步骤1：命理师注册 ====================
async function submitGuruRegistration() {
  const formData = {
    realName: "张大师",
    phone: "+8613800138000",
    email: "guru@example.com",
    categories: ["八字", "风水"],
    introduction: "..."
  };
  
  // 提交注册表单到 guru_registrations
  const response = await fetch('/uxbot/api/guru/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const result = await response.json();
  
  if (result.success) {
    // 显示OTP验证模态框
    showOTPVerificationModal(formData.phone, formData.email, formData.realName);
  }
}

// ==================== 步骤2：OTP验证 ====================
async function verifyPhoneOTP(phone, otp, email, displayName) {
  const response = await fetch('/uxbot/api/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: phone,
      otp: otp,
      email: email,  // 可选，用于创建guru_account
      display_name: displayName  // 可选
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    // 验证成功，guru_account已创建
    alert(`验证成功！${result.message}`);
    
    // 保存guru_account_id到本地存储
    localStorage.setItem('guru_account_id', result.guru_account_id);
    localStorage.setItem('guru_status', result.status);
    
    // 跳转到Guru Dashboard
    window.location.href = '/uxbot/guru-dashboard.html';
  } else {
    alert('验证失败: ' + result.error);
  }
}

// ==================== 步骤3：检查Guru状态 ====================
async function checkGuruStatus(phone) {
  const response = await fetch(`/uxbot/api/guru/status?phone=${encodeURIComponent(phone)}`);
  const result = await response.json();
  
  return result;
}

// ==================== 步骤4：Dashboard访问控制 ====================
async function initGuruDashboard() {
  const phone = localStorage.getItem('user_phone');
  
  if (!phone) {
    alert('请先登录');
    window.location.href = '/uxbot/login.html';
    return;
  }
  
  const status = await checkGuruStatus(phone);
  
  if (!status.exists) {
    // 未验证手机，不能访问Dashboard
    alert('请先完成手机号验证以创建命理师账号');
    window.location.href = '/uxbot/registra-guru.html';
    return;
  }
  
  // ✅ 存在guru_account，可以访问Dashboard
  renderDashboard(status);
}

// ==================== 步骤5：UI状态显示 ====================
function renderDashboard(status) {
  const statusBadge = document.getElementById('status-badge');
  const publishBtn = document.getElementById('publish-btn');
  
  if (status.status === 'pending') {
    // 🟡 审核中状态
    statusBadge.innerHTML = '🟡 命理师申请审核中（可配置，待审核后发布）';
    statusBadge.className = 'badge badge-warning';
    
    // Publish按钮禁用
    publishBtn.disabled = true;
    publishBtn.title = '审核通过后才能发布工作室';
    
  } else if (status.status === 'approved') {
    // ✅ 已审核状态
    statusBadge.innerHTML = '✅ 命理师账号已认证';
    statusBadge.className = 'badge badge-success';
    
    // Publish按钮启用
    publishBtn.disabled = false;
    publishBtn.title = '发布工作室';
  }
  
  // 显示guru信息
  document.getElementById('guru-name').textContent = status.guru_account.display_name;
  document.getElementById('guru-email').textContent = status.guru_account.email;
}

// ==================== 步骤6：发布工作室 ====================
async function publishWorkspace(guruId) {
  const response = await fetch('/uxbot/api/guru/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      guru_id: guruId,
      content: {
        // 工作室配置数据
      }
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    alert('工作室发布成功！');
  } else {
    if (result.error === 'not approved') {
      alert('审核通过后才能发布工作室');
    } else {
      alert('发布失败: ' + result.message);
    }
  }
}
```

---

## 🎯 UI/UX 设计建议

### 1. 注册流程

```
[填写注册表单]
    ↓
[提交注册] → 保存到 guru_registrations
    ↓
[弹出OTP验证框]
    ↓ (输入手机号)
[发送验证码] → POST /api/otp/send
    ↓ (输入OTP)
[提交验证] → POST /api/otp/verify
    ↓ ✅ 验证成功
[自动创建 guru_account (status=pending)]
    ↓
[跳转到 Guru Dashboard]
```

### 2. Dashboard 状态显示

**Pending 状态：**
```html
<div class="status-banner warning">
  <span class="icon">🟡</span>
  <div class="text">
    <h4>命理师申请审核中</h4>
    <p>您可以配置工作室信息，待审核通过后即可发布</p>
  </div>
</div>

<button class="publish-btn" disabled>
  <span class="icon">🔒</span>
  发布工作室（审核中）
</button>
```

**Approved 状态：**
```html
<div class="status-banner success">
  <span class="icon">✅</span>
  <div class="text">
    <h4>命理师账号已认证</h4>
    <p>您可以随时发布和管理工作室</p>
  </div>
</div>

<button class="publish-btn" onclick="publishWorkspace()">
  <span class="icon">🚀</span>
  发布工作室
</button>
```

### 3. 路由守卫（Router Guard）

```javascript
// 检查是否可以访问Guru页面
async function canAccessGuruPages() {
  const phone = localStorage.getItem('user_phone');
  if (!phone) return false;
  
  const status = await checkGuruStatus(phone);
  return status.exists;  // 只要guru_account存在就能访问
}

// 检查是否可以发布
async function canPublish() {
  const phone = localStorage.getItem('user_phone');
  if (!phone) return false;
  
  const status = await checkGuruStatus(phone);
  return status.can_publish;  // status === 'approved'
}
```

---

## ✅ 验证清单

### 测试场景

**场景1：未验证手机的用户**
- [ ] 无法访问 Guru Dashboard（重定向到注册页）
- [ ] 无 guru_account 记录
- [ ] GET /api/guru/status 返回 `exists: false`

**场景2：OTP验证成功**
- [ ] POST /api/otp/verify 返回 201 + guru_account_id
- [ ] guru_account 被创建，status='pending'
- [ ] 可以访问 Guru Dashboard
- [ ] 显示 "🟡 审核中" Badge
- [ ] Publish 按钮禁用

**场景3：管理员审核通过**
- [ ] 管理员调用 POST /api/admin/guru/approve
- [ ] guru_account.status 更新为 'approved'
- [ ] Dashboard 显示 "✅ 已认证" Badge
- [ ] Publish 按钮启用
- [ ] POST /api/guru/publish 成功返回 201

**场景4：重复验证（幂等性）**
- [ ] 同一手机号多次调用 /api/otp/verify
- [ ] 不创建重复的 guru_account
- [ ] 返回现有账号信息

---

## 🔧 开发工具

### cURL 测试命令

```bash
# 1. 发送OTP
curl -X POST http://localhost:8080/uxbot/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "+8613800138000"}'

# 2. 验证OTP（创建guru_account）
curl -X POST http://localhost:8080/uxbot/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+8613800138000",
    "otp": "123456",
    "email": "guru@example.com",
    "display_name": "张大师"
  }'

# 3. 查询Guru状态
curl "http://localhost:8080/uxbot/api/guru/status?phone=%2B8613800138000"

# 4. 发布工作室（需要approved状态）
curl -X POST http://localhost:8080/uxbot/api/guru/publish \
  -H "Content-Type: application/json" \
  -d '{"guru_id": "xxxx-xxxx-xxxx", "content": {}}'
```

---

## 🚀 快速启动

```powershell
# 1. 启动服务器（开发模式）
$env:UXBOT_DEBUG="1"; python "uxbot_frontend\run_server.py"

# 2. 在 Supabase 执行 SQL
# 运行 supabase_otp_schema.sql

# 3. 配置 .env（可选，测试模式可跳过）
# TWILIO_ACCOUNT_SID=...
# TWILIO_AUTH_TOKEN=...
# TWILIO_FROM_PHONE=...

# 4. 测试流程
# - 访问 http://localhost:8080/uxbot/registra-guru.html
# - 填写表单 → 验证OTP → 进入Dashboard
```

---

## 📚 相关文档

- [OTP 实施指南](OTP-IMPLEMENTATION-GUIDE.md)
- [Supabase Schema](supabase_otp_schema.sql)
- [API 桥接器](uxbot_frontend/api_bridge.py)
- [OTP 路由](uxbot_frontend/otp_routes.py)

---

## 🔗 数据流图

```
用户填写注册表单
    ↓
guru_registrations (status=pending)
    ↓
OTP 验证成功
    ↓
guru_accounts (status=pending, phone_verified=true) ← 【自动创建】
    ↓
允许访问 Dashboard ✅
允许配置工作室 ✅
禁止发布工作室 ❌
    ↓
管理员审核通过
    ↓
guru_accounts (status=approved)
    ↓
允许发布工作室 ✅
```

---

## ⚠️ 重要变更

### 与旧版本的区别

| 功能 | 旧版本 | 新版本 |
|-----|--------|--------|
| guru_account 创建时机 | 管理员审核后 | OTP验证成功后 |
| Dashboard 访问条件 | phone_verified=true | guru_account存在 |
| Publish 权限检查 | phone_verified + approved | 仅 approved |
| OTP verify 返回 | success: true | success + guru_account_id + status |

---

结束。前端开发按此文档实施即可。
