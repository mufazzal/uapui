import React from 'react';
import { AwsClient } from 'aws4fetch'
const AWS = require('aws-sdk');

function ApiGetwayAuth({session}) {


  return (
    <div className="ApiGetwayAuth">

          <button onClick={() => getUsersNoAuth()}>getUsersNoAuth</button>          
          <br />
		
      {
        session && session.tokens &&
        <div> 
           
          <button onClick={() => getUsersCognitoUserPoolAuth(session)}>By Cognito User Pool</button>          
          <br />

          <button onClick={() => getUsersCognitoIDPAuth(session)}>By Cognito ID Pool for Authenticated User</button>          
          <br />

          <button onClick={() => getUsersCustomAuth(session)}>By Custom Autorizer</button>          
          <br />
   
{/*       <button onClick={() => S3UploadWithCognitoIDPAuth()}>Upload S3 via signature 4 cognito IDP url</button>          
          <br />
          <button onClick={() => DynamoDBQueryWithCognitoIDPAuth()}>Run DynamoDB Query via signature 4 cognito IDP url</button>          
          <br /> 
          */}
        </div>

      }

    </div>
  );
}

const apiGetwayHost = "https://97b9raty16.execute-api.us-east-1.amazonaws.com/beta";

async function getUsersNoAuth() {
  const res = await fetch(apiGetwayHost + '/getUsersUnAuth').then(res => res.json())
  console.log(res)
}

async function getUsersCognitoUserPoolAuth(session) {
  const res = await fetch(apiGetwayHost + '/getUsersCognitoUserAuth', 
    {
      headers: {"Authorization": session.tokens.idToken.jwtToken}
    }).then(res => res.json())
  console.log(res)
}

async function getUsersCustomAuth(session) {
  const res = await fetch(apiGetwayHost + '/getUsersCustomAuth', 
    {
      headers: {"Authorization": session.tokens.accessToken.jwtToken}
    }).then(res => res.json())
  console.log(res)
}

async function getUsersCognitoIDPAuth(session) {
  const idpKeysAndToken = await getUsersIdentityPoolIdValues(session);
  console.log(idpKeysAndToken)

  const aws4Client = new AwsClient({
    accessKeyId: idpKeysAndToken.accessKeyId,     
    secretAccessKey: idpKeysAndToken.secretAccessKey,
    sessionToken: idpKeysAndToken.sessionToken,
    service: 'execute-api',
    region: 'us-east-1'
  });

  // This will work only if the role assign to authenticated user do have proper permussoin to execute this api
  const res = await aws4Client.fetch(apiGetwayHost + '/getUsersIDPAuth').
                                then(res => res.json());
  console.log(res)
}


async function getUsersIdentityPoolIdValues(session) {

  const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:1918fbf6-b033-442c-8ae9-5a0b9b047200',
    Logins: {
      'cognito-idp.us-east-1.amazonaws.com/us-east-1_d8rcMtMXj': session.tokens.idToken.jwtToken
    }
  }, 
  { region: 'us-east-1' });

  const prm = new Promise((res, rej) => {
      credentials.get((error, data) => {
        if (error) {
          rej({error: error.message});
        } else {
          res({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
          })
        }
    });
  })

  return prm;
}

export default ApiGetwayAuth;
