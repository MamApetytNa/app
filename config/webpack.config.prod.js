const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const mergeConfigs = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const commonConfig = require('./webpack.config.common');
const { getClientEnvironment } = require('./env');
const paths = require('./paths');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);

const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const config = {
  node: commonConfig.node,
  resolve: commonConfig.resolve,
  bail: true,
  devtool: 'source-map',
  output: commonConfig.output,
  module: {
    strictExportPresence: true,
    rules: [...commonConfig.eslintLoaders, {
      oneOf: [
        ...commonConfig.svgLoaders,
        ...commonConfig.imageLoaders, {
          test: /\.(js|jsx)$/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            compact: true,
          },
        }, {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: commonConfig.cssLoaders,
            },
            {},
          )),
        },
        ...commonConfig.otherLoaders,
      ],
    }],
  },
};

module.exports.clientConfig = mergeConfigs(config, {
  name: 'client',
  target: 'web',
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: 'js/[name].[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin(getClientEnvironment(publicUrl).stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: `${publicUrl}/index.html`,
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new FaviconsWebpackPlugin({
      logo: path.join(paths.appSrc, 'logo.svg'),
      prefix: 'icons/',
      emitStats: true,
      statsFilename: 'icons.json',
    }),
  ],
});

module.exports.serverConfig = mergeConfigs(config, {
  name: 'server',
  target: 'node',
  externals: commonConfig.serverExternals,
  entry: path.resolve(__dirname, '../src/server/prod'),
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
