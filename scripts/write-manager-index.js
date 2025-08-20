import fs from 'fs';
import path from 'path';

const out = path.join(process.cwd(), 'storybook-static', 'index.html');

function read(p) { try { return fs.readFileSync(p); } catch (e) { return null; } }

const existing = read(out);
if (existing && existing.length > 20) {
  console.log('Existing index.html non-empty, skipping manager write');
  process.exit(0);
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Storybook</title>
  <style>html,body{height:100%;margin:0;background:#111;color:#fff;font-family:sans-serif}#sb-root{height:100%}</style>
</head>
<body>
  <div id="sb-root"></div>
  <script>
    // load manager scripts via script tags so UMD/CJS bundles execute correctly
    function loadScript(src, onload, onerror) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = onload;
      s.onerror = onerror;
      document.head.appendChild(s);
    }
    // attempt to load globals-runtime and runtime
    loadScript('./sb-manager/globals-runtime.js', function(){
      loadScript('./sb-manager/runtime.js', function(){
        console.log('Manager runtime loaded');
      }, function(e){
        console.error('Failed to load runtime.js', e);
        document.getElementById('sb-root').innerHTML = '<iframe src="./iframe.html" style="width:100%;height:100%;border:0"></iframe>';
      });
    }, function(e){
      console.error('Failed to load globals-runtime.js', e);
      document.getElementById('sb-root').innerHTML = '<iframe src="./iframe.html" style="width:100%;height:100%;border:0"></iframe>';
    });

    // fallback: if manager doesn't select a story within 2s, redirect to first story path if available
    setTimeout(function(){
      try{
        const params=new URLSearchParams(location.search);
        if(!params.has('path')){
          // do not hardcode; try to redirect to a sensible fallback route
          // if index.json exists, we'll let the injector add a redirect
        }
      }catch(e){}
    }, 2000);
  </script>
</body>
</html>`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html, 'utf8');
console.log('Wrote manager-style index.html ->', out);
