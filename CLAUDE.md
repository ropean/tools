# tools-v1 — Claude 协作规范

## 项目概述

静态工具站点，每个工具是一个独立的 HTML 文件，部署到 Cloudflare Pages。
构建系统自动扫描 `public/` 目录，生成首页工具列表。

## 目录结构

```
public/              # 所有工具 HTML 文件（每个工具一个文件）
src/
  _layouts/base.njk  # 首页模板
  tools-meta.json    # 工具元数据：发布日期、精选标记
build.js             # 生产构建脚本
dev.js               # 开发模式（含 chokidar 热重载）
_site/               # 构建输出目录（不提交）
```

## 常用命令

```bash
pnpm dev       # 开发模式：监听文件变化 + vite 预览服务
pnpm build     # 生产构建，输出到 _site/
pnpm preview   # 构建后用 vite 静态预览（无热重载）
pnpm ship      # 构建 + 部署到 Cloudflare Pages (main)
pnpm ship:ci   # 构建 + 部署到 Cloudflare Pages (ci)
```

## 新增工具

### 1. 创建 HTML 文件

在 `public/` 下新建一个自包含的 HTML 文件，命名规则：`kebab-case.html`。

**必须包含：**
```html
<title>工具名称</title>
<meta name="description" content="一句话描述这个工具的用途">
```

构建系统从这两个标签自动提取标题和描述，显示在首页卡片上。

**设计要求：**
- 完全自包含（CSS 和 JS 均内联，或通过 CDN 加载）
- 不依赖项目内其他文件
- 响应式设计，支持移动端

**配色规范（与首页保持一致）：**

工具页面的主色调必须与首页 (`src/_layouts/base.njk`) 的蓝色风格保持一致，禁止使用其他主色（如靛紫 `#6366f1`）：

| 用途 | 值 |
|------|----|
| 主强调色 | `#2563eb` |
| 强调色 hover | `#1d4ed8` |
| 强调色浅底 | `#eff6ff` |
| 按钮/图标渐变 | `linear-gradient(135deg, #3b82f6, #1d4ed8)` |
| 按钮 hover 渐变 | `linear-gradient(135deg, #2563eb, #1e3a8a)` |
| 阴影 alpha | `rgba(37, 99, 235, 0.3)` |

### 2. 注册到元数据清单

编辑 `src/tools-meta.json`，为新工具添加一行：

```json
{
  "new-tool.html": { "date": "2026-04-01" }
}
```

- `date`：工具发布日期，格式 `YYYY-MM-DD`，用于首页排序
- `featured`（可选）：设为 `true` 则标记为精选，优先级高于所有非精选工具

**不在清单里的工具**会自动 fallback 到文件 mtime，排在有明确日期的工具之后。

### 3. 验证

```bash
pnpm build
# 确认输出中包含新工具，且首页排序符合预期
```

## 首页排序规则

精选工具 > 非精选工具，同级别内按 `date` 降序（最新在前）。

排序逻辑在 `build.js` 和 `dev.js` 的 `collectTools()` 函数末尾，两个文件保持同步。

## 自动分类规则

分类由文件名关键词决定（`build.js` / `dev.js` 的 `collectTools`）：

| 关键词 | 分类 |
|--------|------|
| `color`, `schema` | 颜色工具 |
| `password`, `random`, `string` | 生成器 |
| `html`, `format` | 格式化工具 |
| `robots`, `htaccess` | Web工具 |
| `zip`, `command` | 命令行工具 |
| 其他 | 其他 |

如需自定义分类，在 `collectTools` 里增加判断条件。

## 导航栏注入

构建时 `copyPublicFiles()` 会自动在每个工具页面的 `<body>` 后注入顶部导航栏（返回首页链接 + 工具标题），无需在工具 HTML 里手动添加。

## 元数据清单维护

`src/tools-meta.json` 是唯一管理 `featured` 和 `date` 的地方，**不要**在 `build.js` 或 `dev.js` 里硬编码 featured 文件名列表。

当前精选工具：
- `openresty-cors-generator.html`
- `dns-checker.html`
- `Random-String-Generator.html`
