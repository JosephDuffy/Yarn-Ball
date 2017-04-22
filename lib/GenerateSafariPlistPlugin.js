"use strict";

const fs = require("fs");
const path = require("path");
const plist = require("plist");

function GenerateSafariPlistPlugin() {};

GenerateSafariPlistPlugin.prototype.apply = function apply(compiler) {
    compiler.plugin("done", function(compilation) {
        const sourcePath = path.join(compiler.context, "Info.plist");
        const infoPlistContents = fs.readFileSync(sourcePath, "utf8");
        let infoPlist = plist.parse(infoPlistContents);

        infoPlist["Description"] = process.env.npm_package_description;
        infoPlist["ExtensionInfoDictionaryVersion"] = process.env.npm_package_version;
        delete infoPlist.icons;

        const outputPath = compiler.options.output.path;
        const outputFile = path.join(outputPath, "Info.plist");

        fs.writeFileSync(outputFile, plist.build(infoPlist));
    });
}

module.exports = GenerateSafariPlistPlugin;
