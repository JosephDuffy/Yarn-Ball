"use strict";

const path = require("path")
const GenerateSafariPlistPlugin = require("./lib/GenerateSafariPlistPlugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const clone = require("clone")
const baseConfig = require("./webpack.config.base")

const config = clone(baseConfig)

config.output.path = path.join(config.output.path, "Yarn Ball.safariextension")
config.plugins.push(new GenerateSafariPlistPlugin())
config.plugins.push(new CopyWebpackPlugin([{ "from": "src/assets/*.png" }]))

module.exports = config
