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

async function adjustManifest(src, dest) {
  const manifest = await fs.readJson(src);

  manifest.serviceworker = {
    src: 'service-worker.js',
    scope: '/',
    use_cache: false,
  };

  manifest.icons.forEach((icon) => {
    icon.src = `icons/${icon.src}`;
  });

  manifest.theme_color = '#3f51b5';

  await fs.writeJson(dest, manifest);
  await fs.remove(src);
}

async function release() {
  await fs.remove('release.zip');
  await prepareDir(paths.appRelease);
  await prepareDir(path.join(paths.appRelease, 'public'));

  await fs.copy(
    path.join(paths.appBuild, 'js'),
    path.join(paths.appRelease, 'public', 'js'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'css'),
    path.join(paths.appRelease, 'public', 'css'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'media'),
    path.join(paths.appRelease, 'public', 'media'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'icons'),
    path.join(paths.appRelease, 'public', 'icons'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'service-worker.js'),
    path.join(paths.appRelease, 'public', 'service-worker.js'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'server.js'),
    path.join(paths.appRelease, 'server.js'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'server.js.map'),
    path.join(paths.appRelease, 'server.js.map'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'stats.json'),
    path.join(paths.appRelease, 'stats.json'),
  );
  await fs.copy(
    path.join(paths.appBuild, 'icons.json'),
    path.join(paths.appRelease, 'icons.json'),
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
  await fs.copy(
    path.join(paths.appEbExtensionsConfig, 'yarn.config'),
    path.join(paths.appRelease, '.ebextensions', 'yarn.config'),
  );

  await fs.copy(paths.appPackageJson, path.join(paths.appRelease, 'package.json'));
  await fs.copy(paths.appYarnLock, path.join(paths.appRelease, 'yarn.lock'));

  await adjustManifest(
    path.join(paths.appRelease, 'public', 'icons', 'manifest.json'),
    path.join(paths.appRelease, 'public', 'manifest.json'),
  );

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
