const fs = require('fs');

const filepath = process.argv[2];
if (!filepath) {
  console.error('Usage: node add-shebang.js <path-to-js-file>');
  process.exit(1);
}

const SHEBANG = '#!/usr/bin/env node\n';

// Read current file content
let content = fs.readFileSync(filepath, 'utf8');

// Add shebang if not present
if (!content.startsWith('#!')) {
  content = SHEBANG + content;
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Added shebang to ${filepath}`);
} else {
  console.log(`Shebang already present in ${filepath}`);
}

// Set executable permission (Unix-like only, no error on Windows)
try {
  fs.chmodSync(filepath, 0o755);
  console.log(`Set executable permission for ${filepath}`);
} catch (err) {
  console.warn(`Could not set executable permission on ${filepath}: ${err.message}`);
}
