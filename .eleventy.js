const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // 复制 public 目录到输出
  eleventyConfig.addPassthroughCopy("public");
  
  // 添加数据收集函数
  eleventyConfig.addGlobalData("tools", function() {
    const toolsDir = path.join(__dirname, 'public');
    const tools = [];
    
    // 读取 public 目录下的所有 HTML 文件
    const files = fs.readdirSync(toolsDir).filter(file => file.endsWith('.html'));
    
    files.forEach(file => {
      const filePath = path.join(toolsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取标题
      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : file;
      
      // 提取描述（如果有 meta description）
      const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i);
      const description = descMatch ? descMatch[1] : '';
      
      // 获取文件信息
      const stats = fs.statSync(filePath);
      
      // 根据文件名或内容推断分类
      let category = '其他';
      const fileName = file.toLowerCase();
      
      if (fileName.includes('color') || fileName.includes('schema')) {
        category = '颜色工具';
      } else if (fileName.includes('password') || fileName.includes('random') || fileName.includes('string')) {
        category = '生成器';
      } else if (fileName.includes('html') || fileName.includes('format')) {
        category = '格式化工具';
      } else if (fileName.includes('robots') || fileName.includes('htaccess')) {
        category = 'Web工具';
      } else if (fileName.includes('zip') || fileName.includes('command')) {
        category = '命令行工具';
      }
      
      // 提取标签（基于文件名关键词）
      const tags = [];
      if (fileName.includes('generator')) tags.push('生成器');
      if (fileName.includes('format')) tags.push('格式化');
      if (fileName.includes('cn') || fileName.includes('chinese')) tags.push('中文');
      if (fileName.includes('random')) tags.push('随机');
      if (fileName.includes('password')) tags.push('密码');
      if (fileName.includes('color')) tags.push('颜色');
      if (fileName.includes('web')) tags.push('Web');
      
      tools.push({
        title: title,
        description: description,
        url: '/' + file,
        fileName: file,
        category: category,
        tags: tags,
        size: stats.size,
        modified: stats.mtime,
        featured: ['index.html', 'password-generator.html', 'color.html'].includes(file)
      });
    });
    
    // 按修改时间排序
    return tools.sort((a, b) => new Date(b.modified) - new Date(a.modified));
  });
  
  // 添加分类过滤器
  eleventyConfig.addFilter("getCategories", function(tools) {
    const categories = [...new Set(tools.map(tool => tool.category))];
    return categories.sort();
  });
  
  // 添加标签过滤器
  eleventyConfig.addFilter("getAllTags", function(tools) {
    const allTags = tools.flatMap(tool => tool.tags);
    return [...new Set(allTags)].sort();
  });
  
  // 添加搜索过滤器
  eleventyConfig.addFilter("search", function(tools, query) {
    if (!query) return tools;
    
    const searchTerm = query.toLowerCase();
    return tools.filter(tool => 
      tool.title.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.category.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
  
  // 添加按分类筛选过滤器
  eleventyConfig.addFilter("filterByCategory", function(tools, category) {
    if (!category || category === '全部') return tools;
    return tools.filter(tool => tool.category === category);
  });
  
  // 添加按标签筛选过滤器
  eleventyConfig.addFilter("filterByTag", function(tools, tag) {
    if (!tag || tag === '全部') return tools;
    return tools.filter(tool => tool.tags.includes(tag));
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
