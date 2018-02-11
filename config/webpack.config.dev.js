const path = require('path');
const webpack = require('webpack');
const mergeConfigs = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const commonConfig = require('./webpack.config.common');
const { getClientEnvironment, getServerEnvironment } = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';

const config = {
  node: commonConfig.node,
  resolve: commonConfig.resolve,
  devtool: 'inline-source-map',
  output: {
    ...commonConfig.output,
    pathinfo: true,
  },
  module: {
    strictExportPresence: true,
    rules: [
      ...commonConfig.eslintLoaders, {
        oneOf: [
          ...commonConfig.svgLoaders,
          ...commonConfig.imageLoaders,
          ...commonConfig.jsLoaders, {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              ...commonConfig.cssLoaders,
            ],
          },
          ...commonConfig.otherLoaders,
        ],
      }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  performance: {
    hints: false,
  },
};

module.exports.storybookConfig = mergeConfigs(config, {
  name: 'client',
  target: 'web',
  entry: [paths.appIndexJs],
  plugins: [
    new webpack.DefinePlugin(getClientEnvironment(publicUrl).stringified),
  ],
});

module.exports.clientConfig = mergeConfigs(config, {
  name: 'client',
  target: 'web',
  entry: [
    require.resolve('webpack-hud'),
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
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin(getClientEnvironment(publicUrl).stringified),
  ],
});

module.exports.serverConfig = mergeConfigs(config, {
  name: 'server',
  target: 'node',
  externals: commonConfig.serverExternals,
  entry: [path.resolve(__dirname, '../src/server/index.js')],
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin(getServerEnvironment(publicUrl).stringified),
  ],
});
