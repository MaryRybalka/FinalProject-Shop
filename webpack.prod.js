const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {

  devtool: 'source-map',
  // devServer: {
  //     contentBase: 'dist',
  //     host: '95.154.71.136',
  //     port: 3331,
  // },

  entry: {
    index: './src/page-index/main.js',
    dogs: './src/page-dog/main.js',
    game: './src/page-game/main.js'
  },

  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              esModule: false,
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/page-index/tmpl.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-dog/tmpl.html',
      inject: 'body',
      chunks: ['dogs'],
      filename: 'dogs.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-game/tmpl.html',
      inject: 'body',
      chunks: ['game'],
      filename: 'game.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}
