const fs = require('fs');
const path = require('path');

console.log('Standalone脚本执行, 执行路径: %s, 工作目录为: %s', process.cwd(), process.env.GITHUB_WORKSPACE);

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
