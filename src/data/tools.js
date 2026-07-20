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
    ready: true,
  },
  {
    id: 'nginx-config-formatter',
    category: 'dev',
    name: 'Nginx Config Formatter',
    desc: 'Format and beautify Nginx configuration files.',
    ready: true,
  },
  {
    id: 'openresty-cors-generator',
    category: 'dev',
    name: 'OpenResty CORS Generator',
    desc: 'Generate CORS configuration snippets for OpenResty and Nginx.',
    ready: true,
  },
  {
    id: 'htaccess-rewrite',
    category: 'dev',
    name: '.htaccess Rewrite Rules',
    desc: 'Build Apache rewrite rules visually.',
    ready: true,
  },
  {
    id: 'random-string-generator',
    category: 'daily',
    name: 'Random String Generator',
    desc: 'Generate random strings, tokens and passwords.',
    ready: true,
  },

  // --- Planned tools (in-site placeholder pages) ---
  { id: 'json-tree-viewer', category: 'text', name: 'JSON Tree Viewer', desc: 'Explore JSON as a collapsible tree and filter it down to nodes matching a keyword.', ready: true },
  { id: 'base64', category: 'text', name: 'Base64 Encode / Decode', desc: 'Convert text to and from Base64.', ready: false },
  { id: 'text-diff', category: 'text', name: 'Text Diff', desc: 'Highlight the differences between two texts.', ready: false },
  { id: 'regex-tester', category: 'dev', name: 'Regex Tester', desc: 'Test regular expressions against text in real time.', ready: false },
  { id: 'cron-builder', category: 'dev', name: 'Cron Builder', desc: 'Build cron schedule expressions visually.', ready: false },
  { id: 'image-converter', category: 'media', name: 'Image Converter', desc: 'Convert images between formats. Opens ic.ropean.org.', external: 'https://ic.ropean.org/', ready: true },
  { id: 'qr-generator', category: 'media', name: 'QR Code Generator', desc: 'Turn text or links into QR codes.', ready: false },
  { id: 'unit-converter', category: 'calc', name: 'Unit Converter', desc: 'Convert length, weight, temperature and more.', ready: false },
  { id: 'world-clock', category: 'daily', name: 'World Clock', desc: 'See the current time around the world; add your own clocks, saved locally.', ready: true },
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
