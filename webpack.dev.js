const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  devtool: 'eval-cheap-module-source-map',

  entry: {
    index: './src/page-index/main.js',
    dogs: './src/page-dog/main.js',
    game: './src/page-game/main.js'
  },

  devServer: {
    port: 3131,
    writeToDisk: false
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
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            // loader: 'image-webpack-loader',
            options: {
              name: '[path][name].[ext]?hash=[hash:20]',
              esModule: false,
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page-index/tmpl.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-dog/tmpl.html',
      inject: true,
      chunks: ['dogs'],
      filename: 'dogs.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-game/tmpl.html',
      inject: true,
      chunks: ['game'],
      filename: 'game.html'
    })
  ]
}
