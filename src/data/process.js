import fse from 'fs-extra';
import glob from 'globby';
import path from 'path';

async function justDo() {
  const filePaths = await glob('*-????.js', {
    cwd: __dirname,
  });
  const data = filePaths.map(filePath => require(`./${filePath}`));

  console.log(data);
}


justDo().then(() => {
  process.exit(0);
}, (err) => {
  console.error(err);
  process.exit(1);
});
