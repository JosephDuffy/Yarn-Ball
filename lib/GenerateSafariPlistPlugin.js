"use strict";

const fs = require("fs");
const path = require("path");
const plist = require("plist");

function GenerateSafariPlistPlugin() {};

GenerateSafariPlistPlugin.prototype.apply = function apply(compiler) {
    compiler.hooks.compilation.tap('GenerateSafariPlist', params => {
        const npmPackage = JSON.parse(fs.readFileSync(path.join(compiler.context, 'package.json'), 'utf8'))
        const sourcePath = path.join(compiler.context, "src/Info.plist");
        const infoPlistContents = fs.readFileSync(sourcePath, "utf8");
        const infoPlist = plist.parse(infoPlistContents);

        infoPlist["Description"] = npmPackage.description
        infoPlist["CFBundleShortVersionString"] = npmPackage.version
        delete infoPlist.icons;

        const outputPath = compiler.options.output.path;
        const outputFile = path.join(outputPath, "Info.plist");

        fs.writeFileSync(outputFile, plist.build(infoPlist));
    });
}

module.exports = GenerateSafariPlistPlugin;
