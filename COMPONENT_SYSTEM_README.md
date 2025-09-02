# 共享组件系统使用说明

## 概述

这个系统允许您在多个HTML页面之间共享header和footer组件，避免重复代码。当您需要修改header或footer时，只需要修改一个文件，所有页面都会自动更新。

## 文件结构

```
├── components/
│   ├── header.html          # 共享的header组件
│   └── footer.html          # 共享的footer组件
├── assets/js/
│   └── load-components.js   # 组件加载脚本
└── [各个页面文件]
    ├── index.html
    ├── call-for-paper.html
    ├── accepted-papers.html
    ├── challenge.html
    └── workshop-mid2025.html
```

## 工作原理

1. **组件文件**: `components/header.html` 和 `components/footer.html` 包含共享的HTML代码
2. **加载脚本**: `assets/js/load-components.js` 负责动态加载这些组件
3. **页面集成**: 每个页面包含占位符 `<div id="shared-header"></div>` 和 `<div id="shared-footer"></div>`
4. **自动加载**: 页面加载时，JavaScript会自动将组件内容插入到占位符中

## 如何使用

### 修改Header或Footer

1. 打开 `components/header.html` 或 `components/footer.html`
2. 进行您需要的修改
3. 保存文件
4. 所有使用该组件的页面都会自动更新

### 添加新页面

1. 在页面中添加占位符：
   ```html
   <!-- Shared Header Component -->
   <div id="shared-header"></div>
   
   <!-- 页面内容 -->
   
   <!-- Shared Footer Component -->
   <div id="shared-footer"></div>
   ```

2. 在页面底部添加组件加载脚本：
   ```html
   <!-- Component Loader Script -->
   <script src="./assets/js/load-components.js"></script>
   ```

### 导航高亮

系统会自动根据当前页面URL设置导航菜单的active状态。例如：
- 在 `index.html` 页面，Home链接会显示为active
- 在 `call-for-paper.html` 页面，Call for Paper链接会显示为active

## 技术细节

### 组件加载脚本功能

- **异步加载**: 使用fetch API异步加载组件文件
- **错误处理**: 如果组件文件加载失败，会在控制台显示错误信息
- **导航高亮**: 自动设置当前页面对应的导航链接为active状态
- **兼容性**: 支持现代浏览器，使用ES6+语法

### 文件路径

- 组件文件路径相对于页面文件位置
- 脚本会自动处理相对路径问题
- 支持本地文件系统和HTTP服务器

## 注意事项

1. **服务器要求**: 由于使用fetch API，需要通过HTTP服务器访问页面，不能直接打开HTML文件
2. **路径一致性**: 确保所有页面的组件文件路径正确
3. **浏览器兼容性**: 需要支持ES6+的现代浏览器
4. **缓存**: 浏览器可能会缓存组件文件，修改后可能需要强制刷新

## 快速启动

### 方法1: 使用启动脚本
```bash
./start-server.sh
```

### 方法2: 手动启动服务器
```bash
python3 -m http.server 8000
```

然后访问: http://localhost:8000

## 故障排除

### 组件没有加载

1. **最常见原因**: 直接打开了HTML文件而不是通过HTTP服务器访问
   - 解决方案: 使用 `./start-server.sh` 或 `python3 -m http.server 8000` 启动服务器
   - 然后访问 http://localhost:8000

2. 检查浏览器控制台是否有错误信息
3. 确认组件文件路径正确
4. 确认通过HTTP服务器访问页面
5. 检查组件文件是否存在且可访问

### 看到"组件加载失败"错误信息

这表示您直接打开了HTML文件。请：
1. 停止直接打开HTML文件
2. 运行 `./start-server.sh` 启动服务器
3. 在浏览器中访问 http://localhost:8000

### 导航高亮不正确

1. 检查页面文件名是否与导航链接匹配
2. 确认JavaScript正确加载
3. 检查控制台是否有JavaScript错误

## 扩展功能

### 添加更多共享组件

1. 在 `components/` 目录下创建新的HTML文件
2. 在 `load-components.js` 中添加加载逻辑
3. 在页面中添加对应的占位符

### 自定义组件

您可以根据需要创建其他共享组件，如：
- 侧边栏组件
- 模态框组件
- 表单组件

只需要按照相同的模式创建组件文件和加载逻辑即可。