const fs = require('fs-extra');
const path = require('path');
const { zip } = require('node-zip-dir');

const paths = require('../config/paths');

async function prepareDir(dirPath) {
  await fs.ensureDir(dirPath);
  await fs.emptyDir(dirPath);
}

async function release() {
  await fs.remove('release.zip');
  await prepareDir(paths.appRelease);

  await fs.copy(
    path.join(paths.appBuild),
    path.join(paths.appRelease),
  );

  await prepareDir(path.join(paths.appRelease, 'config'));
  await fs.copy(
    path.join(paths.appConfig, 'paths.js'),
    path.join(paths.appRelease, 'config', 'paths.js'),
  );

  await prepareDir(path.join(paths.appRelease, 'scripts'));
  await fs.copy(
    path.join(paths.appScripts, 'start.js'),
    path.join(paths.appRelease, 'scripts', 'start.js'),
  );

  await fs.copy(paths.appPackageJson, path.join(paths.appRelease, 'package.json'));
  await fs.copy(paths.appYarnLock, path.join(paths.appRelease, 'yarn.lock'));

  await zip(paths.appRelease, 'release.zip');
  await fs.remove(paths.appRelease);
}

release().then(() => {
  console.log('All done');
  process.exit(0);
}, (err) => {
  console.log(err);
  process.exit(1);
});
