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

        it("should substitute npm install commands without packages", () => {
            const inputMappings = {
                "npm install": "yarn install",
                "foobar npm install": "foobar yarn install",
                "foobar npm install. package-name": "foobar yarn install. package-name",
                "npm install. package-name": "yarn install. package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with 1 or more packages", () => {
            const inputMappings = {
                "npm install package-name": "yarn add package-name",
                "npm install package-name second-name-2": "yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2": "foobar yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2. package-name": "foobar yarn add package-name second-name-2. package-name",
                "npm install package-name second-name-2. package-name": "yarn add package-name second-name-2. package-name"
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
                "foobar npm install --global package-name second-name-2. package-name": "foobar yarn global add package-name second-name-2. package-name",
                "npm install --global package-name second-name-2. package-name": "yarn global add package-name second-name-2. package-name",
                "npm install --global package-name": "yarn global add package-name",
                // After the packages
                "npm install package-name second-name-2 --global": "yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 --global": "foobar yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 --global. package-name": "foobar yarn global add package-name second-name-2. package-name",
                "npm install package-name second-name-2 --global. package-name": "yarn global add package-name second-name-2. package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -g flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -g package-name": "yarn global add package-name",
                "npm install -g package-name second-name-2": "yarn global add package-name second-name-2",
                "foobar npm install -g package-name second-name-2": "foobar yarn global add package-name second-name-2",
                "foobar npm install -g package-name second-name-2. package-name": "foobar yarn global add package-name second-name-2. package-name",
                "npm install -g package-name second-name-2. package-name": "yarn global add package-name second-name-2. package-name",
                "npm install -g package-name": "yarn global add package-name",
                // After the packages
                "npm install package-name second-name-2 -g": "yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 -g": "foobar yarn global add package-name second-name-2",
                "foobar npm install package-name second-name-2 -g. package-name": "foobar yarn global add package-name second-name-2. package-name",
                "npm install package-name second-name-2 -g. package-name": "yarn global add package-name second-name-2. package-name"
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
                "foobar npm install --save package-name second-name-2. package-name": "foobar yarn add package-name second-name-2. package-name",
                "npm install --save package-name second-name-2. package-name": "yarn add package-name second-name-2. package-name",
                "npm install --save package-name": "yarn add package-name",
                // After the packages
                "npm install package-name second-name-2 --save": "yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 --save": "foobar yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 --save. package-name": "foobar yarn add package-name second-name-2. package-name",
                "npm install package-name second-name-2 --save. package-name": "yarn add package-name second-name-2. package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -S flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -S package-name": "yarn add package-name",
                "npm install -S package-name second-name-2": "yarn add package-name second-name-2",
                "foobar npm install -S package-name second-name-2": "foobar yarn add package-name second-name-2",
                "foobar npm install -S package-name second-name-2. package-name": "foobar yarn add package-name second-name-2. package-name",
                "npm install -S package-name second-name-2. package-name": "yarn add package-name second-name-2. package-name",
                "npm install -S package-name": "yarn add package-name",
                // After the packages
                "npm install package-name second-name-2 -S": "yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 -S": "foobar yarn add package-name second-name-2",
                "foobar npm install package-name second-name-2 -S. package-name": "foobar yarn add package-name second-name-2. package-name",
                "npm install package-name second-name-2 -S. package-name": "yarn add package-name second-name-2. package-name"
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
                "foobar npm install --save-dev package-name second-name-2. package-name": "foobar yarn add --dev package-name second-name-2. package-name",
                "npm install --save-dev package-name second-name-2. package-name": "yarn add --dev package-name second-name-2. package-name",
                "npm install --save-dev package-name": "yarn add --dev package-name",
                // After the packages
                "npm install package-name second-name-2 --save-dev": "yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-dev": "foobar yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-dev. package-name": "foobar yarn add --dev package-name second-name-2. package-name",
                "npm install package-name second-name-2 --save-dev. package-name": "yarn add --dev package-name second-name-2. package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -D flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -D package-name": "yarn add --dev package-name",
                "npm install -D package-name second-name-2": "yarn add --dev package-name second-name-2",
                "foobar npm install -D package-name second-name-2": "foobar yarn add --dev package-name second-name-2",
                "foobar npm install -D package-name second-name-2. package-name": "foobar yarn add --dev package-name second-name-2. package-name",
                "npm install -D package-name second-name-2. package-name": "yarn add --dev package-name second-name-2. package-name",
                "npm install -D package-name": "yarn add --dev package-name",
                // After the packages
                "npm install package-name second-name-2 -D": "yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 -D": "foobar yarn add --dev package-name second-name-2",
                "foobar npm install package-name second-name-2 -D. package-name": "foobar yarn add --dev package-name second-name-2. package-name",
                "npm install package-name second-name-2 -D. package-name": "yarn add --dev package-name second-name-2. package-name"
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
                "foobar npm install --save-optional package-name second-name-2. package-name": "foobar yarn add --optional package-name second-name-2. package-name",
                "npm install --save-optional package-name second-name-2. package-name": "yarn add --optional package-name second-name-2. package-name",
                "npm install --save-optional package-name": "yarn add --optional package-name",
                // After the packages
                "npm install package-name second-name-2 --save-optional": "yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-optional": "foobar yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-optional. package-name": "foobar yarn add --optional package-name second-name-2. package-name",
                "npm install package-name second-name-2 --save-optional. package-name": "yarn add --optional package-name second-name-2. package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -O flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -O package-name": "yarn add --optional package-name",
                "npm install -O package-name second-name-2": "yarn add --optional package-name second-name-2",
                "foobar npm install -O package-name second-name-2": "foobar yarn add --optional package-name second-name-2",
                "foobar npm install -O package-name second-name-2. package-name": "foobar yarn add --optional package-name second-name-2. package-name",
                "npm install -O package-name second-name-2. package-name": "yarn add --optional package-name second-name-2. package-name",
                "npm install -O package-name": "yarn add --optional package-name",
                // After the packages
                "npm install package-name second-name-2 -O": "yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 -O": "foobar yarn add --optional package-name second-name-2",
                "foobar npm install package-name second-name-2 -O. package-name": "foobar yarn add --optional package-name second-name-2. package-name",
                "npm install package-name second-name-2 -O. package-name": "yarn add --optional package-name second-name-2. package-name"
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
                "foobar npm install --save-exact package-name second-name-2. package-name": "foobar yarn add --exact package-name second-name-2. package-name",
                "npm install --save-exact package-name second-name-2. package-name": "yarn add --exact package-name second-name-2. package-name",
                "npm install --save-exact package-name": "yarn add --exact package-name",
                // After the packages
                "npm install package-name second-name-2 --save-exact": "yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-exact": "foobar yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 --save-exact. package-name": "foobar yarn add --exact package-name second-name-2. package-name",
                "npm install package-name second-name-2 --save-exact. package-name": "yarn add --exact package-name second-name-2. package-name"
            }

            checkMappings(inputMappings);
        });

        it("should substitute npm install commands with the -E flag", () => {
            const inputMappings = {
                // Before the packages
                "npm install -E package-name": "yarn add --exact package-name",
                "npm install -E package-name second-name-2": "yarn add --exact package-name second-name-2",
                "foobar npm install -E package-name second-name-2": "foobar yarn add --exact package-name second-name-2",
                "foobar npm install -E package-name second-name-2. package-name": "foobar yarn add --exact package-name second-name-2. package-name",
                "npm install -E package-name second-name-2. package-name": "yarn add --exact package-name second-name-2. package-name",
                "npm install -E package-name": "yarn add --exact package-name",
                // After the packages
                "npm install package-name second-name-2 -E": "yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 -E": "foobar yarn add --exact package-name second-name-2",
                "foobar npm install package-name second-name-2 -E. package-name": "foobar yarn add --exact package-name second-name-2. package-name",
                "npm install package-name second-name-2 -E. package-name": "yarn add --exact package-name second-name-2. package-name"
            }

            checkMappings(inputMappings);
        });
    });
});

