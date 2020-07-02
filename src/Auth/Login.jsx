import React, {useState} from 'react';
import Amplify, { Auth, Hub, AmazonCognitoIdentity } from 'aws-amplify'
import awsconfig from './configs/awsconfig.json'
import awsauth from './configs/awsauth.json'

function Login({onLogin, session, user, onTokenRefresh}) {
  const [tokenExpirations, setTokenExpirations] = useState({});
  Amplify.configure(awsconfig);
  Auth.configure({ oauth: awsauth })

  Hub.listen("auth", ({ payload: { event, data } }) => {

    switch (event) {
      case "signIn":
        onLogin && onLogin(data)

        setTokenExpirations({
          accessTokenExp: new Date(data.signInUserSession.accessToken.payload.exp * 1000).toLocaleString(),
          idTokenExp: new Date(data.signInUserSession.idToken.payload.exp * 1000).toLocaleString()
        })
        break;
      case "signOut":
        break;
      case "customOAuthState":
    }
  });

 console.log(tokenExpirations)

  return (
    <div className="Login">
        {
            session && session.tokens && user && user.username ? 
            <div>
                User: {user && user.username}   
                <br />

                accessToken: <input type="text" value={session && session.tokens && session.tokens.accessToken.jwtToken} /> 
                Expire: {tokenExpirations && tokenExpirations.accessTokenExp} 
                <br />

                idToken: <input type="text" value={session && session.tokens && session.tokens.idToken.jwtToken} />
                Expire: {tokenExpirations && tokenExpirations.idTokenExp} 
                <br />

                refreshToken: <input type="text" value={session && session.tokens && session.tokens.refreshToken.token} />
                <br />

                <button onClick={() => Auth.signOut()}>Sign Out {user.username}</button>       
            </div>
            :
            <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>  
        }
      <br />
      
    </div>
  );
}


// async function refrestToken() {
//   try {
//     const cognitoUser = await Auth.currentAuthenticatedUser();
//     const currentSession = await Auth.getSignInUserSession();

//     cognitoUser.setSignInUserSession(new AmazonCognitoIdentity.CognitoUserSession({
//       IdToken: new AmazonCognitoIdentity.CognitoIdToken({ IdToken: '' }),
//       AccessToken: new AmazonCognitoIdentity.CognitoAccessToken({ AccessToken: '' }),
//       RefreshToken: new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: '' })
//       }));
      
      

//     await cognitoUser.refreshSession(currentSession.refreshToken).promise().then( res => {
//       console.log('refresh session', res);
//       return res;      
//     });
//   } catch (e) {
//     console.log('Unable to refresh Token', e);
//   }
  
// }

export default Login;
