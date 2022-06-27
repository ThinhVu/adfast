/**
 * Created by ManhNV11 on 10/25/2016.
 * Description: Bundle file and loader
 * */
'use strict';

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./client/sources/app.js",
  output: {
    path: path.join(__dirname, '/client/sources'),
    filename: "app.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    /*Chỉ thị tiền xử lý trước khi chạy loaders*/
    preLoaders: !debug ? [] : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      /*load url vs image*/
      /*   {
       test: /\.(jpg|png|gif)$/,
       include: /images/,
       loader: 'url'
       },*/
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
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  jshint: {
    esversion: 6 //you can change version 6
  }
  /*entry: {
   app: './client/sources/app.js',
   "app.controller": './client/sources/app.controller.js',
   "app.config": './client/sources/app.config.js'
   },
   output: {
   path: __dirname + '/client/public',
   filename: "[name].js"
   },*/
  /*plugins: [
   new webpack.optimize.CommonsChunkPlugin('app', 'app.js') //loai bo tap nham
   ]*/
  //, watch: true
};