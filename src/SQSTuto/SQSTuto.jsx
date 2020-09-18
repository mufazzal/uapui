import React from 'react';
const AWS = require('aws-sdk');

const apiGetwayHost = "https://8suou6v4z8.execute-api.us-east-1.amazonaws.com/beta";

function SQSTuto({session}) {
  return (
    <div className="SQSTuto">

          <button onClick={() => createSqsMessages(session)}>createSqsMessages send 5  </button>          
          <br />

          <button onClick={() => createSqsMessagesByUI(session)}>createSqsMessagesByUI  </button>          
          <br />

          <button onClick={() => seeProcessedMessages(session)}>seeProcessedMessages  </button>          
          <br />

    </div>
  );
}

async function createSqsMessages(session) {

  const generateMessageArray = () => {
    const arr = [];
    for (let index = 0; index < 5; index++) 
      arr.push({id: index + '_' + new Date().getTime()})
    
      return arr;
  }

  const res = await fetch(apiGetwayHost + '/pushSqsMessage', 
    {
      method: "POST",
      headers: {"Authorization": session.tokens.idToken.jwtToken},
      body: JSON.stringify({
        sqsJobs: generateMessageArray(),
      })
    }).then(res => res.json())
  console.log(res)
}

async function createSqsMessagesByUI() {

}

async function seeProcessedMessages(session) {
  const res = await fetch(apiGetwayHost + '/getProcessedMessages', 
    {
      method: "GET",
      headers: {"Authorization": session.tokens.idToken.jwtToken},
      body: JSON.stringify({
        text: "Hello feed",
        subject: 'sub hello'
      })
    }).then(res => res.json())
  console.log(res)
}


export default SQSTuto;
