# 🚀 国籍功能 - 快速开始（5分钟）

## 已完成的工作 ✅

你的注册表单 `registra-guru.html` 已完全更新：
- ✅ 添加了国籍下拉框（18个国家）
- ✅ 电话号码字段改为两部分（国家号 + 号码）
- ✅ 国家选择后自动填充电话前缀
- ✅ 表单提交时自动组合完整号码

---

## 需要你做的工作 ⏳

### 第1步：数据库迁移 (2分钟)
```
1. 打开 Supabase 仪表板
2. 左侧菜单 → SQL Editor
3. 新建查询，复制这些 SQL：

ALTER TABLE guru_accounts 
ADD COLUMN country VARCHAR(10) DEFAULT NULL;

ALTER TABLE guru_accounts 
ADD COLUMN phone_prefix VARCHAR(10) DEFAULT NULL;

4. 点击 Run 执行
```

### 第2步：更新后端 API (3分钟)
```
编辑文件: uxbot_frontend/guru_routes.py

1. 在文件开头添加国家映射字典：
   (参考 docs/GURU_ROUTES_UPDATES.py)

2. 修改 /api/otp/verify 端点：
   - 接收 country 和 phone_prefix
   - 保存到数据库

3. 修改 /api/guru/profile/<guru_id> 端点：
   - 返回 country_flag 和 display_country
```

### 第3步：更新 Profile 卡片 (1分钟)
```
编辑文件: static/templates/uxbot/guru-dashboard-main.html

在现有的 profile sync 脚本中添加：
const countryDisplay = profile.country_flag + ' ' + profile.display_country;
document.getElementById('guru-country-display').textContent = countryDisplay;
```

---

## 完整的国家列表

```
🇨🇳 中国 (CN) +86
🇲🇾 马来西亚 (MY) +60
🇸🇬 新加坡 (SG) +65
🇹🇭 泰国 (TH) +66
🇻🇳 越南 (VN) +84
🇮🇩 印度尼西亚 (ID) +62
🇵🇭 菲律宾 (PH) +63
🇺🇸 美国 (US) +1
🇨🇦 加拿大 (CA) +1
🇬🇧 英国 (GB) +44
🇦🇺 澳大利亚 (AU) +61
🇯🇵 日本 (JP) +81
🇰🇷 韩国 (KR) +82
🇭🇰 香港 (HK) +852
🇹🇼 台湾 (TW) +886
🇲🇴 澳门 (MO) +853
🇮🇳 印度 (IN) +91
🇳🇿 新西兰 (NZ) +64
```

---

## 测试步骤

1. 打开注册表单：`/uxbot/registra-guru.html`
2. 选择国家 → 检查电话前缀自动填充 ✓
3. 输入号码 → 提交表单
4. 检查 Supabase 是否保存了 country 和 phone_prefix ✓
5. 打开 Dashboard → 检查是否显示国籍 ✓

---

## 文件清单

📂 **已创建的文件：**
- `database/migration_add_nationality.sql` - SQL 脚本
- `docs/NATIONALITY_INTEGRATION_GUIDE.md` - 详细指南
- `docs/GURU_ROUTES_UPDATES.py` - 后端示例代码
- `docs/NATIONALITY_IMPLEMENTATION_SUMMARY.md` - 项目总结
- `docs/COMPLETION_CHECKLIST.md` - 完成检查表
- `docs/QUICK_START.md` - 本文件

📝 **已修改的文件：**
- `static/templates/uxbot/registra-guru.html` - 注册表单

---

## 关键代码

### 表单提交时的数据
```javascript
{
  "country": "CN",           // 国家代码
  "phone_prefix": "+86",     // 电话前缀
  "phone": "+8613800138000"  // 完整号码
}
```

### API 返回数据
```javascript
{
  "country": "CN",
  "country_flag": "🇨🇳",
  "display_country": "中国"
}
```

---

## 常见问题

**Q: 我需要添加更多国家吗？**
A: 不需要，已经支持 18 个常见国家。如果需要，编辑 `registra-guru.html` 的 `<select>` 和对应的 JavaScript 映射即可。

**Q: 现有用户的国籍字段会是什么？**
A: NULL（空）。新用户必须选择国家。

**Q: 电话号码格式有验证吗？**
A: 目前没有。可以在后端根据国家代码添加格式验证。

---

## 下一步

1. ✅ 看懂现有的修改
2. ⏳ 执行 SQL 迁移
3. ⏳ 更新后端 API
4. ⏳ 更新 Profile 显示
5. ⏳ 测试验证
6. 🚀 上线

---

**准备好了吗？开始第1步吧！** 🎯
