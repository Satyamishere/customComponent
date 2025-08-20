import fs from 'fs';
import path from 'path';

const out = path.join(process.cwd(), 'storybook-static', 'index.html');

// If Storybook generated a non-empty index.html, don't overwrite it.
try {
  if (fs.existsSync(out)) {
    const stat = fs.statSync(out);
    if (stat.size && stat.size > 0) {
      console.log('Index exists and non-empty, skipping write:', out);
      process.exit(0);
    }
  }
} catch (e) {
  // continue to attempt write on any error
  console.warn('Error checking existing index.html, will attempt to write fallback:', e.message);
}

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
