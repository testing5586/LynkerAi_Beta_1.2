# UXBot 前端与 Supabase 后端集成指南

## 📋 概述

UXBot 生成的前端页面需要与现有的 Flask + Supabase 后端系统集成。

## 🗄️ 当前后端架构

### 1. **数据库表结构** (Supabase)

#### `public.users` - 主用户表
```sql
- id (BIGSERIAL PRIMARY KEY)
- email (TEXT UNIQUE)
- password_hash (TEXT)
- first_name (TEXT) -- 用于存储假名/昵称
- last_name (TEXT)
- user_type (TEXT) -- 'normal_user' 或 'guru'
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- drive_connected (BOOLEAN)
- drive_access_token (TEXT)
- drive_email (TEXT)
```

#### `normal_user_profiles` - 普通用户档案
```sql
- id (BIGSERIAL PRIMARY KEY)
- user_id (BIGINT, FK -> users.id)
- pseudonym (TEXT) -- 假名
- region (TEXT) -- 地区
- nationality (TEXT) -- 国籍
- cultural_background (TEXT)
- created_at (TIMESTAMP)
```

#### `guru_profiles` - 命理师档案
```sql
- id (BIGSERIAL PRIMARY KEY)  
- user_id (BIGINT, FK -> users.id)
- pseudonym (TEXT)
- bio (TEXT)
- specializations (TEXT[])
- region (TEXT)
- nationality (TEXT)
- created_at (TIMESTAMP)
```

### 2. **现有 API 端点**

#### `/api/register` - 基础注册
- **Method**: POST
- **Body**: `{ email, password, nickname }`
- **功能**: 创建用户账号（不创建档案）
- **返回**: `{ success, user: { id, email, firstName } }`

#### `/api/login` - 用户登录
- **Method**: POST
- **Body**: `{ email, password }`
- **功能**: 验证用户并创建会话
- **返回**: `{ success, user: { id, email, userType } }`

#### `/api/user-profile` - 创建普通用户档案
- **Method**: POST
- **Body**: `{ pseudonym, region, nationality, culturalBackground }`
- **功能**: 为已登录用户创建完整档案
- **文件**: `admin_dashboard/auth/routes.py` (需要添加)

#### `/api/guru-register-direct` - 命理师一站式注册
- **Method**: POST
- **Body**: `{ email, password, displayName, realName, phoneNumber, bio, specializations }`
- **功能**: 同时创建账号和命理师档案
- **返回**: `{ success, redirectTo: '/guru/dashboard' }`

## 🔗 UXBot 前端集成方案

### 方案 1: 使用现有 API（推荐）

UXBot 前端的 React 组件需要调用后端 API。由于表单逻辑在 S3 CDN 的 JavaScript 中，我们需要：

#### A. 修改 UXBot 前端的 JavaScript 提交逻辑

在 `user-registration-form.html` 的 React 组件中：

```javascript
// 当用户提交表单时
async function handleSubmit(formData) {
  // 第一步：注册基础账号
  const registerResponse = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.email,
      password: formData.googleToken, // 或临时密码
      nickname: formData.pseudonym
    })
  });

  if (!registerResponse.ok) {
    throw new Error('注册失败');
  }

  // 第二步：创建用户档案
  const profileResponse = await fetch('/api/user-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pseudonym: formData.pseudonym,
      region: formData.region,
      nationality: formData.nationality,
      culturalBackground: formData.culturalBackground
    })
  });

  // 第三步：绑定 Google Drive（如果需要）
  if (formData.googleConnected) {
    await fetch('/api/connect-drive', {
      method: 'POST',
      body: JSON.stringify({ accessToken: formData.googleToken })
    });
  }

  // 重定向到用户主页
  window.location.href = '/user/home';
}
```

#### B. 创建新的 API 端点（需要添加到 `auth/routes.py`）

