#!/bin/bash

# 启动本地HTTP服务器
echo "正在启动本地服务器..."
echo "服务器地址: http://localhost:8000"
echo "按 Ctrl+C 停止服务器"
echo ""

# 检查Python版本并使用合适的命令
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "错误: 未找到Python，请安装Python后重试"
    exit 1
fi