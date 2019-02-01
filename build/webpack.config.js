const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: ['./src/main.js'],
  output: {
    filename: 'js/[name]-[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(ttf|eot|woff|otf|svg)$/,
        loader: 'file-loader',
        include: [path.resolve(__dirname, '../src/fonts')],
        options: {
          name: 'fonts/[name]-[hash:8].[ext]',
          publicPath: '../'
        }
      },
      {
        test: /\.(jpg|gif|png|svg|ico)$/,
        exclude: [path.resolve(__dirname, '../src/fonts')],
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'images/[name]-[hash:8].[ext]',
            publicPath: '../'
          }
        }]
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin('style/[name]-[hash:8].css'),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      favicon: 'src/images/favicon.ico'
    })
  ],
  stats: {
    children: false,
    modules: false
  }
};