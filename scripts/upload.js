const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('../config');
const path = require("path")

console.log(config);

const s3 = new AWS.S3();

const uploadArtifactToS3 = () => {

    const root = process.cwd();
    const artifactPath = path.join(root, "output", config.bundleS3Key)

    const fileContent = fs.readFileSync(artifactPath);

    const params = {
        Bucket: config.bundleBucket,
        Key: config.bundleS3Key,
        Body: fileContent
    };

    console.log('Upload in progress..')

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    }).on('httpUploadProgress', function (progress) {
        var uploaded = parseInt((progress.loaded * 100) / progress.total);
        console.log('Upload completed:', uploaded + "%")
      });;
};

uploadArtifactToS3();