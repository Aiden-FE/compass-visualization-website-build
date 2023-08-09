const fs = require('fs');
const path = require('path');

function resolver(...pathStr) {
  return path.join(__dirname, ...pathStr);
}

fs.rmSync(resolver('../dist'), {
  recursive: true,
  force: true,
});

fs.cpSync(resolver('../.next/standalone'), resolver('../dist'), {
  recursive: true,
  force: true,
});

fs.cpSync(resolver('../.next/static'), resolver('../dist/.next/static'), {
  recursive: true,
  force: true,
});

fs.cpSync(resolver('../public'), resolver('../dist/public'), {
  recursive: true,
  force: true,
});
