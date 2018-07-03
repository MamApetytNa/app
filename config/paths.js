const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(aPath, needsSlash) {
  const hasSlash = aPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return aPath.substr(aPath, aPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${aPath}/`;
  }
  return aPath;
}

const getPublicUrl = appPackageJson =>
  // eslint-disable-next-line import/no-dynamic-require, global-require
  envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/client.js'),
  appPackageJson: resolveApp('package.json'),
  appPackageLock: resolveApp('package-lock.json'),
  appSrc: resolveApp('src'),
  appConfig: resolveApp('config'),
  appScripts: resolveApp('scripts'),
  appRelease: resolveApp('release'),
  appEbExtensionsConfig: resolveApp('.ebextensions'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};
