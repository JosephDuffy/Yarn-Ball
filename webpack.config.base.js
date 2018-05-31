"use strict";

const path = require("path")
const webpack = require('webpack')
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')

module.exports = {
  entry: {
    background: "./src/background.ts"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  optimization: {
      splitChunks: {
          name: 'vendor',
          chunks: "initial"
      }
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtraWatchWebpackPlugin({
      files: [
        'src/Info.plist',
        'src/manifest.json',
        'package.json'
      ],
      dirs: [
        'src/assets',
      ],
    }),
  ]
}