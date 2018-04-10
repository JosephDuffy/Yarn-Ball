# Yarn Ball

[![Greenkeeper badge](https://badges.greenkeeper.io/JosephDuffy/Yarn-Ball.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/JosephDuffy/Yarn-Ball.svg)](https://travis-ci.org/JosephDuffy/Yarn-Ball)
[![David dependencies](https://david-dm.org/JosephDuffy/yarn-ball.svg)](https://david-dm.org/JosephDuffy/yarn-ball)
[![Known Vulnerabilities](https://snyk.io/test/github/josephduffy/yarn-ball/badge.svg)](https://snyk.io/test/github/josephduffy/yarn-ball)

Yarn Ball is a browser extension that replaces [`npm`](https://www.npmjs.com/) commands on webpages with their [`yarn`](https://yarnpkg.com) equivalents. It supports Chrome, Firefox, and Safari.

## Installation

Yarn Ball will be available via the [Chrome Web Store](https://chrome.google.com/webstore/detail/yarn-ball/hnoheojfnfoadajfnopmabmpcgmlkmlg), [Mozilla Addons](https://addons.mozilla.org/it/firefox/addon/yarn-ball), and the Safari Extensions Gallery. The README will be updated with links as they become available.

## Development

To develop Yarn Ball locally run `npm start`, which will start a `webpack` watcher (note that changes to the `manifest.json` file will not be automatically recompiled). Compiled files are output to a `build` directory.

### Chrome

To load in to Chrome use the "Load unpacked extension" option and choose the `build/chrome` directory.

### Firefox

To load in Firefox navigate to "about:debugging" and select "Load Temporary Add-on" and choose the `manifest.json` file inside the `build/chrome` directory.

### Safari

To load in Safari open the "Extension Builder" from the "Developer" menu and add the `build/Yarn Ball.safariextension` directory.

## Feature Roadmap

Down the line I would like to add a configuration page that would provide the following options:

 - [ ] Enable/disable on specific URLs (currently it is only ignored on yarnpkg.com)
 - [ ] Click on a replaced command to copy to the clipboard
 - [ ] Show original command on hover
 - [ ] Ignore `npm install` commands that don't include the save parameter

## Special Thanks

Special thanks to [Joshua Robins](https://joshuarobins3d.com/) for creating the logo for Yarn Ball.

## Licence

Yarn Ball is released under the MIT licence. See the [LICENCE](LICENCE) file for the full licence text.
