process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (err) => {
  throw err;
});

require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const { clientConfig, serverConfig } = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const { measureFileSizesBeforeBuild } = FileSizeReporter;
const { printFileSizesAfterBuild } = FileSizeReporter;
const useYarn = fs.existsSync(paths.yarnLockFile);

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1);
}

function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  const compiler = webpack([clientConfig, serverConfig]);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(chalk.yellow('\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'));
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}
function handleMutliStats(stats) {
  const assets = stats
    .toJson()
    .children
    .map(child => child.assets)
    .reduce((a, b) => a.concat(b));

  return {
    toJson() {
      return { assets };
    },
  };
}

measureFileSizesBeforeBuild(paths.appBuild)
  .then((previousFileSizes) => {
    fs.emptyDirSync(paths.appBuild);

    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(`\nSearch for the ${
          chalk.underline(chalk.yellow('keywords'))
        } to learn more about each warning.`);
        console.log(`To ignore, add ${
          chalk.cyan('// eslint-disable-next-line')
        } to the line before.\n`);
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        handleMutliStats(stats),
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
      );

      // eslint-disable-next-line import/no-dynamic-require, global-require
      const appPackage = require(paths.appPackageJson);
      const { publicUrl } = paths;
      const { publicPath } = clientConfig.output;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn,
      );

      const clientStats = stats.toJson().children.find(stat => stat.name === 'client');
      return fs.writeFileSync(path.join(buildFolder, 'stats.json'), JSON.stringify(clientStats));
    },
    (err) => {
      console.log(chalk.red('Failed to compile.\n'));
      printBuildError(err);
      process.exit(1);
    },
  );
