"use strict";

const path = require("path");
const GenerateManifestPlugin = require("./lib/GenerateManifestPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const clone = require("clone");

let config = clone(require("./webpack.config.base"));

config.output.path = path.join(config.output.path, "chrome")
config.plugins.push(new GenerateManifestPlugin());
config.plugins.push(new CopyWebpackPlugin([{ "from": "assets/*.png" }]));

module.exports = config;
