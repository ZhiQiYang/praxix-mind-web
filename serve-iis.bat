@echo off
echo 正在啟動IIS Express服務器...
echo 請在瀏覽器中訪問: http://localhost:8000

REM 複製preview.html到build目錄
echo 正在將預覽文件複製到build目錄...
if not exist build mkdir build
copy preview.html build\index.html /Y

REM 檢查IIS Express是否可用
where /q iisexpress
if %ERRORLEVEL% NEQ 0 (
  echo IIS Express未安裝或不在PATH中
  echo 請嘗試其他方法
  pause
  exit /b
)

REM 使用IIS Express啟動服務器
iisexpress /path:%CD%\build /port:8000

echo 服務器已關閉
pause 