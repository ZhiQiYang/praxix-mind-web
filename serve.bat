@echo off
echo 正在啟動本地服務器...
echo 請在瀏覽器中訪問: http://localhost:8000

REM 複製preview.html到build目錄
echo 正在將預覽文件複製到build目錄...
if not exist build mkdir build
copy preview.html build\index.html /Y

REM 嘗試使用Python 3啟動服務器
python -m http.server 8000 --directory build
if %ERRORLEVEL% NEQ 0 (
  REM 如果Python 3不可用，嘗試Python 2
  python -m SimpleHTTPServer 8000
)

echo 服務器已關閉
pause 