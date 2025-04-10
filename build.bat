@echo off
rem 删除 docs 目录下的所有内容
if exist docs\ (
    rd /s /q docs
    md docs
)

rem 执行 npm build 命令
call npm run build

rem 复制 .vitepress/dist/ 目录到 docs 目录
xcopy /e /i /y .vitepress\dist docs
xcopy /i CNAME docs