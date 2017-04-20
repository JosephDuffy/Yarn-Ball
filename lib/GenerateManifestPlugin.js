"use strict";

const fs = require("fs");
const path = require("path");

function GenerateManifestPlugin() {};

GenerateManifestPlugin.prototype.apply = function apply(compiler) {
    compiler.plugin("done", function(compilation) {
        // A modified version of https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/blob/react/utils/generate_manifest.js

        const sourcePath = path.join(compiler.context, "manifest.json");
        let manifest = require(sourcePath);

        manifest.description = process.env.npm_package_description;
        manifest.version = process.env.npm_package_version;

        const outputPath = compiler.options.output.path;
        const outputFile = path.join(outputPath, "manifest.json");

        fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
    });
}

module.exports = GenerateManifestPlugin;
