# AceApp 工具合集

基于 Eleventy 的静态站点生成器，用于自动收集和展示 HTML 工具文件。

## 功能特性

- 🔍 **智能搜索** - 支持标题、描述、标签搜索
- 📁 **自动分类** - 根据文件名自动分类工具
- 🏷️ **标签系统** - 灵活的标签管理
- 📱 **响应式设计** - 完美适配移动端
- ⚡ **快速构建** - 基于 Node.js 的高效构建

## 开发环境

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```
这个命令会：
1. 自动构建站点
2. 启动 Vite 预览服务器
3. 在浏览器中打开页面

### 手动构建
```bash
pnpm build
```

### 预览已构建的站点
```bash
pnpm preview
```

### 构建并预览
```bash
pnpm build:serve
```

## 项目结构

```
├── build.js                 # 自定义构建脚本
├── vite.config.js           # Vite 配置
├── .eleventy.js            # Eleventy 配置
├── src/
│   ├── _layouts/
│   │   └── base.njk        # 基础模板
│   └── index.njk           # 主页模板
├── public/                 # 原始 HTML 工具文件
└── _site/                  # 生成的静态站点
```

## 部署

### Cloudflare Pages
```bash
pnpm deploy
```

### 其他静态托管
将 `_site` 目录内容部署到任何静态托管服务即可。

## 添加新工具

1. 将 HTML 文件放入 `public` 目录
2. 运行 `pnpm build` 重新生成站点
3. 系统会自动识别并分类新工具

## 技术栈

- **构建工具**: Node.js + 自定义脚本
- **模板引擎**: Nunjucks
- **预览服务器**: Vite
- **包管理**: pnpm
- **样式**: 原生 CSS + 现代设计
