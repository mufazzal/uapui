var rimraf = require("rimraf");
const fs = require('fs-extra')
const path = require("path")
var archiver = require('archiver');

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




var output = fs.createWriteStream(pathToOutputDir + '/codeDeployArtifactFinal.zip');
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
 
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
 
output.on('end', function() {
  console.log('Data has been drained');
});
 
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
  } else {
    throw err;
  }
});
 
archive.on('error', function(err) {
  throw err;
});
 
archive.pipe(output);

archive.directory(pathToCodeDeployDir_out, false);
 
// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();
