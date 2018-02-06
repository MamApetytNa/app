const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const paths = require('./paths');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

require('./env');

module.exports = {
  resolve: {
    modules: ['node_modules', paths.appNodeModules]
      .concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    extensions: ['.js', '.json', '.jsx'],
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
};
