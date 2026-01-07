@echo off
echo 启动UXBot前端服务器...
echo.
cd /d "%~dp0"
python uxbot_frontend\run_server.py
pause
