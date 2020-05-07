const fs = require('fs');
const packageJsonPath = `${process.cwd()}/package.json`;
const packageInfo = fs.existsSync(packageJsonPath) ? require(packageJsonPath) : {};

class MonitorFunctions {
    static healthChecker() {
        return {
            Application: {
                name: getTitle(),
                version: getVersion()
            },
            Dependencies: process.versions
        };
    }

}

function getVersion() {
    if (packageInfo.version) {
        return packageInfo.version;
    }

    return undefined;
}

function getTitle() {
    if (packageInfo.name) {
        return packageInfo.name;
    }
    return undefined;
}


module.exports = MonitorFunctions;