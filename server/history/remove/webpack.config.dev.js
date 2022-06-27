/**
 * Created by ManhNV11 on 10/25/2016.
 * Description: Bundle file and loader
 * */
'use strict';

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: './client/sources/app.js'
  },
  output: {
    path: path.join(__dirname, '/client/public'),
    filename: "[name].min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: true
      },
      compressor: {
        warnings: true //allow notify warning
      }
    })
    // , new webpack.optimize.CommonsChunkPlugin('app', 'app.js') //loai bo tap nham
  ],
  module: {
    /*Chỉ thị tiền xử lý trước khi chạy loaders*/
    preLoaders: !debug ? [] : [
      /*lint for jshint*/
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      /*loader css*/
      {
        test: /\.css$/,
        exclude: /(node_module)/,
        loader: 'style-loader!css-loader'
      },
      /*loader babel transform es6 => es5*/
      {
        test: /\.js$/,
        exclude: /(node_module)/,
        // loader: 'babel-loader?optional=runtime,cacheDirectory=true,presets[]=es2015'
        loader: 'babel-loader',
        query: {
          //cacheDirectory tập tin đã biên dịch, sẽ không transform lại nếu nó ko thay đổi
          cacheDirectory: true,
          presets: ['es2015']
        }
      },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  jshint: {
    esversion: 6, //you can change version 5
  },
  /*Cho server bắt đầu chạy từ thư mục public*/
  devServer: {
    contentBase: path.join(__dirname, 'client/public')
  },
  watch: true
};