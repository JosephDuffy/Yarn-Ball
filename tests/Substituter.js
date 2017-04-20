"use strict";

import { expect } from "chai";
import Substituter from "../src/Substituter";

describe("Substituter", () => {
    const substituter = new Substituter();

    describe("#replaceInstallCommands()", () => {

        function checkMappings(inputMappings) {
            for (let input in inputMappings) {
                const expectedOutput = inputMappings[input];
                const output = substituter.replaceInstallCommands(input);
                expect(output).to.equal(expectedOutput);
            }
        }

        // Install

        it("should substitute npm install commands without packages", () => {
            const inputMappings = {
                "npm install": "yarn install",
                "foobar npm install": "foobar yarn install",
                "foobar npm install. another-package-name": "foobar yarn install. another-package-name",
                "npm install. another-package-name": "yarn install. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with 1 or more packages", () => {
            const inputMappings = {
                "npm install package-name": "yarn add package-name",
                "npm install package-name second-name-2": "yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2": "foobar yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2. another-package-name": "foobar yarn add package-name second-name-2. another-package-name",
                "npm install package-name second-name-2. another-package-name": "yarn add package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        // Global flag

        it("should substitute npm install commands with the --global flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install --global package-name": "yarn global add package-name",
                "npm install --global package-name second-name-2": "yarn global add package-name second-name-2",
                "foobar npm install --global package-name second-name-2": "foobar yarn global add package-name second-name-2",
                "foobar npm install --global package-name second-name-2. another-package-name": "foobar yarn global add package-name second-name-2. another-package-name",
                "npm install --global package-name second-name-2. another-package-name": "yarn global add package-name second-name-2. another-package-name",
                "npm install --global package-name": "yarn global add package-name",
                // After the packages
                "npm install package-name second-name-2 --global": "yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 --global": "foobar yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 --global. another-package-name": "foobar yarn global add package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 --global. another-package-name": "yarn global add package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -g flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -g package-name": "yarn global add package-name",
                "npm install -g package-name second-name-2": "yarn global add package-name second-name-2",
                "foobar npm install -g package-name second-name-2": "foobar yarn global add package-name second-name-2",
                "foobar npm install -g package-name second-name-2. another-package-name": "foobar yarn global add package-name second-name-2. another-package-name",
                "npm install -g package-name second-name-2. another-package-name": "yarn global add package-name second-name-2. another-package-name",
                "npm install -g package-name": "yarn global add package-name",
                // After the packages
                "npm install package-name second-name-2 -g": "yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 -g": "foobar yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 -g. another-package-name": "foobar yarn global add package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 -g. another-package-name": "yarn global add package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        // Save flag

        it("should substitute npm install commands with the --save flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install --save package-name": "yarn add package-name",
                "npm install --save package-name second-name-2": "yarn add package-name second-name-2",
                "foobar npm install --save package-name second-name-2": "foobar yarn add package-name second-name-2",
                "foobar npm install --save package-name second-name-2. another-package-name": "foobar yarn add package-name second-name-2. another-package-name",
                "npm install --save package-name second-name-2. another-package-name": "yarn add package-name second-name-2. another-package-name",
                "npm install --save package-name": "yarn add package-name",
                // After the packages
                "npm install package-name second-name-2 --save": "yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 --save": "foobar yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 --save. another-package-name": "foobar yarn add package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 --save. another-package-name": "yarn add package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -S flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -S package-name": "yarn add package-name",
                "npm install -S package-name second-name-2": "yarn add package-name second-name-2",
                "foobar npm install -S package-name second-name-2": "foobar yarn add package-name second-name-2",
                "foobar npm install -S package-name second-name-2. another-package-name": "foobar yarn add package-name second-name-2. another-package-name",
                "npm install -S package-name second-name-2. another-package-name": "yarn add package-name second-name-2. another-package-name",
                "npm install -S package-name": "yarn add package-name",
                // After the packages
                "npm install package-name second-name-2 -S": "yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 -S": "foobar yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 -S. another-package-name": "foobar yarn add package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 -S. another-package-name": "yarn add package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        // Save dev flag

        it("should substitute npm install commands with the --save-dev flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install --save-dev package-name": "yarn add --dev package-name",
                "npm install --save-dev package-name second-name-2": "yarn add --dev package-name second-name-2",
                "foobar npm install --save-dev package-name second-name-2": "foobar yarn add --dev package-name second-name-2",
                "foobar npm install --save-dev package-name second-name-2. another-package-name": "foobar yarn add --dev package-name second-name-2. another-package-name",
                "npm install --save-dev package-name second-name-2. another-package-name": "yarn add --dev package-name second-name-2. another-package-name",
                "npm install --save-dev package-name": "yarn add --dev package-name",
                // After the packages
                "npm install package-name second-name-2 --save-dev": "yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-dev": "foobar yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-dev. another-package-name": "foobar yarn add --dev package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 --save-dev. another-package-name": "yarn add --dev package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -D flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -D package-name": "yarn add --dev package-name",
                "npm install -D package-name second-name-2": "yarn add --dev package-name second-name-2",
                "foobar npm install -D package-name second-name-2": "foobar yarn add --dev package-name second-name-2",
                "foobar npm install -D package-name second-name-2. another-package-name": "foobar yarn add --dev package-name second-name-2. another-package-name",
                "npm install -D package-name second-name-2. another-package-name": "yarn add --dev package-name second-name-2. another-package-name",
                "npm install -D package-name": "yarn add --dev package-name",
                // After the packages
                "npm install package-name second-name-2 -D": "yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 -D": "foobar yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 -D. another-package-name": "foobar yarn add --dev package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 -D. another-package-name": "yarn add --dev package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        // Save optional flag

        it("should substitute npm install commands with the --save-optional flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install --save-optional package-name": "yarn add --optional package-name",
                "npm install --save-optional package-name second-name-2": "yarn add --optional package-name second-name-2",
                "foobar npm install --save-optional package-name second-name-2": "foobar yarn add --optional package-name second-name-2",
                "foobar npm install --save-optional package-name second-name-2. another-package-name": "foobar yarn add --optional package-name second-name-2. another-package-name",
                "npm install --save-optional package-name second-name-2. another-package-name": "yarn add --optional package-name second-name-2. another-package-name",
                "npm install --save-optional package-name": "yarn add --optional package-name",
                // After the packages
                "npm install package-name second-name-2 --save-optional": "yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-optional": "foobar yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-optional. another-package-name": "foobar yarn add --optional package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 --save-optional. another-package-name": "yarn add --optional package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -O flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -O package-name": "yarn add --optional package-name",
                "npm install -O package-name second-name-2": "yarn add --optional package-name second-name-2",
                "foobar npm install -O package-name second-name-2": "foobar yarn add --optional package-name second-name-2",
                "foobar npm install -O package-name second-name-2. another-package-name": "foobar yarn add --optional package-name second-name-2. another-package-name",
                "npm install -O package-name second-name-2. another-package-name": "yarn add --optional package-name second-name-2. another-package-name",
                "npm install -O package-name": "yarn add --optional package-name",
                // After the packages
                "npm install package-name second-name-2 -O": "yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 -O": "foobar yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 -O. another-package-name": "foobar yarn add --optional package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 -O. another-package-name": "yarn add --optional package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        // Save exact flag

        it("should substitute npm install commands with the --save-exact flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install --save-exact package-name": "yarn add --exact package-name",
                "npm install --save-exact package-name second-name-2": "yarn add --exact package-name second-name-2",
                "foobar npm install --save-exact package-name second-name-2": "foobar yarn add --exact package-name second-name-2",
                "foobar npm install --save-exact package-name second-name-2. another-package-name": "foobar yarn add --exact package-name second-name-2. another-package-name",
                "npm install --save-exact package-name second-name-2. another-package-name": "yarn add --exact package-name second-name-2. another-package-name",
                "npm install --save-exact package-name": "yarn add --exact package-name",
                // After the packages
                "npm install package-name second-name-2 --save-exact": "yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-exact": "foobar yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-exact. another-package-name": "foobar yarn add --exact package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 --save-exact. another-package-name": "yarn add --exact package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -E flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -E package-name": "yarn add --exact package-name",
                "npm install -E package-name second-name-2": "yarn add --exact package-name second-name-2",
                "foobar npm install -E package-name second-name-2": "foobar yarn add --exact package-name second-name-2",
                "foobar npm install -E package-name second-name-2. another-package-name": "foobar yarn add --exact package-name second-name-2. another-package-name",
                "npm install -E package-name second-name-2. another-package-name": "yarn add --exact package-name second-name-2. another-package-name",
                "npm install -E package-name": "yarn add --exact package-name",
                // After the packages
                "npm install package-name second-name-2 -E": "yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 -E": "foobar yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 -E. another-package-name": "foobar yarn add --exact package-name second-name-2. another-package-name",
                "npm install package-name second-name-2 -E. another-package-name": "yarn add --exact package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        // Uninstall

        it("should not substitute npm uninstall commands 0 packages", () => {
            const inputMappings = {
                "npm uninstall": "npm uninstall",
                "foobar npm uninstall": "foobar npm uninstall",
                "foobar npm uninstall. another-package-name": "foobar npm uninstall. another-package-name",
                "npm uninstall. another-package-name": "npm uninstall. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm uninstall commands with 1 or more packages", () => {
            const inputMappings = {
                "npm uninstall package-name": "yarn remove package-name",
                "npm uninstall package-name second-name-2": "yarn remove package-name second-name-2",
                "foobar npm uninstall package-name second-name-2": "foobar yarn remove package-name second-name-2",
                "foobar npm uninstall package-name second-name-2. another-package-name": "foobar yarn remove package-name second-name-2. another-package-name",
                "npm uninstall package-name second-name-2. another-package-name": "yarn remove package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        // Global flag

        it("should substitute npm uninstall commands with the --global flag", () => {
            const inputMappings = {
                // Before the packages
                "npm uninstall --global package-name": "yarn global remove package-name",
                "npm uninstall --global package-name second-name-2": "yarn global remove package-name second-name-2",
                "foobar npm uninstall --global package-name second-name-2": "foobar yarn global remove package-name second-name-2",
                "foobar npm uninstall --global package-name second-name-2. another-package-name": "foobar yarn global remove package-name second-name-2. another-package-name",
                "npm uninstall --global package-name second-name-2. another-package-name": "yarn global remove package-name second-name-2. another-package-name",
                "npm uninstall --global package-name": "yarn global remove package-name",
                // After the packages
                "npm uninstall package-name second-name-2 --global": "yarn global remove package-name second-name-2",
                "foobar npm uninstall package-name second-name-2 --global": "foobar yarn global remove package-name second-name-2",
                "foobar npm uninstall package-name second-name-2 --global. another-package-name": "foobar yarn global remove package-name second-name-2. another-package-name",
                "npm uninstall package-name second-name-2 --global. another-package-name": "yarn global remove package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm uninstall commands with the -g flag", () => {
            const inputMappings = {
                // Before the packages
                "npm uninstall -g package-name": "yarn global remove package-name",
                "npm uninstall -g package-name second-name-2": "yarn global remove package-name second-name-2",
                "foobar npm uninstall -g package-name second-name-2": "foobar yarn global remove package-name second-name-2",
                "foobar npm uninstall -g package-name second-name-2. another-package-name": "foobar yarn global remove package-name second-name-2. another-package-name",
                "npm uninstall -g package-name second-name-2. another-package-name": "yarn global remove package-name second-name-2. another-package-name",
                "npm uninstall -g package-name": "yarn global remove package-name",
                // After the packages
                "npm uninstall package-name second-name-2 -g": "yarn global remove package-name second-name-2",
                "foobar npm uninstall package-name second-name-2 -g": "foobar yarn global remove package-name second-name-2",
                "foobar npm uninstall package-name second-name-2 -g. another-package-name": "foobar yarn global remove package-name second-name-2. another-package-name",
                "npm uninstall package-name second-name-2 -g. another-package-name": "yarn global remove package-name second-name-2. another-package-name"
            }

            checkMappings(inputMappings);
        });

    });

    describe("#replaceConfigCommands()", () => {

        function checkMappings(inputMappings) {
            for (let input in inputMappings) {
                const expectedOutput = inputMappings[input];
                const output = substituter.replaceConfigCommands(input);
                expect(output).to.equal(expectedOutput);
            }
        }

        it("should not substitute npm config set commands with an incorrect number of arguments", () => {
            const inputMappings = {
                "npm config set": "npm config set",
                "npm config set init-license": "npm config set init-license",
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm config set commands with the correct number of parameters", () => {
            const inputMappings = {
                "npm config set init-license MIT": "yarn config set init-license MIT",
                "test test npm config set init-license MIT": "test test yarn config set init-license MIT",
                "npm config set init-license MIT test test. More text": "yarn config set init-license MIT test test. More text",
                "test test npm config set init-license MIT test test. More text": "test test yarn config set init-license MIT test test. More text",
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm c set commands", () => {
            const inputMappings = {
                "npm c set init-license MIT": "yarn config set init-license MIT",
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm set commands", () => {
            const inputMappings = {
                "npm set init-license MIT": "yarn config set init-license MIT",
            }

            checkMappings(inputMappings);
        });
    });

    describe("#replaceLinkCommands()", () => {

        function checkMappings(inputMappings) {
            for (let input in inputMappings) {
                const expectedOutput = inputMappings[input];
                const output = substituter.replaceLinkCommands(input);
                expect(output).to.equal(expectedOutput);
            }
        }

        it("should substitute npm link commands", () => {
            const inputMappings = {
                "npm link": "yarn link",
                "npm link package-name": "yarn link package-name",
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm ln commands", () => {
            const inputMappings = {
                "npm link": "yarn link",
                "npm link package-name": "yarn link package-name",
            }

            checkMappings(inputMappings);
        });
    });

});

