# 国籍/地区功能集成指南 (Nationality Integration Guide)

## 概述 (Overview)
本指南说明如何将新的"国籍/地区"功能集成到 Guru 注册和 Profile 卡片显示中。

---

## 1. 数据库更新 (Database Changes)

### SQL 迁移脚本
**文件:** `database/migration_add_nationality.sql`

**步骤:**
1. 打开 Supabase 仪表板
2. 转到 SQL Editor 标签
3. 创建新查询 (New Query)
4. 复制并粘贴 `migration_add_nationality.sql` 中的内容
5. 点击 "Run" 执行迁移

**执行的操作:**
- 向 `guru_accounts` 表添加 `country` 列（存储国家代码：CN、MY、SG 等）
- 向 `guru_accounts` 表添加 `phone_prefix` 列（存储电话前缀：+86、+60 等）
- 创建索引以加快查询

```sql
ALTER TABLE guru_accounts 
ADD COLUMN country VARCHAR(10) DEFAULT NULL;

ALTER TABLE guru_accounts 
ADD COLUMN phone_prefix VARCHAR(10) DEFAULT NULL;
```

---

## 2. 前端更新 (Frontend Changes)

### 注册表单 (Registration Form)
**文件:** `static/templates/uxbot/registra-guru.html`

**已实现的功能:**
- ✅ 新增"国籍"下拉框（18个国家选项）
- ✅ 电话号码字段改为两部分：国家号 + 电话号码
- ✅ 国家选择后自动填充电话前缀
- ✅ 表单提交时自动组合完整电话号码

**支持的国家:**
| 国家 | 代码 | 电话前缀 |
|------|------|--------|
| 🇨🇳 中国 | CN | +86 |
| 🇲🇾 马来西亚 | MY | +60 |
| 🇸🇬 新加坡 | SG | +65 |
| 🇹🇭 泰国 | TH | +66 |
| 🇻🇳 越南 | VN | +84 |
| 🇮🇩 印度尼西亚 | ID | +62 |
| 🇵🇭 菲律宾 | PH | +63 |
| 🇺🇸 美国 | US | +1 |
| 🇨🇦 加拿大 | CA | +1 |
| 🇬🇧 英国 | GB | +44 |
| 🇦🇺 澳大利亚 | AU | +61 |
| 🇯🇵 日本 | JP | +81 |
| 🇰🇷 韩国 | KR | +82 |
| 🇭🇰 香港 | HK | +852 |
| 🇹🇼 台湾 | TW | +886 |
| 🇲🇴 澳门 | MO | +853 |
| 🇮🇳 印度 | IN | +91 |
| 🇳🇿 新西兰 | NZ | +64 |

**注意:** 如需添加更多国家，编辑 HTML 中的 `<select id="country">` 元素并更新 JavaScript 中的 `countryMapping` 对象。

---

## 3. 后端更新 (Backend Changes)

### guru_routes.py 更新

**步骤 1:** 修改 `/api/guru/register` 端点（接收国籍和电话前缀）

```python
# 在表单数据提取部分添加：
country = request.json.get('country')
phone_prefix = request.json.get('phone_prefix')
phone = request.json.get('phone')

# 插入数据库时包括这些字段：
account_data = {
    "display_name": display_name,
    "email": email,
    "phone": phone,
    "expertise": expertise,
    "country": country,  # 新增
    "phone_prefix": phone_prefix,  # 新增
    # ... 其他字段
}
```

**步骤 2:** 修改 `/api/guru/profile/<guru_id>` 端点（返回国籍信息）

```python
# 在构建响应时添加：
profile = {
    # ... 现有字段
    "country": account.get('country'),
    "phone_prefix": account.get('phone_prefix'),
    "display_country": countryMapping.get(account.get('country'), {}).get('name', ''),
    "country_flag": countryMapping.get(account.get('country'), {}).get('flag', '')
}
```

**参考代码 (Reference Code):**
```python
# 国家数据映射
countryMapping = {
    'CN': {'name': '中国', 'flag': '🇨🇳'},
    'MY': {'name': '马来西亚', 'flag': '🇲🇾'},
    'SG': {'name': '新加坡', 'flag': '🇸🇬'},
    # ... 更多国家
}
```

---

## 4. Profile 卡片更新 (Profile Card Display)

### guru-dashboard-main.html 更新

**在 Profile Card 中添加国籍显示:**

```javascript
// 在现有的 profile sync 脚本中添加：
const countryData = profile.country_flag + ' ' + profile.display_country;
document.getElementById('guru-country-display').textContent = countryData;

// 或直接使用：
// const countryText = response.data.country_flag + ' ' + response.data.display_country;
```

