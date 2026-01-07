# 灵客AI / UXBot 前端开发小抄

> 本项目使用 Flask + UXBot 前端导出页面。
> 日常开发只看 **8080 端口**，并优先使用“开发模式（自动重载）”。

---

## 1. 启动开发模式（推荐）

前提：在项目根目录：

- 路径：`c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2`
- 已激活虚拟环境：`.venv`（PowerShell 中前面出现 `(.venv)`）

步骤：

1. 设置环境变量并启动服务器：
   - PowerShell：
     - `$env:UXBOT_DEBUG="1"`
     - `python "uxbot_frontend\run_server.py"`
2. 看到日志：`开发模式（自动重载开启）` 即表示成功。
3. 浏览器访问：`http://localhost:8080/uxbot/guru-register.html` 等页面。

效果：

- `UXBOT_DEBUG=1` 时：
  - Flask `debug=True`
  - `use_reloader=True`
  - 修改 `uxbot_frontend/*.py` 或 `static/templates/uxbot/*.html` 会自动重载 / 重启。
  - 只需要在浏览器按 `Ctrl + F5` 刷新即可看到最新效果。

---

## 2. 启动生产模式（无自动重载）

适用于需要稳定不自动重启的场景。

1. 确保没有 `UXBOT_DEBUG`：
   - PowerShell：`Remove-Item Env:UXBOT_DEBUG -ErrorAction SilentlyContinue`
2. 然后运行：
   - `python "uxbot_frontend\run_server.py"`
3. 日志会显示：`生产模式（无自动重载）`。

此时：

- 修改模板或代码 **不会** 自动重启，需要手动重新运行脚本。

---

## 3. 只用 8080，不再用 5500

- 不再使用 VS Code Live Server (`127.0.0.1:5500`) 来预览 UXBot 页面。
- 统一使用 Flask 路由下的地址，例如：
  - `http://localhost:8080/uxbot/index.html`
  - `http://localhost:8080/uxbot/guru-register.html`

这样可以保证：

- 浏览器看到的 HTML 就是 Flask 实际渲染的模板。
- 不会再出现 “文件改了但页面没变 / 两个端口内容不一致” 的情况。

---

## 4. 看不到更新时的排查顺序

1. **确认端口**：
   - 地址栏一定是 `http://localhost:8080/...`，不是 `127.0.0.1:5500`。
2. **硬刷新页面**：
   - `Ctrl + Shift + R` 或 `Ctrl + F5`。
3. **看服务器模式**：
   - 终端里是否有 `开发模式（自动重载开启）` 文案。
4. **看文件路径**：
   - 编辑的是 `static/templates/uxbot/xxx.html`。

按这四步基本可以秒级定位问题。

---

## 5. 常用开发页面

- 命理师入驻申请（原生 HTML）：
  - `http://localhost:8080/uxbot/guru-register.html`
- 其他 UXBot 导出页面：
  - 统一格式：`http://localhost:8080/uxbot/<page>.html`

如需新增页面：

1. 在 `static/templates/uxbot/` 下新建 `<page>.html`。
2. 在浏览器访问 `/uxbot/<page>.html` 即可（开发模式会自动重载）。
