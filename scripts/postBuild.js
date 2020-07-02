var rimraf = require("rimraf");
const fs = require('fs-extra')
const path = require("path")

const root = process.cwd();

const pathToOutputDir = path.join(root, "output")
const pathToOutputBuildDir = path.join(pathToOutputDir, "build")

const pathToBuildDir = path.join(root, "build")

fs.copySync(pathToBuildDir, pathToOutputBuildDir)
console.log('build folder copied to output/build');

rimraf.sync(pathToBuildDir);
console.log(`Build directorry is deleted!`);
