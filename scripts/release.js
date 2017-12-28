const archiver = require('archiver');
const fs = require('fs-extra');
const path = require('path');

const paths = require('../config/paths');

async function prepareDir(dirPath) {
  await fs.ensureDir(dirPath);
  await fs.emptyDir(dirPath);
}

function zipDir(dirPath, zipPath) {
  const destStream = fs.createWriteStream(zipPath);
  const archive = archiver('zip');

  return new Promise(((resolve, reject) => {
    destStream.on('close', () => {
      resolve(destStream.path);
    });

    // Reject on Error
    archive.on('error', reject);

    archive.directory(dirPath, '.');

    // Some logs
    archive.on('entry', (file) => {
      console.log(`Zipping ${file.name}`);
    });

    // Pipe the stream
    archive.pipe(destStream);
    archive.finalize();
  }));
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

  await prepareDir(path.join(paths.appRelease, '.ebextensions'));
  await fs.copy(
    path.join(paths.appEbExtensionsConfig, 'logging.config'),
    path.join(paths.appRelease, '.ebextensions', 'logging.config'),
  );

  await fs.copy(paths.appPackageJson, path.join(paths.appRelease, 'package.json'));
  await fs.copy(paths.appYarnLock, path.join(paths.appRelease, 'yarn.lock'));

  await zipDir(paths.appRelease, 'release.zip');
  await fs.remove(paths.appRelease);
}

release().then(() => {
  console.log('All done');
  process.exit(0);
}, (err) => {
  console.log(err);
  process.exit(1);
});
