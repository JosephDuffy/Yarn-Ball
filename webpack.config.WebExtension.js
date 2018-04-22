"use strict";

const path = require("path")
const GenerateManifestPlugin = require("./lib/GenerateManifestPlugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const clone = require("clone")
const baseConfig = require("./webpack.config.base")

const config = clone(baseConfig)

config.output.path = path.join(config.output.path, "WebExtension")
config.plugins.push(new GenerateManifestPlugin())
config.plugins.push(new CopyWebpackPlugin([{ "from": "assets/*.png" }]))

module.exports = config
