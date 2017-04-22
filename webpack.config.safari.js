"use strict";

const path = require("path");
const GenerateSafariPlistPlugin = require("./lib/GenerateSafariPlistPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const clone = require("clone");

let config = clone(require("./webpack.config.base"));

config.output.path = path.join(config.output.path, "Yarn Ball.safariextension")
config.plugins.push(new GenerateSafariPlistPlugin());
config.plugins.push(new CopyWebpackPlugin([{ "from": "assets/*.png", "to": "" }]));

module.exports = config;
