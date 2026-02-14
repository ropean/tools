// 获取查询参数
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search') || '';
const selectedCategory = urlParams.get('category') || '';
const selectedTag = urlParams.get('tag') || '';

// 过滤工具
let filteredTools = tools;

// 应用搜索
if (searchQuery) {
    filteredTools = filteredTools.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
}

// 应用分类筛选
if (selectedCategory && selectedCategory !== '全部') {
    filteredTools = filteredTools.filter(tool => tool.category === selectedCategory);
}

// 应用标签筛选
if (selectedTag && selectedTag !== '全部') {
    filteredTools = filteredTools.filter(tool => tool.tags.includes(selectedTag));
}

// 导出变量供模板使用
module.exports = {
    searchQuery,
    selectedCategory,
    selectedTag,
    filteredTools
};
