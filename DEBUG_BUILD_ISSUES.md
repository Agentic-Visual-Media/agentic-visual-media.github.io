# 如何查看详细的构建错误信息

## 1. 查看 GitHub Actions 日志（如果有）

如果你的仓库使用了 GitHub Actions：

1. 访问你的 GitHub 仓库
2. 点击顶部的 **"Actions"** 标签
3. 在左侧选择工作流（如果有）
4. 点击失败的运行（红色标记）
5. 展开每个步骤查看详细日志
6. 特别关注：
   - 错误消息（红色标记）
   - 警告消息（黄色标记）
   - 构建输出

## 2. 查看 GitHub Pages 部署日志

### 方法 A：通过仓库设置
1. 进入仓库的 **Settings**（设置）
2. 左侧菜单找到 **Pages**
3. 在 "Build and deployment" 部分查看部署状态
4. 点击部署历史记录中的失败项查看详情

### 方法 B：通过 Actions（如果启用了）
1. 进入 **Actions** 标签
2. 查找 "pages build and deployment" 工作流
3. 点击失败的运行查看详细日志

## 3. 本地验证 HTML 语法

在本地检查 HTML 文件是否有语法错误：

### 使用在线工具：
- [W3C HTML Validator](https://validator.w3.org/)
- 上传你的 `components/footer.html` 文件检查

### 使用命令行工具（如果安装了）：
```bash
# 使用 HTMLHint（需要先安装）
npm install -g htmlhint
htmlhint components/footer.html
```

## 4. 检查浏览器控制台

1. 在本地启动服务器（使用 `start-server.sh` 或 `python3 -m http.server 8000`）
2. 打开浏览器开发者工具（F12）
3. 查看 **Console** 标签页的错误
4. 查看 **Network** 标签页，检查是否有资源加载失败

## 5. 临时移除问题代码进行测试

如果怀疑是地图代码导致的问题，可以：

1. 临时注释掉地图代码
2. 提交并推送
3. 查看是否部署成功
4. 如果成功，说明确实是地图代码的问题

## 6. 检查 GitHub Pages 服务状态

访问 [GitHub Status](https://www.githubstatus.com/) 查看是否有服务中断

## 7. 查看详细的部署日志

在 GitHub 仓库页面：
1. 点击 **Settings** → **Pages**
2. 查看 "Recent deployments" 部分
3. 点击失败的部署查看详细错误信息

## 常见问题排查

### 如果看到 "Timeout" 错误：
- 可能是 GitHub Pages 服务繁忙
- 等待 10-15 分钟后重试
- 检查是否有大量文件需要处理

### 如果看到 "Build failed" 错误：
- 查看具体错误消息
- 检查 HTML 语法是否正确
- 检查是否有无效的外部链接

### 如果看到 "Deployment queued" 但一直不完成：
- 这通常是服务端问题，不是代码问题
- 等待一段时间后重试
- 或者取消并重新触发部署

## 建议的调试步骤

1. **首先**：在 GitHub 上查看 Actions 或 Pages 的详细日志
2. **其次**：在本地验证 HTML 语法
3. **然后**：临时移除地图代码测试
4. **最后**：如果确认是地图代码问题，考虑使用 JavaScript 动态加载

