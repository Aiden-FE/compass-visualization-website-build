const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

childProcess.execSync(
  `echo Standalone脚本执行, 执行路径: ${process.cwd()}, 工作目录为: ${process.env.GITHUB_WORKSPACE}`,
  {
    stdio: 'inherit',
  },
);

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
