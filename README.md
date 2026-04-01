# AceApp 工具合集

静态工具站点。每个工具是 `public/` 下一个独立的 HTML 文件，构建时自动扫描并生成首页索引，部署到 Cloudflare Pages。

## 快速开始

```bash
pnpm install
pnpm dev      # 开发模式：监听变化自动重建 + vite 本地预览  
pnpm preview  # 构建后用 vite 静态预览（无热重载）
pnpm build    # 生产构建，输出到 _site/
pnpm ship     # 构建 + 部署到 Cloudflare Pages (main)
```

## 项目结构

```
public/                  # 工具 HTML 文件（每个工具一个文件）
src/
  _layouts/base.njk      # 首页模板
  tools-meta.json        # 工具元数据：发布日期、精选标记
build.js                 # 生产构建
dev.js                   # 开发构建（含 chokidar 热重载）
_site/                   # 构建输出（不提交）
```

## 添加新工具

### 1. 创建 HTML 文件

在 `public/` 下新建自包含的 HTML 文件：

```html
<title>工具名称</title>
<meta name="description" content="一句话描述">
```

- 文件名用 `kebab-case.html`
- CSS / JS 全部内联或通过 CDN 加载，不依赖项目内其他文件
- 构建时会自动注入顶部导航栏（返回首页），无需手动添加

### 2. 注册到 `src/tools-meta.json`

```json
{
  "new-tool.html": { "date": "2026-04-01" }
}
```

| 字段 | 说明 |
|------|------|
| `date` | 发布日期 `YYYY-MM-DD`，决定首页排序位置 |
| `featured` | `true` 则标为精选，精选工具排在所有非精选之前 |

不在清单里的工具 fallback 到文件 mtime，排在已有工具之后。

### 3. 验证

```bash
pnpm build
```

## 首页排序规则

**精选 > 非精选**，同级别内按 `date` 降序（最新在前）。

## 自动分类规则

分类由文件名关键词自动判断：

| 文件名包含 | 分类 |
|-----------|------|
| `color`, `schema` | 颜色工具 |
| `password`, `random`, `string` | 生成器 |
| `html`, `format` | 格式化工具 |
| `robots`, `htaccess` | Web工具 |
| `zip`, `command` | 命令行工具 |
| 其他 | 其他 |

## 技术栈

- 构建：Node.js 自定义脚本
- 模板：Nunjucks
- 预览：Vite
- 包管理：pnpm
- 部署：Cloudflare Pages