```python
@auth_bp.route('/api/user-profile', methods=['POST'])
@login_required
def api_create_user_profile():
    """
    创建普通用户档案
    需要先登录
    """
    try:
        data = request.json
        pseudonym = data.get('pseudonym', '').strip()
        region = data.get('region')
        nationality = data.get('nationality')
        cultural_background = data.get('culturalBackground')
        
        # 验证假名
        if not validate_pseudonym(pseudonym):
            return jsonify({'error': '假名至少需要5个字符'}), 400
        
        # 创建档案
        profile = create_normal_user_profile(
            user_id=current_user.id,
            pseudonym=pseudonym,
            region=region,
            nationality=nationality,
            cultural_background=cultural_background
        )
        
        if not profile:
            return jsonify({'error': '创建档案失败'}), 500
        
        return jsonify({
            'success': True,
            'message': '档案创建成功',
            'profile': {
                'pseudonym': pseudonym,
                'region': region
            }
        }), 201
        
    except Exception as e:
        print(f"[Auth] 创建用户档案失败: {e}")
        return jsonify({'error': str(e)}), 500
```

### 方案 2: 直接修改 HTML 添加表单提交

如果不想修改 S3 CDN 的 JavaScript，可以在 HTML 页面底部添加自定义脚本：

```html
<script>
// 添加在 user-registration-form.html 底部
(function() {
  // 监听表单提交事件
  window.addEventListener('uxbot:formSubmit', async function(e) {
    const formData = e.detail;
    
    try {
      // 调用后端 API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password || 'temp_' + Date.now(),
          nickname: formData.pseudonym
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // 创建用户档案
        await createUserProfile(formData);
        // 重定向
        window.location.href = '/user/home';
      } else {
        alert('注册失败: ' + result.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('注册出错，请稍后重试');
    }
  });
})();
</script>
```

## 📝 需要完成的步骤

### 步骤 1: 添加缺失的 API 端点

在 `admin_dashboard/auth/routes.py` 添加：

1. ✅ `/api/user-profile` - 创建普通用户档案
2. ✅ `/api/connect-drive` - 绑定 Google Drive  
3. ✅ `/api/check-pseudonym` - 验证假名是否可用

### 步骤 2: 修改 UXBot 前端

两个选择：
1. **修改源代码** - 需要重新生成并上传 JS 到 S3（复杂）
2. **添加拦截器** - 在 HTML 中添加自定义脚本（简单）

推荐方案 2：添加拦截器脚本

### 步骤 3: 测试集成

1. 访问 `http://localhost:5000/uxbot/user-registration-form.html`
2. 填写表单
3. 提交后检查：
   - Supabase `users` 表是否创建了记录
   - `normal_user_profiles` 表是否创建了档案
   - 是否正确重定向到 `/user/home`

## 🔧 下一步行动

### 立即可做：

1. **创建缺失的 API 端点**
   ```bash
   # 在 auth/routes.py 中添加上述 API 代码
   ```

2. **添加前端拦截器**
   ```bash
   # 修改 user-registration-form.html，添加表单提交脚本
   ```

3. **测试注册流程**
   ```bash
   # 启动服务器
   python admin_dashboard/app.py
   
   # 访问注册页面
   http://localhost:5000/uxbot/user-registration-form.html
   ```

### 需要决定：

1. **Google OAuth 集成**
   - 是否使用真实的 Google OAuth？
   - 还是使用模拟的 Google Drive 绑定？

2. **密码管理**
   - 如果用户通过 Google 注册，如何生成密码？
   - 是否需要邮箱验证？

3. **数据验证**
   - 前端验证 vs 后端验证
   - 假名唯一性检查

## 📚 相关文件

- **后端路由**: `admin_dashboard/auth/routes.py`
- **用户模型**: `admin_dashboard/models/user.py`
- **数据库表**: `supabase_tables_schema.sql`
- **UXBot前端**: `static/templates/uxbot/user-registration-form.html`
- **注册选择页**: `static/templates/uxbot/registration-type-selection.html`

## 🎯 成功标准

集成完成后，应该能够：

1. ✅ 用户在 UXBot 前端填写注册表单
2. ✅ 数据提交到 Flask API
3. ✅ 在 Supabase 创建 `users` 记录
4. ✅ 在 Supabase 创建 `normal_user_profiles` 记录
5. ✅ 用户自动登录
6. ✅ 重定向到 `/user/home` 页面
7. ✅ Google Drive 绑定（可选）

---

**准备好开始集成了吗？** 我可以帮你：
1. 创建缺失的 API 端点代码
2. 添加前端提交脚本
3. 测试完整的注册流程
