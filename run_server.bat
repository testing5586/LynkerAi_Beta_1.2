@echo off
echo ============================================================
echo Starting LynkerAI Server
echo ============================================================
echo.
cd /d "%~dp0"
python -u start_server.py
echo.
echo Server stopped. Press any key to exit...
pause >nul
