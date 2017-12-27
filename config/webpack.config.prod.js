

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const mergeConfigs = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');

const nodeModulesExternals = nodeExternals({
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

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const publicUrl = publicPath.slice(0, -1);

const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'public/css/[name].[contenthash:8].css';

const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

const config = {
  bail: true,
  devtool: 'source-map',
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
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }, {
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
            use: [{
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
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
            }],
          },
          extractTextPluginOptions,
        )),
      }, {
        loader: require.resolve('file-loader'),
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        options: {
          name: 'public/media/[name].[hash:8].[ext]',
        },
      }],
    }],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

module.exports.clientConfig = mergeConfigs(config, {
  name: 'client',
  target: 'web',
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  output: {
    filename: 'public/js/[name].[chunkhash:8].js',
    chunkFilename: 'public/js/[name].[chunkhash:8].chunk.js',
    publicPath,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: 'public/js/[name].[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin(env.stringified),
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
      filename: cssFilename,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'public/service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }

        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }

        console.log(message); // eslint-disable-line no-console
      },
      minify: true,
      navigateFallback: `${publicUrl}/index.html`,
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new FaviconsWebpackPlugin({
      logo: path.join(paths.appSrc, 'logo.svg'),
      prefix: 'public/icons/',
      emitStats: true,
      statsFilename: 'icons.json',
    }),
  ],
});

module.exports.serverConfig = mergeConfigs(config, {
  name: 'server',
  target: 'node',
  externals: nodeModulesExternals,
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
