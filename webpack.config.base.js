"use strict";

const path = require("path")
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    background: "./background.ts"
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
    new CleanWebpackPlugin(['build'])
  ]
}