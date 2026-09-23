const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDir(fullPath);
    } else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(fullPath, 'utf8');
      const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
      if (match) {
        const desc = match[1];
        const status = desc.length >= 75 && desc.length <= 160 ? '✅ OK' : '❌ OUT OF RANGE';
        console.log(`${status} [${desc.length} chars] ${fullPath.replace(/.*\.next[\\\/]server[\\\/]app/, '')}:\n   "${desc}"\n`);
      }
    }
  }
}

if (fs.existsSync('.next/server/app')) {
  checkDir('.next/server/app');
} else {
  console.log('No .next/server/app directory');
}
