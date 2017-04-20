# Yarn Ball
[![David dependencies](https://img.shields.io/david/josephduffy/yarn-ball.svg)]()

Yarn Ball is a Chrome extension that replaces `npm` commands on webpages with their `yarn` equivalents. The replacements are performed as per Yarn's [CLI commands comparison](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison).

## Development

To develop Yarn Ball locally run `npm start`, which will start a `webpack` watcher (note that changes to the manifest.json file will not be automatically recompiled). Compiled files are output to a `build` directory. To load in to Chrome use the "Load unpacked extension" option and choose the `build` directory.

## Licence

Yarn Ball is released under the MIT licence. See the [LICENCE](LICENCE) file for the full licence text.
