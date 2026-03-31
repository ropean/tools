#!/usr/bin/env node

try {
  const fs = require('fs');
  const path = require('path');

  console.log('Starting site generation...');

  // 简单的静态站点生成器
  function generateSite() {
    const srcDir = path.join(__dirname, 'src');
    const publicDir = path.join(__dirname, 'public');
    const outputDir = path.join(__dirname, '_site');

    console.log('Source directory:', srcDir);
    console.log('Public directory:', publicDir);
    console.log('Output directory:', outputDir);

    // 创建输出目录
    if (!fs.existsSync(outputDir)) {
      console.log('Creating output directory...');
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 收集工具数据
    console.log('Collecting tools...');
    const tools = collectTools(publicDir);
    console.log(`Found ${tools.length} tools`);

    // 生成主页面
    console.log('Generating index page...');
    generateIndexPage(tools, outputDir);

    // 复制 public 目录内容（除了 index.html）
    console.log('Copying public files...');
    copyPublicFiles(publicDir, outputDir, ['index.html']);

    console.log('Site generated successfully!');
    console.log(`Tools found: ${tools.length}`);
    console.log(
      `Categories: ${[...new Set(tools.map((t) => t.category))].join(', ')}`,
    );
  }

  function collectTools(publicDir) {
    // 读取元数据清单（date、featured 等）
    const metaPath = path.join(__dirname, 'src', 'tools-meta.json');
    const meta = fs.existsSync(metaPath)
      ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
      : {};

    const tools = [];
    const files = fs
      .readdirSync(publicDir)
      .filter((file) => file.endsWith('.html'));

    files.forEach((file) => {
      const filePath = path.join(publicDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // 提取标题
      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch
        ? titleMatch[1].replace(/\s+/g, ' ').trim()
        : file;

      // 提取描述
      const descMatch = content.match(
        /<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i,
      );
      const description = descMatch ? descMatch[1] : '';

      // 获取文件信息
      const stats = fs.statSync(filePath);

      // 日期：优先用清单中的 date，否则 fallback 到 mtime
      const fileMeta = meta[file] || {};
      const date = fileMeta.date
        ? new Date(fileMeta.date)
        : stats.mtime;

      // featured：从清单读取
      const featured = fileMeta.featured === true;

      // 分类逻辑
      let category = '其他';
      const fileName = file.toLowerCase();

      if (fileName.includes('color') || fileName.includes('schema')) {
        category = '颜色工具';
      } else if (
        fileName.includes('password') ||
        fileName.includes('random') ||
        fileName.includes('string')
      ) {
        category = '生成器';
      } else if (fileName.includes('html') || fileName.includes('format')) {
        category = '格式化工具';
      } else if (fileName.includes('robots') || fileName.includes('htaccess')) {
        category = 'Web工具';
      } else if (fileName.includes('zip') || fileName.includes('command')) {
        category = '命令行工具';
      }

      // 标签逻辑
      const tags = [];
      if (fileName.includes('generator')) tags.push('生成器');
      if (fileName.includes('format')) tags.push('格式化');
      if (fileName.includes('cn') || fileName.includes('chinese'))
        tags.push('中文');
      if (fileName.includes('random')) tags.push('随机');
      if (fileName.includes('password')) tags.push('密码');
      if (fileName.includes('color')) tags.push('颜色');
      if (fileName.includes('web')) tags.push('Web');

      tools.push({
        title,
        description,
        url: '/' + file,
        fileName: file,
        category,
        tags,
        size: stats.size,
        date,
        featured,
      });
    });

    // 精选优先，同级别按日期降序
    return tools.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.date) - new Date(a.date);
    });
  }

  function generateIndexPage(tools, outputDir) {
    const templatePath = path.join(__dirname, 'src', '_layouts', 'base.njk');
    console.log('Reading template from:', templatePath);

    if (!fs.existsSync(templatePath)) {
      console.error('Template file not found:', templatePath);
      throw new Error('Template file not found');
    }

    const template = fs.readFileSync(templatePath, 'utf8');
    console.log('Template loaded, length:', template.length);

    // 生成工具卡片 HTML
    const toolsCards = tools
      .map(
        (tool) => `
    <div class="tool-card ${tool.featured ? 'featured' : ''}">
      ${tool.featured ? '<span class="featured-badge">精选</span>' : ''}
      <div class="tool-content">
        <h3 class="tool-title">${tool.title}</h3>
        ${tool.description ? `<p class="tool-description">${tool.description}</p>` : ''}
        <div class="tool-meta">
          <span class="tool-category">${tool.category}</span>
          <span>${(tool.size / 1024).toFixed(1)} KB</span>
        </div>
        ${
          tool.tags.length > 0
            ? `
          <div class="tool-tags">
            ${tool.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
        `
            : ''
        }
      </div>
      <a href="${tool.url}" class="tool-link">使用工具</a>
    </div>
  `,
      )
      .join('');

    // 生成分类选项
    const categories = [...new Set(tools.map((t) => t.category))].sort();
    const categoryOptions = ['<option value="全部">全部</option>'];
    categories.forEach((cat) => {
      categoryOptions.push(`<option value="${cat}">${cat}</option>`);
    });

    // 生成标签选项
    const allTags = [...new Set(tools.flatMap((t) => t.tags))].sort();
    const tagOptions = ['<option value="全部">全部</option>'];
    allTags.forEach((tag) => {
      tagOptions.push(`<option value="${tag}">${tag}</option>`);
    });

    // 替换模板中的占位符
    let html = template
      .replace(
        '{% block content %}{% endblock %}',
        `
    <div class="search-section">
      <div class="search-box">
        <input type="text" id="search" class="search-input" placeholder="搜索工具名称、描述或标签...">
        <span class="search-icon">🔍</span>
      </div>
      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">分类:</label>
          <select id="category" class="filter-select">
            ${categoryOptions.join('')}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">标签:</label>
          <select id="tag" class="filter-select">
            ${tagOptions.join('')}
          </select>
        </div>
      </div>
    </div>
    
    <div class="stats">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">${tools.length}</div>
          <div class="stat-label">工具总数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${categories.length}</div>
          <div class="stat-label">分类数量</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${allTags.length}</div>
          <div class="stat-label">标签数量</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${tools.filter((t) => t.featured).length}</div>
          <div class="stat-label">精选工具</div>
        </div>
      </div>
    </div>
    
    <div class="tools-grid" id="tools-grid">
      ${toolsCards}
    </div>
  `,
      )
      .replace(
        '{% if title %}{{ title }} - {% endif %}AceApp 工具合集',
        'AceApp 工具合集',
      )
      .replace(
        '{{ "now" | date("YYYY") }}',
        new Date().getFullYear().toString(),
      );

    // 写入文件
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  }

  function injectNavbar(html, title) {
    const navbar = `<style>
  .__tnav{position:fixed;top:0;left:0;right:0;height:48px;background:#fff;border-bottom:1px solid #ebebeb;display:flex;align-items:center;padding:0 24px;gap:0;z-index:9999;box-shadow:0 1px 4px rgba(0,0,0,.05);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
  .__tnav-home{display:inline-flex;align-items:center;gap:7px;color:#111;text-decoration:none;font-size:.9rem;font-weight:600;letter-spacing:-.01em;white-space:nowrap;transition:opacity .15s;}
  .__tnav-home:hover{opacity:.65;}
  .__tnav-home svg{color:#555;}
  .__tnav-title{margin-left:16px;padding-left:16px;border-left:1px solid #e5e5e5;font-size:.82rem;color:#bbb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400;}
  .__tnav-spacer{height:48px;}
</style>
<nav class="__tnav">
  <a href="/" class="__tnav-home">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    AceApp 工具合集
  </a>
  <span class="__tnav-title">${title}</span>
</nav>
<div class="__tnav-spacer"></div>`;

    // inject right after opening <body> tag
    return html.replace(/(<body[^>]*>)/i, `$1\n${navbar}`);
  }

  function copyPublicFiles(publicDir, outputDir, excludeFiles = []) {
    const copyDir = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const items = fs.readdirSync(src);
      items.forEach((item) => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (fs.statSync(srcPath).isDirectory()) {
          copyDir(srcPath, destPath);
        } else if (!excludeFiles.includes(item)) {
          if (item.endsWith('.html')) {
            let html = fs.readFileSync(srcPath, 'utf8');
            const titleMatch = html.match(/<title>(.*?)<\/title>/i);
            const title = titleMatch ? titleMatch[1].trim() : '';
            html = injectNavbar(html, title);
            fs.writeFileSync(destPath, html, 'utf8');
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      });
    };

    copyDir(publicDir, outputDir);
  }

  // 运行生成器
  generateSite();
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}
