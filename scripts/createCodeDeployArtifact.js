var rimraf = require("rimraf");
const fs = require('fs-extra')
const path = require("path")

const root = process.cwd();

const pathToCodeDeployDir = path.join(root, "codeDeploy")
const pathToOutputDir = path.join(root, "output")
const pathToOutputBuildDir = path.join(pathToOutputDir, "build")

const pathToCodeDeployDir_out = path.join(pathToOutputDir, 'codeDeployArtifact')
const pathToBuildCodeDeployDir_out = path.join(pathToCodeDeployDir_out, 'build')

rimraf.sync(pathToCodeDeployDir_out);
console.log(`codeDeployArtifact is deleted!`);

fs.copySync(pathToOutputBuildDir, pathToBuildCodeDeployDir_out)
console.log('build folder copied to codeDeployArtifact');

fs.copySync(pathToCodeDeployDir, pathToCodeDeployDir_out)
console.log('codeDeploy folder contents copied to codeDeployArtifact');
