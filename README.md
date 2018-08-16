# Yarn Ball

[![Mozilla Add-on](https://img.shields.io/amo/v/yarn-ball.svg)](https://addons.mozilla.org/firefox/addon/yarn-ball/)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/hnoheojfnfoadajfnopmabmpcgmlkmlg.svg)](https://chrome.google.com/webstore/detail/yarn-ball/hnoheojfnfoadajfnopmabmpcgmlkmlg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJosephDuffy%2FYarn-Ball.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FJosephDuffy%2FYarn-Ball?ref=badge_shield)

[![Build Status](https://travis-ci.org/JosephDuffy/Yarn-Ball.svg)](https://travis-ci.org/JosephDuffy/Yarn-Ball)
[![Coverage Status](https://coveralls.io/repos/github/JosephDuffy/Yarn-Ball/badge.svg)](https://coveralls.io/github/JosephDuffy/Yarn-Ball)
[![Greenkeeper badge](https://badges.greenkeeper.io/JosephDuffy/Yarn-Ball.svg)](https://greenkeeper.io/)

Yarn Ball is a browser extension that replaces [`npm`](https://www.npmjs.com/) commands on webpages with their [`yarn`](https://yarnpkg.com) equivalents. It supports Chrome, Firefox, and Safari.

## Installation

Yarn Ball is available via the [Chrome Web Store](https://chrome.google.com/webstore/detail/yarn-ball/hnoheojfnfoadajfnopmabmpcgmlkmlg) and [AMO](https://addons.mozilla.org/firefox/addon/yarn-ball). In the future it may be submitted to the Safari Extensions Gallery.

## Development

To run a one-off build run `npm run build`. Alternatively to rebuild when changes are detected run `npm run build:watch`.

This utilises webpack to compile the TypeScript, generate the approriate `manifest.json` and `Info.plist` files, and copy across static assets.

### Firefox

[`web-ext`](https://developer.mozilla.org/Add-ons/WebExtensions/Getting_started_with_web-ext) is recommended when developing on Firefox. This tool will load Yarn Ball in to Firefox and reload it when changes are detected. This can be achieved by running `web-ext run` inside the `build/WebExtension` directory.

Alternatively follow [Mozilla's guide to installing add-ons](https://developer.mozilla.org/Add-ons/WebExtensions/Temporary_Installation_in_Firefox).

### Chrome

Follow the instructions in [Google's getting started tutorial](https://developer.chrome.com/extensions/getstarted) and when prompted for the directory choose the `build/WebExtension` directory.

### Safari

To load in Safari navigate to "Developer" => "Show Extension Builder", click the "+" in the bottom-left, choose "Add Extension..." and select the `build/Yarn Ball.safariextension` directory.

## Feature Roadmap

Down the line I would like to add a configuration page that would provide the following options:

 - [ ] Enable/disable on specific URLs (currently it is only ignored on yarnpkg.com)
 - [ ] Click on a replaced command to copy to the clipboard
 - [ ] Show original command on hover
 - [ ] Ignore `npm install` commands that don't include the save parameter

## Special Thanks

Special thanks to Joshua Robins for creating the logo for Yarn Ball.

## Licence

Yarn Ball is released under the MIT licence. See the [LICENCE file](LICENCE) for the full licence text.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJosephDuffy%2FYarn-Ball.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FJosephDuffy%2FYarn-Ball?ref=badge_large)