**HTML 结构示例:**
```html
<!-- 在 Profile Card 中添加 -->
<div class="guru-info">
    <p><strong>名字:</strong> <span id="guru-name-display">加载中...</span></p>
    <p><strong>国籍:</strong> <span id="guru-country-display">加载中...</span></p>
    <p><strong>电话:</strong> <span id="guru-phone-display">加载中...</span></p>
</div>
```

---

## 5. 集成检查清单 (Integration Checklist)

### 数据库 ✓
- [x] 运行 SQL 迁移脚本
- [x] 验证新列已添加到 guru_accounts 表

### 前端 ✓
- [x] registra-guru.html 已更新（国籍下拉框 + 电话字段改版）
- [ ] guru-dashboard-main.html 已更新（显示国籍在 Profile Card）

### 后端 ⏳
- [ ] 更新 `/api/guru/register` 端点保存 country 和 phone_prefix
- [ ] 更新 `/api/guru/profile/<guru_id>` 端点返回国籍信息
- [ ] 测试 API 响应格式

### 测试 ⏳
- [ ] 在 registra-guru.html 表单中选择国家并提交
- [ ] 验证数据已保存到 Supabase
- [ ] 在 Dashboard 上验证国籍是否正确显示
- [ ] 测试不同国家的电话前缀功能

---

## 6. 示例：完整的数据流

### 用户注册流程
```
1. 用户在 registra-guru.html 表单中：
   - 输入真实姓名：张九
   - 输入身份证号：330xxx
   - 选择国籍：🇨🇳 中国 (CN)
   - 输入手机号码：13800138000 （不含国家号）

2. 前端处理：
   - 国家代码提取：CN
   - 电话前缀提取：+86
   - 完整电话号码组合：+8613800138000

3. 数据发送到后端：
   {
     "realName": "张九",
     "idNumber": "330xxx",
     "country": "CN",
     "phone_prefix": "+86",
     "phone": "+8613800138000",
     "email": "....",
     "categories": ["八字命理"],
     "introduction": "..."
   }

4. 后端保存到 Supabase：
   INSERT INTO guru_accounts (
     display_name, phone, country, phone_prefix, expertise, ...
   ) VALUES (
     '张九', '+8613800138000', 'CN', '+86', '["八字命理"]', ...
   )

5. Dashboard 显示：
   用户打开 guru-dashboard-main.html
   - 名字：张九
   - 国籍：🇨🇳 中国
   - 电话：+8613800138000
```

---

## 7. 故障排查 (Troubleshooting)

### 问题 1: 国籍字段不保存
**解决方案:**
- 检查 backend `/api/guru/register` 端点是否接收并保存 `country` 和 `phone_prefix` 字段
- 验证 SQL 迁移已成功执行

### 问题 2: Profile Card 不显示国籍
**解决方案:**
- 检查 `/api/guru/profile/<guru_id>` 端点是否返回 `country_flag` 和 `display_country`
- 验证 guru-dashboard-main.html 中的 sync 脚本是否正确更新了 DOM

### 问题 3: 电话前缀没有自动填充
**解决方案:**
- 检查 registra-guru.html 中的 `updatePhonePrefix()` 函数是否正确
- 验证国家下拉框的 `onchange` 事件是否正确绑定

---

## 8. 可选增强 (Optional Enhancements)

### 增强 1: 创建国家数据表
```sql
CREATE TABLE countries (
    code VARCHAR(2) PRIMARY KEY,
    name_cn VARCHAR(100),
    name_en VARCHAR(100),
    phone_prefix VARCHAR(5),
    flag_emoji VARCHAR(10)
);
```

### 增强 2: 添加更多国家
编辑 registra-guru.html 中的 `<select>` 和 JavaScript 中的 `countryMapping` 对象

### 增强 3: 自动验证电话号码
```javascript
// 基于国家代码验证电话号码格式
function validatePhoneNumber(phone, countryCode) {
    // 中国: 11位数字
    // 马来西亚: 9-10位数字
    // ... 等等
}
```

---

## 9. 总结 (Summary)

已实现的功能：
- ✅ 注册表单添加国籍选择（18个国家）
- ✅ 国家选择后自动填充电话前缀
- ✅ 生成 SQL 迁移脚本

待实现的功能：
- ⏳ 后端 API 更新（接收并保存国籍数据）
- ⏳ Profile Card 显示国籍信息
- ⏳ 完整集成测试

**下一步:**
1. 在 Supabase 中运行 SQL 迁移脚本
2. 更新 guru_routes.py 后端逻辑
3. 更新 guru-dashboard-main.html Profile Card 显示
4. 进行端到端测试
