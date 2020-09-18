import React from 'react';
const AWS = require('aws-sdk');

const apiGetwayHost = "https://6r9702jwrb.execute-api.us-east-1.amazonaws.com/beta";

function SNSTuto({session}) {
  return (
    <div className="SNSFeed">

          <button onClick={() => subscribe(session)}>Subscribe phone and email  </button>          
          TODO: Subscripe to HTTP/LAmda/Sqs ??????
          <br />

          <button onClick={() => unSubscribe(session)}>UnSubscribe phone and email  </button>          
          TODO: Not working properly ??????
          <br />

          <button onClick={() => sendFeed(session)}>sendFeed</button>          
          <br />
		
    </div>
  );
}

async function unSubscribe(session) {
  const res = await fetch(apiGetwayHost + '/unSubscribe', 
    {
      method: "DELETE",
      headers: {"Authorization": session.tokens.idToken.jwtToken},
      body: JSON.stringify({
        phone: "+917387486776",
        email: 'h.mufazzal@gmail.com',
        nonWorkingEmail: 'h.wfsd@asdsd.com'
      })
    }).then(res => res.json())
  console.log(res)
}

async function subscribe(session) {
  const res = await fetch(apiGetwayHost + '/subscribe', 
    {
      method: "PUT",
      headers: {"Authorization": session.tokens.idToken.jwtToken},
      body: JSON.stringify({
        phone: "+917387486776",
        email: 'h.mufazzal@gmail.com'
      })
    }).then(res => res.json())
  console.log(res)
}


async function sendFeed(session) {
  const res = await fetch(apiGetwayHost + '/sendSNSFeed', 
    {
      method: "POST",
      headers: {"Authorization": session.tokens.idToken.jwtToken},
      body: JSON.stringify({
        text: "Hello feed",
        subject: 'sub hello'
      })
    }).then(res => res.json())
  console.log(res)
}


export default SNSTuto;
