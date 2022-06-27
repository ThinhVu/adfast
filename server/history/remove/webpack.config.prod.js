/**
 * Created by ManhNV11 on 10/25/2016.
 * Description: Bundle file and loader
 * */
'use strict';

var debug = process.env.NODE_ENV === "production";
var webpack = require('webpack');
var path = require('path');
var WebpackStripLoader = require('strip-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //export html
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //extract css file

module.exports = {
  entry: {
    app: './client/sources/app.js'
  },
  output: {
    path: path.join(__dirname, '/client/public'),
    filename: "[name].min.js",
    chunkFilename: "[id].bundle.js"
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: false,
      output: {
        comments: false //remove comment
      },
      compress: {
        warnings: false //not notify warning
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './client/sources/index.view.html',
      title: 'Page BundleFile',
      filename: 'index.view.html'
    })
    // , new webpack.optimize.CommonsChunkPlugin('app', 'app.js') //loai bo tap nham
  ],
  module: {
    /*Chỉ thị tiền xử lý trước khi chạy loaders, mode-produce ==> remove*/
    preLoaders: !debug ? [] : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      /*loader css*/
      {
        test: /\.css$/,
        exclude: /node_module/,
        loader: 'style-loader!css-loader'
      },
      /*loader babel transform es6 => es5*/
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel-loader',
        query: {
          //cacheDirectory tập tin đã biên dịch, sẽ không transform lại nếu nó ko thay đổi
          cacheDirectory: true,
          presets: ['es2015']
        }
      },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      /*Doan ma nay dung cho strip-loader*/
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: WebpackStripLoader.loader('console.log') //remove console.log
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6'] //cho phep cac duoi mo rong thay cho
  },
  jshint: {
    esversion: 6 //you can change version 5
  },
  /*Env: dev-server \> Cho server bắt đầu chạy từ thư mục public*/
  devServer: {
    contentBase: path.join(__dirname, 'client/public')
  },
  watch: false,
};

/* OccurrenceOrderPlugin
 Assign the module and chunk ids by occurrence count. Ids that are used often
 get lower (shorter) ids. This makes ids predictable, reduces to total file size and is recommended*/