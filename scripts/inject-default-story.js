import fs from 'fs';
import path from 'path';

const outHtml = path.join(process.cwd(), 'storybook-static', 'index.html');
const indexJson = path.join(process.cwd(), 'storybook-static', 'index.json');

function safeRead(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
}

const html = safeRead(outHtml);
if (!html) {
  console.warn('index.html missing or empty, skipping injector');
  process.exit(0);
}

if (html.includes('<!-- injected-default-story -->')) {
  console.log('Injector already applied, skipping');
  process.exit(0);
}

const idx = safeRead(indexJson);
let firstStoryId = null;
if (idx) {
  try {
    const j = JSON.parse(idx);
    const entries = j.entries || j;
    const keys = Object.keys(entries || {});
    if (keys.length) {
      // pick the first entry's id or key
      firstStoryId = entries[keys[0]].id || keys[0];
    }
  } catch (e) {
    // ignore
  }
}

if (!firstStoryId) {
  console.warn('No stories found in index.json, skipping injector');
  process.exit(0);
}

const snippet = `<!-- injected-default-story -->\n<script>\n(function(){\n  try{\n    const params=new URLSearchParams(location.search);\n    if(!params.has('path')){\n      const id=${JSON.stringify(firstStoryId)};\n      const target='?path=/story/'+encodeURIComponent(id);\n      location.replace(target + location.hash);\n    }\n  }catch(e){}\n})();\n</script>\n`;

// insert before closing </body>
const out = html.replace(/<\/body>/i, snippet + '</body>');
fs.writeFileSync(outHtml, out, 'utf8');
console.log('Injected default story redirect to', firstStoryId);
