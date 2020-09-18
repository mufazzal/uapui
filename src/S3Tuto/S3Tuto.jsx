import React from 'react';
const AWS = require('aws-sdk');
const dg = document.getElementById; 

function S3Tuto({session}) {

  return (
    <div className="S3Tuto">
	

          <div>
            Bucket level
            File: <input type="file" id="file"/> <br />
            Bucket: <input type="text" id="bucketName" value="muf-aws-tuto-acl-public-rw"/> <br />
            ACL: <input type="text" id="acl"/> <br />
            Access Id: <input type="text" id="acId" value=""/> <br />
            Secret Key: <input type="text" id="secret" value=""/> <br />
       
            <br />
            <button onClick={() => uploadFile()}>Upload</button>     
            <button onClick={() => getObjectList()}>Get List</button>          
            <button onClick={() => getBucketTags()}>GetBucketTags</button>          
            <button onClick={() => uploadFileWithEncryption()}>Upload enctyped</button>  
            <button onClick={() => uploadFileTAX()}>Upload TAX</button>     

            <br />
            <button onClick={() => doAnonymousUpload()}>Upload Ano</button>     
            <button onClick={() => getObjectListAnonymous()}>Get List Ano</button>   

          </div>

          <div>
            Object level
            Parent Bucket: <input type="text" id="pBucketName" value="muf-aws-tuto-acl-public-rw"/> <br />
            Object Key: <input type="text" id="objKey"/> <br />

            <button onClick={() => getObjectAnonymous()}>Get Object Ano</button>    
            <button onClick={() => getObjectAnonymousTAX()}>Get Object Ano TAX</button>    
            <button onClick={() => doAnonymousDelete()}>Delete Ano</button>     
            
            <button onClick={() => getObjectNamed()}>Get Object Named</button>  
            <button onClick={() => deleteFile()}>delete Object Named</button>     

            <button onClick={() => getObjectSignedUrl()}>GetObject Signed Url</button>        

            <button onClick={() => getObjectSignedUrlForCustManageEncKey()}>Get object - cust manage key</button>          
  

          </div>

    </div>
  );
};


async function getObjectAnonymous() {

  window.open(`http://${document.getElementById("pBucketName").value}.s3.amazonaws.com/${document.getElementById("objKey").value}`, '_blank');

}

async function getObjectAnonymousTAX() {
  window.open(`http://${document.getElementById("pBucketName").value}.s3-accelerate.amazonaws.com/${document.getElementById("objKey").value}`, '_blank');
}

async function doAnonymousDelete() {

  const res = await fetch(`http://${document.getElementById("pBucketName").value}.s3.amazonaws.com/${document.getElementById("objKey").value}`, 
  {method: "DELETE"}).then(res => console.log(res))
}


async function getObjectListAnonymous() {

  const res = await fetch(`http://${document.getElementById("bucketName").value}.s3.amazonaws.com/`, 
  {method: "GET"}).then(res => console.log(res))
}

async function doAnonymousUpload() {

  const res = await fetch(`http://${document.getElementById("bucketName").value}.s3.amazonaws.com/${document.getElementById("file").files[0].name}`, 
  {
    method: "PUT",
    headers: {enctype: "multipart/form-data"},
    body: JSON.stringify({
      file: document.getElementById("file").files[0],
      "x-amz-acl": document.getElementById("acl").value
    })
  }).then(res => console.log(res))
}

async function deleteFile() {
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var params = {
    Bucket: document.getElementById("pBucketName").value,
    Key: document.getElementById("objKey").value
  };
  s3.deleteObject(params)
    .promise()
    .then(res => console.log(res)).catch(rej => console.log(rej))  
}

async function getObjectSignedUrl() {
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var params = {
    Bucket: document.getElementById("pBucketName").value,
    Key: document.getElementById("objKey").value,
    Expires: 60
  };
  var url = s3.getSignedUrl('getObject', params);
  console.log(url)
}

async function getObjectSignedUrlForCustManageEncKey() {
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var params = {
    Bucket: document.getElementById("pBucketName").value,
    Key: document.getElementById("objKey").value,
    SSECustomerAlgorithm : "AES256",
    SSECustomerKey: '12345678901234567890123456789013'    
  };
  s3.getObject(params)
    .promise()
    .then(res => console.log(res, res.Body.toString('utf-8'))).catch(rej => console.log(rej))
  
}

async function getObjectNamed() {
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var params = {
    Bucket: document.getElementById("pBucketName").value,
    Key: document.getElementById("objKey").value
  };
  s3.getObject(params)
    .promise()
    .then(res => console.log(res, res.Body.toString('utf-8'))).catch(rej => console.log(rej))
}

async function getObjectList() {
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var params = {
    Bucket: document.getElementById("bucketName").value
  };
  s3.listObjectsV2(params)
    .promise()
    .then(res => console.log(res)).catch(rej => console.log(rej))
}


async function getBucketTags() {
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var params = {
    Bucket: document.getElementById("bucketName").value
  };
  s3.getBucketTagging(params)
    .promise()
    .then(res => console.log(res)).catch(rej => console.log(rej))
}

async function uploadFileWithEncryption() {

  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var files = document.getElementById("file").files;
  if (!files.length) {
    return alert("Please choose a file to upload first.");
  }

  // Encryption by S3
  // const params = {
  //   Bucket: document.getElementById("bucketName").value,
  //   Key: files[0].name,
  //   Body: files[0],
  //   ServerSideEncryption: "AES256"
  // }

  // Encryption by KMS default S3 master key
  // const params = {
  //   Bucket: document.getElementById("bucketName").value,
  //   Key: files[0].name,
  //   Body: files[0],
  //   ServerSideEncryption: "aws:kms"
  // }  

  // Encryption by KMS customer created master key
  // const params = {
  //   Bucket: document.getElementById("bucketName").value,
  //   Key: files[0].name,
  //   Body: files[0],
  //   ServerSideEncryption: "aws:kms",
  //   SSEKMSKeyId: '1c7ddadc-d49f-43c2-b9fc-e1e1d4eab62e'
  // }  

  //Encryption by customer provided key
  const params = {
    Bucket: document.getElementById("bucketName").value,
    Key: files[0].name,
    Body: files[0],
    SSECustomerAlgorithm : "AES256",
    SSECustomerKey: '12345678901234567890123456789012'
  }    
  s3.upload(params)
    .promise()
    .then(res => console.log(res)).catch(rej => console.log(rej));
}



async function uploadFileTAX() {
  // new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: IdentityPoolId
  // })
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01', useAccelerateEndpoint: true});

  var files = document.getElementById("file").files;
  if (!files.length) {
    return alert("Please choose a file to upload first.");
  }
  const params = {
    Bucket: document.getElementById("bucketName").value,
    Key: files[0].name,
    ACL: "public-read",
    Body: files[0]
  }
  s3.upload(params)
    .promise()
    .then(res => console.log(res)).catch(rej => console.log(rej));
}

async function uploadFile() {
  // new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: IdentityPoolId
  // })
  AWS.config.update({
    credentials: new AWS.Credentials({
      accessKeyId: document.getElementById('acId').value, secretAccessKey: document.getElementById('secret').value
    })
  });
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var files = document.getElementById("file").files;
  if (!files.length) {
    return alert("Please choose a file to upload first.");
  }
  const params = {
    Bucket: document.getElementById("bucketName").value,
    Key: files[0].name,
    ACL: document.getElementById('acl').value,
    Body: files[0]
  }
  s3.upload(params)
    .promise()
    .then(res => console.log(res)).catch(rej => console.log(rej));
}

export default S3Tuto;
