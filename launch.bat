@echo off
echo Praxis Mind 本地開發環境啟動工具
echo =====================================
echo.

REM 檢查 Python 是否可用
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Python 未安裝或不在PATH中，將嘗試其他方法...
  goto :try_iis
)

echo 選擇啟動模式:
echo 1. 使用 Python 啟動服務器 (推薦)
echo 2. 使用 IIS Express 啟動服務器
echo 3. 只瀏覽靜態預覽頁面
echo.

set /p choice=請輸入選項 (1-3): 

if "%choice%"=="1" goto :start_python
if "%choice%"=="2" goto :try_iis
if "%choice%"=="3" goto :open_preview

echo 無效選項，將使用默認選項 (Python)...
goto :start_python

:start_python
echo.
echo 正在使用 Python 啟動本地服務器...
start "" http://localhost:8000
call serve.bat
goto :eof

:try_iis
echo.
where /q iisexpress
if %ERRORLEVEL% NEQ 0 (
  echo IIS Express 未安裝或不在PATH中。
  echo 將打開靜態預覽頁面...
  goto :open_preview
)

echo 正在使用 IIS Express 啟動本地服務器...
start "" http://localhost:8000
call serve-iis.bat
goto :eof

:open_preview
echo.
echo 打開靜態預覽頁面...
start "" preview.html
goto :eof 