// Tool catalog and categories.
// Each tool: { id, category, name, desc, ready, href? }
//  - ready:false  → shows a "Coming soon" badge and renders a placeholder page.
//  - href present → links directly to a standalone HTML tool in public/ (opens that file).
//  - no href      → an in-site page is generated at /tools/<id>.html by src/pages/tools/[id].astro.

export const CATEGORIES = [
  { key: 'text', label: 'Text' },
  { key: 'media', label: 'Image & Media' },
  { key: 'calc', label: 'Convert & Calculate' },
  { key: 'dev', label: 'Developer' },
  { key: 'daily', label: 'Everyday' },
];

export const TOOLS = [
  // --- Live standalone tools (existing self-contained HTML in public/) ---
  {
    id: 'dns-checker',
    category: 'dev',
    name: 'DNS Checker',
    desc: 'Query and inspect DNS records for any domain.',
    ready: true,
    href: '/dns-checker.html',
  },
  {
    id: 'nginx-config-formatter',
    category: 'dev',
    name: 'Nginx Config Formatter',
    desc: 'Format and beautify Nginx configuration files.',
    ready: true,
    href: '/nginx-config-formatter.html',
  },
  {
    id: 'openresty-cors-generator',
    category: 'dev',
    name: 'OpenResty CORS Generator',
    desc: 'Generate CORS configuration snippets for OpenResty and Nginx.',
    ready: true,
    href: '/openresty-cors-generator.html',
  },
  {
    id: 'htaccess-rewrite',
    category: 'dev',
    name: '.htaccess Rewrite Rules',
    desc: 'Build Apache rewrite rules visually.',
    ready: true,
    href: '/rewrite_rules_htaccess.html',
  },
  {
    id: 'random-string-generator',
    category: 'daily',
    name: 'Random String Generator',
    desc: 'Generate random strings, tokens and passwords.',
    ready: true,
    href: '/Random-String-Generator.html',
  },

  // --- Planned tools (in-site placeholder pages) ---
  { id: 'json-formatter', category: 'text', name: 'JSON Formatter', desc: 'Format, minify and validate JSON.', ready: false },
  { id: 'base64', category: 'text', name: 'Base64 Encode / Decode', desc: 'Convert text to and from Base64.', ready: false },
  { id: 'text-diff', category: 'text', name: 'Text Diff', desc: 'Highlight the differences between two texts.', ready: false },
  { id: 'regex-tester', category: 'dev', name: 'Regex Tester', desc: 'Test regular expressions against text in real time.', ready: false },
  { id: 'cron-builder', category: 'dev', name: 'Cron Builder', desc: 'Build cron schedule expressions visually.', ready: false },
  { id: 'image-compressor', category: 'media', name: 'Image Compressor', desc: 'Compress images right in the browser.', ready: false },
  { id: 'qr-generator', category: 'media', name: 'QR Code Generator', desc: 'Turn text or links into QR codes.', ready: false },
  { id: 'unit-converter', category: 'calc', name: 'Unit Converter', desc: 'Convert length, weight, temperature and more.', ready: false },
  { id: 'timestamp-converter', category: 'calc', name: 'Timestamp Converter', desc: 'Convert between Unix timestamps and dates.', ready: false },
];

// The link target for a tool card / switcher entry: always the wrapped in-site page.
// Standalone tools (with `href`) are embedded inside that page via an iframe.
export function toolHref(tool) {
  return `/tools/${tool.id}.html`;
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
