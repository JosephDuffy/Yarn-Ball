"use strict";

const path = require("path");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const GenerateManifestPlugin = require("./lib/GenerateManifestPlugin");
const GenerateSafariPlistPlugin = require("./lib/GenerateSafariPlistPlugin");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    background: "./background.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  devtool: "eval-source-map",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new GenerateManifestPlugin(),
    new GenerateSafariPlistPlugin(),
  ]
};