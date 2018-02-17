const autoprefixer = require('autoprefixer');
const path = require('path');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const nodeExternals = require('webpack-node-externals');

const paths = require('./paths');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

require('./env');

module.exports.serverExternals = nodeExternals({
  whitelist: [
    /^babel-plugin-universal-import/,
    /^react-universal-component/,
    /^require-universal-module/,
    /^webpack-flush-chunks/,
    /^webpack\/hot\/dev-server/,
  ],
});

module.exports.node = {
  dgram: 'empty',
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
  child_process: 'empty',
  __dirname: false,
  __filename: false,
};

module.exports.resolve = {
  modules: ['node_modules', paths.appNodeModules]
    .concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
  extensions: ['.js', '.json', '.jsx'],
  plugins: [
    new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
  ],
};

module.exports.output = {
  path: paths.appBuild,
  chunkFilename: 'js/[name].[chunkhash].js',
  devtoolModuleFilenameTemplate(info) {
    return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
  },
};

module.exports.eslintLoaders = [{
  test: /\.(js|jsx)$/,
  enforce: 'pre',
  use: [{
    options: {
      formatter: eslintFormatter,
      eslintPath: require.resolve('eslint'),
      emitWarning: true,
    },
    loader: require.resolve('eslint-loader'),
  }],
  include: paths.appSrc,
}];

module.exports.getJsLoaders = babelOptions => [{
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: babelOptions,
}];

module.exports.svgLoaders = [{
  test: /\.svg$/,
  include: paths.appSrc,
  use: [{
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true,
    },
  }, {
    loader: require.resolve('react-svg-loader'),
    options: {
      jsx: true,
    },
  }],
}];

module.exports.imageLoaders = [{
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'media/[name].[ext]',
  },
}];

module.exports.otherLoaders = [{
  exclude: [/\.js$/, /\.ejs$/, /\.html$/, /\.json$/],
  loader: require.resolve('file-loader'),
  options: {
    name: 'media/[name].[ext]',
  },
}];

module.exports.cssLoaders = [{
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
  },
}, {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    plugins: () => [
      postcssFlexbugsFixes,
      autoprefixer({
        flexbox: 'no-2009',
      }),
    ],
  },
}];
