 var path = require('path');
 var webpack = require('webpack');
     
 module.exports = {
    // our configuration object is telling webpack to do is to start at the entry point
     entry: './assets/main.js',
     //It’ll go into that file, resolve all dependencies, and bundle them into the output path provided
     output: {
         path: path.resolve(__dirname, 'bundle'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };