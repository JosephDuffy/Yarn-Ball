"use strict";

const fs = require("fs");
const path = require("path");

function GenerateManifestPlugin() {};

GenerateManifestPlugin.prototype.apply = function apply(compiler) {
    compiler.hooks.compilation.tap('GenerateManifest', params => {
        // A modified version of https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/blob/react/utils/generate_manifest.js

        const npmPackage = JSON.parse(fs.readFileSync(path.join(compiler.context, 'package.json'), 'utf8'))
        const sourcePath = path.join(compiler.context, "src/manifest.json");
        const manifest = require(sourcePath);

        manifest.description = npmPackage.description;
        manifest.version = npmPackage.version;

        const outputPath = compiler.options.output.path;
        const outputFile = path.join(outputPath, "manifest.json");

        fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
    });
}

module.exports = GenerateManifestPlugin;
