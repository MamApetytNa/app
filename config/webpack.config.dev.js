const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const mergeConfigs = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';

const env = getClientEnvironment(publicUrl);

const externals = nodeExternals({
  whitelist: [
    /^babel-plugin-universal-import/,
    /^react-universal-component/,
    /^require-universal-module/,
    /^webpack-flush-chunks/,
    /^webpack\/hot\/dev-server/,
  ],
});

const devtoolModuleFilenameTemplate = info =>
  path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');

const config = {
  devtool: 'inline-source-map',
  resolve: {
    modules: ['node_modules', paths.appNodeModules]
      .concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    extensions: ['.js', '.json', '.jsx'],
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    devtoolModuleFilenameTemplate,
  },
  module: {
    strictExportPresence: true,
    rules: [{
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      use: [{
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),
        },
        loader: require.resolve('eslint-loader'),
      }],
      include: paths.appSrc,
    }, {
      oneOf: [{
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'media/[name].[ext]',
        },
      }, {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      }, {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
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
                  browsers: [
                    '>1%',
                    'last 2 versions',
                    'not ie < 11',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      }, {
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'media/[name].[ext]',
        },
      }],
    }],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};

module.exports.clientConfig = mergeConfigs(config, {
  name: 'client',
  target: 'web',
  entry: [
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-hot-middleware/client'),
    require.resolve('./polyfills'),
    paths.appIndexJs,
  ],
  output: {
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath,
  },
  devServer: {
    host: 'localhost',
    port: 3000,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    }),
  ],
});

module.exports.serverConfig = mergeConfigs(config, {
  name: 'server',
  target: 'node',
  externals,
  entry: [path.resolve(__dirname, '../src/server/render')],
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
