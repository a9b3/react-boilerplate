const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  // https://webpack.js.org/concepts/#mode
  mode: devMode ? 'development' : 'production',
  // cheap-variant of SourceMap with module mappings
  devtool: 'cheap-module-source-map',
  resolve: {
    // Provide resolve paths with NODE_PATH delimited by :
    // ex. (NODE_PATH=./src:./js:./foo)
    modules: ['node_modules'].concat(
      (process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean),
    ),
  },
  entry: {
    app: [path.resolve(__dirname, './src/index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    // During dev we want the hash to change everytime to get hot reloading. But
    // for production we only want to update hash if content hash changed.
    filename: devMode
      ? '[name].[hash].bundled.js'
      : '[name].[contenthash].bundled.js',
    publicPath: '/',
  },
  module: {
    // Makes missing exports an error
    strictExportPresence: true,
    rules: [
      // We want all file types that does not have a rule set to be handled by
      // the file-loader, remember to exclude every new filetype that you add to
      // this first rule.
      {
        exclude: [
          /\.jsx?$/,
          /\.tsx?$/,
          /\.scss$/,
          /\.css$/,
          /\.html$/,
          /\.json$/,
          // Using this webpack module.rules in storybook webpack config.
          // https://github.com/storybooks/storybook/issues/2615
          /\.ejs$/,
          /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          /\.(png|jpe?g|gif|ico)$/i,
        ],
        loader: require.resolve('file-loader'),
      },
      {
        test: /\.json$/i,
        loader: require.resolve('json-loader'),
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: require.resolve('url-loader'),
        options: {
          // if asset is higher than limit, the file-loader will be used instead
          limit: 10000,
        },
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 8192,
            },
          },
          devMode && {
            loader: require.resolve('image-webpack-loader'),
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interfaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            // faster rebuilds
            cacheDirectory: true,
            plugins: [require.resolve('react-hot-loader/babel')],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: require.resolve('html-loader'),
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode
            ? require.resolve('style-loader')
            : MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: devMode,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode
            ? require.resolve('style-loader')
            : MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: devMode,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugin: () => [autoprefixer()],
              sourceMap: devMode,
            },
          },
          require.resolve('sass-loader'),
        ],
      },
    ],
  },
  plugins: [
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    // https://twitter.com/wSokra/status/969633336732905474
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
}
