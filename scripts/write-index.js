import fs from 'fs';
import path from 'path';

const out = path.join(process.cwd(), 'storybook-static', 'index.html');
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Storybook</title>
  <style>html,body,iframe{width:100%;height:100%;margin:0;border:0;background:#fff}</style>
</head>
<body>
  <iframe src="./iframe.html" title="Storybook preview" aria-label="Storybook preview"></iframe>
</body>
</html>`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html, 'utf8');
console.log('Wrote', out);
