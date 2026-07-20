// Tool catalog and categories.
// Each tool: { id, category, name, desc, ready, external? }
//  - ready:true          → has a native Astro page at src/pages/<id>.astro.
//  - ready:false         → shows a "Coming soon" badge; a placeholder page is
//                          generated at /<id>.html by src/pages/[id].astro.
//  - external:'https://…' → an off-site tool: links straight to that URL in a new
//                          tab, marked "External ↗"; no in-site page is generated.
// Non-external entries link to /<id>.html at the site root (see toolHref).

export const CATEGORIES = [
  { key: 'text', label: 'Text' },
  { key: 'media', label: 'Image & Media' },
  { key: 'calc', label: 'Convert & Calculate' },
  { key: 'dev', label: 'Developer' },
  { key: 'daily', label: 'Everyday' },
];

export const TOOLS = [
  // --- Live tools (native Astro pages under src/pages/) ---
  {
    id: 'dns-checker',
    category: 'dev',
    name: 'DNS Checker',
    desc: 'Query and inspect DNS records for any domain.',
    icon: 'globe',
    ready: true,
  },
  {
    id: 'nginx-config-formatter',
    category: 'dev',
    name: 'Nginx Config Formatter',
    desc: 'Format and beautify Nginx configuration files.',
    icon: 'server',
    ready: true,
  },
  {
    id: 'openresty-cors-generator',
    category: 'dev',
    name: 'OpenResty CORS Generator',
    desc: 'Generate CORS configuration snippets for OpenResty and Nginx.',
    icon: 'shield',
    ready: true,
  },
  {
    id: 'htaccess-rewrite',
    category: 'dev',
    name: '.htaccess Rewrite Rules',
    desc: 'Build Apache rewrite rules visually.',
    icon: 'file',
    ready: true,
  },
  {
    id: 'random-string-generator',
    category: 'daily',
    name: 'Random String Generator',
    desc: 'Generate random strings, tokens and passwords.',
    icon: 'shuffle',
    ready: true,
  },

  // --- Planned tools (in-site placeholder pages) ---
  { id: 'json-tree-viewer', category: 'text', name: 'JSON Tree Viewer', desc: 'Explore JSON as a collapsible tree and filter it down to nodes matching a keyword.', icon: 'braces', ready: true },
  { id: 'markdown-to-html', category: 'text', name: 'Markdown to HTML', desc: 'Convert Markdown to HTML with a live preview.', icon: 'code', ready: true },
  { id: 'base64', category: 'text', name: 'Base64 Encode / Decode', desc: 'Convert text to and from Base64.', ready: false },
  { id: 'text-diff', category: 'text', name: 'Text Diff', desc: 'Highlight the differences between two texts.', ready: false },
  { id: 'regex-tester', category: 'dev', name: 'Regex Tester', desc: 'Test regular expressions against text in real time.', ready: false },
  { id: 'cron-builder', category: 'dev', name: 'Cron Builder', desc: 'Build cron schedule expressions visually.', ready: false },
  { id: 'image-converter', category: 'media', name: 'Image Converter', desc: 'Convert images between formats. Opens ic.ropean.org.', external: 'https://ic.ropean.org/', ready: true },
  { id: 'qr-generator', category: 'media', name: 'QR Code Generator', desc: 'Turn text or a link into a downloadable QR code (PNG or SVG).', icon: 'qr', ready: true },
  { id: 'unit-converter', category: 'calc', name: 'Unit Converter', desc: 'Convert length, weight, temperature and more.', ready: false },
  { id: 'world-clock', category: 'daily', name: 'World Clock', desc: 'See the current time around the world; add your own clocks, saved locally.', icon: 'clock', ready: true },

  // --- External tools (off-site, open in a new tab). Titles/descriptions taken
  //     from the live pages. ---
  { id: 'jwt-decoder', category: 'dev', name: 'JWT Decoder', desc: 'Decode and inspect JSON Web Tokens.', external: 'https://jwt.ropean.org/', ready: true },
  { id: 'sqlite-browser', category: 'dev', name: 'SQLite Browser', desc: 'View, edit and query SQLite database files.', external: 'https://sqlite.ropean.org/', ready: true },
  { id: 'access-to-sqlite', category: 'dev', name: 'Access to SQLite', desc: 'Convert Microsoft Access databases (.mdb/.accdb) to SQLite.', external: 'https://ats.ropean.org/', ready: true },
  { id: 'seo-indexnow', category: 'dev', name: 'SEO IndexNow Submit', desc: 'Submit URLs to search engines (Bing, Yandex, Google, Baidu) via IndexNow.', external: 'https://seo.ropean.org/', ready: true },
  { id: 'api-hub', category: 'dev', name: 'API Hub', desc: 'Browse and try the API (RapiDoc & Hoppscotch).', external: 'https://api.ropean.org/', ready: true },
  { id: 'cf-contact-script', category: 'dev', name: 'CF Contact Script Generator', desc: 'Generate a Cloudflare console script to batch-update domain registrar contacts.', external: 'https://cf.ropean.org/', ready: true },
  { id: 'markitdown', category: 'text', name: 'MarkItDown', desc: 'Convert any file or URL to clean Markdown.', external: 'https://md.ropean.org/', ready: true },
  { id: 'chinese-id-toolkit', category: 'daily', name: 'Chinese ID Toolkit', desc: 'Validate, look up, generate and upgrade Chinese ID numbers.', external: 'https://iv.ropean.org/', ready: true },
  { id: 'logo-designer', category: 'media', name: 'Logo Designer', desc: 'Design logos in the browser.', external: 'https://logo.ropean.org/', ready: true },
  { id: 'peek', category: 'dev', name: 'Peek', desc: 'HTTP inspector and API debugging tool.', external: 'https://peek.aceapp.dev/', ready: true },

  // --- GitHub projects (open in a new tab) ---
  { id: 'git-z', category: 'dev', name: 'git-z', desc: 'Visualize a git repository history as a self-contained HTML report.', external: 'https://github.com/ropean/git-z', ready: true },
  { id: 'qlint', category: 'dev', name: 'qlint', desc: 'Multi-language code quality scanner with HTML/JSON/Markdown reports.', external: 'https://github.com/ropean/qlint', ready: true },
  { id: 'proxy', category: 'dev', name: 'proxy', desc: 'Tiny local reverse-proxy: forward several ports to one backend, rewriting Host.', external: 'https://github.com/ropean/proxy', ready: true },
  { id: 'ports', category: 'dev', name: 'ports', desc: 'See what is running on your ports — a color-coded CLI.', external: 'https://github.com/ropean/ports', ready: true },
  { id: 'launchpad', category: 'dev', name: 'launchpad', desc: 'Cross-platform GUI to start, stop and watch local dev projects.', external: 'https://github.com/ropean/launchpad', ready: true },
  { id: 'muze', category: 'media', name: 'muze', desc: 'Search Chinese music platforms and resolve playback URLs.', external: 'https://github.com/ropean/muze', ready: true },
];

// The link target for a tool card / switcher entry: the external URL for
// off-site tools, otherwise a root-level page per tool.
export function toolHref(tool) {
  return tool.external ?? `/${tool.id}.html`;
}

export function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

// Tools grouped by category, in CATEGORIES order, skipping empty groups.
export function groupByCategory(tools = TOOLS) {
  return CATEGORIES
    .map((cat) => ({ ...cat, tools: tools.filter((t) => t.category === cat.key) }))
    .filter((g) => g.tools.length > 0);
}
