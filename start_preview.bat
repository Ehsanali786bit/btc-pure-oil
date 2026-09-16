@echo off
title BTC Oils - Mobile & Desktop Preview Server
color 0A
echo ================================================================
echo           BTC OILS - MOBILE & DESKTOP PREVIEW SERVER
echo ================================================================
echo.
echo   1. On this Computer (PC):
echo      http://localhost:3000
echo.
echo   2. On your Mobile Phone (connected to the same Wi-Fi):
echo      http://192.168.0.30:3000
echo.
echo ================================================================
echo   Press Ctrl + C in this window to stop the preview server.
echo ================================================================
echo.
node serve.js
pause
