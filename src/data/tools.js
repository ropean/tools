// Tool catalog and categories.
// Each tool: { id, category, name, desc, ready, external? }
//  - ready:true          → has a native Astro page at src/pages/<id>.astro.
//  - ready:false         → shows a "Coming soon" badge; a placeholder page is
//                          generated at /<id>.html by src/pages/[id].astro.
//  - external:'https://…' → an off-site tool: links straight to that URL in a new
//                          tab, marked "External ↗"; no in-site page is generated.
//  - favicon → explicit card icon (no auto-guessing): a filename/path resolved
//                          against the external origin ('favicon.svg', 'icon.png'),
//                          a full URL, or a known alias ('github'). Without it, the
//                          category icon is used.
//  - icon:'name'          → named icon for an internal tool (see ToolIcon.astro).
// Non-external entries link to /<id>.html at the site root (see toolHref).
//
// Style: titles are the real product/repo names; descriptions are a single
// sentence, verb-first, no parentheticals or domain names.

export const CATEGORIES = [
  { key: 'daily', label: 'Everyday' },
  { key: 'text', label: 'Text & Data' },
  { key: 'dev', label: 'Developer' },
  { key: 'web', label: 'Web & Servers' },
  { key: 'db', label: 'Database' },
  { key: 'media', label: 'Media' },
];

export const TOOLS = [
  // --- Live tools (native Astro pages under src/pages/) ---
  { id: 'random-string-generator', category: 'daily', name: 'Random String Generator', desc: 'Generate random strings, tokens and passwords.', icon: 'shuffle', ready: true },
  { id: 'qr-generator', category: 'daily', name: 'QR Code Generator', desc: 'Generate a QR code from text or a link.', icon: 'qr', ready: true },
  { id: 'world-clock', category: 'daily', name: 'World Clock', desc: 'Track current times worldwide with your own saved clocks.', icon: 'clock', ready: true },
  { id: 'json-tree-viewer', category: 'text', name: 'JSON Tree Viewer', desc: 'Explore JSON as a tree and filter nodes by keyword.', icon: 'braces', ready: true },
  { id: 'markdown-to-html', category: 'text', name: 'Markdown to HTML', desc: 'Convert Markdown to HTML with a live preview.', icon: 'code', ready: true },
  { id: 'dns-checker', category: 'web', name: 'DNS Checker', desc: 'Query and inspect DNS records for any domain.', icon: 'globe', ready: true },
  { id: 'nginx-config-formatter', category: 'web', name: 'Nginx Config Formatter', desc: 'Format and beautify Nginx configuration files.', icon: 'server', ready: true },
  { id: 'openresty-cors-generator', category: 'web', name: 'OpenResty CORS Generator', desc: 'Generate CORS config snippets for OpenResty and Nginx.', icon: 'shield', ready: true },
  { id: 'htaccess-rewrite', category: 'web', name: '.htaccess Rewrite Rules', desc: 'Build Apache rewrite rules visually.', icon: 'file', ready: true },

  // --- External tools (off-site, open in a new tab) ---
  { id: 'jwt-decoder', category: 'dev', name: 'JWT Decoder', desc: 'Decode and inspect JSON Web Tokens.', favicon: 'favicon.svg', external: 'https://jwt.ropean.org/', ready: true },
  { id: 'api-hub', category: 'dev', name: 'API Hub', desc: 'Browse and try API endpoints interactively.', favicon: 'favicon.svg', external: 'https://api.ropean.org/', ready: true },
  { id: 'peek', category: 'dev', name: 'Peek', desc: 'Inspect HTTP traffic and debug APIs.', favicon: 'favicon.ico', external: 'https://peek.aceapp.dev/', ready: true },
  { id: 'markitdown', category: 'text', name: 'MarkItDown', desc: 'Convert any file or URL to clean Markdown.', favicon: 'favicon.svg', external: 'https://md.ropean.org/', ready: true },
  { id: 'seo-indexnow', category: 'web', name: 'SEO IndexNow Submit', desc: 'Submit URLs to search engines via IndexNow.', favicon: 'favicon.ico', external: 'https://seo.ropean.org/', ready: true },
  { id: 'cf-contact-script', category: 'web', name: 'CF Contact Script Generator', desc: 'Generate a script to batch-update domain registrar contacts.', favicon: 'favicon.ico', external: 'https://cf.ropean.org/', ready: true },
  { id: 'itdog-ping', category: 'web', name: 'ITDOG Ping (vercel.app)', desc: 'Ping vercel.app from many locations across China.', favicon: 'favicon.ico', external: 'https://www.itdog.cn/ping/vercel.app', ready: true },
  { id: 'sqlite-browser', category: 'db', name: 'SQLite Browser', desc: 'View, edit and query SQLite database files.', favicon: 'favicon.ico', external: 'https://sqlite.ropean.org/', ready: true },
  { id: 'access-to-sqlite', category: 'db', name: 'Access to SQLite', desc: 'Convert Microsoft Access databases to SQLite.', favicon: 'favicon.svg', external: 'https://ats.ropean.org/', ready: true },
  { id: 'chinese-id-toolkit', category: 'daily', name: 'Chinese ID Toolkit', desc: 'Validate, look up, generate and upgrade Chinese ID numbers.', favicon: 'favicon.svg', external: 'https://iv.ropean.org/', ready: true },
  { id: 'logo-designer', category: 'media', name: 'Logo Designer', desc: 'Design logos in the browser.', favicon: 'favicon.svg', external: 'https://logo.ropean.org/', ready: true },
  { id: 'image-converter', category: 'media', name: 'Image Converter', desc: 'Convert images between formats.', favicon: 'favicon.ico', external: 'https://ic.ropean.org/', ready: true },

  // --- GitHub projects (open in a new tab) ---
  { id: 'git-z', category: 'dev', name: 'git-z', desc: 'Visualize git repository history as an HTML report.', favicon: 'github', external: 'https://github.com/ropean/git-z', ready: true },
  { id: 'qlint', category: 'dev', name: 'qlint', desc: 'Scan code quality across languages with rich reports.', favicon: 'github', external: 'https://github.com/ropean/qlint', ready: true },
  { id: 'launchpad', category: 'dev', name: 'launchpad', desc: 'Start, stop and watch local dev projects from a GUI.', favicon: 'github', external: 'https://github.com/ropean/launchpad', ready: true },
  { id: 'proxy', category: 'web', name: 'proxy', desc: 'Forward several local ports to one backend, rewriting Host.', favicon: 'github', external: 'https://github.com/ropean/proxy', ready: true },
  { id: 'ports', category: 'web', name: 'ports', desc: 'See what is running on your ports from the CLI.', favicon: 'github', external: 'https://github.com/ropean/ports', ready: true },
  { id: 'muze', category: 'media', name: 'muze', desc: 'Search Chinese music platforms and resolve playback URLs.', favicon: 'github', external: 'https://github.com/ropean/muze', ready: true },
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
