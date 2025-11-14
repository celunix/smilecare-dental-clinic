@echo off
echo Starting HTTP Server on http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8080
pause

