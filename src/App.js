import React, { useState } from 'react';
import './App.css';
import Login from './Auth/Login'
import ApiGetwayAuth from './APIGetway/ApiGetwayAuth'
import SNSTuto from './SNSTuto/SNSTuto'
import SQSTuto from './SQSTuto/SQSTuto'


function App() {

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  const onLogin = data => {
    setUser({username: data.username});
    setSession({tokens: data.signInUserSession})
  }
  const onTokenRefresh = data => {
    // setUser({username: data.username});
    // setSession({tokens: data.signInUserSession})
  }
  

  return (
    <div className="App">
      
      -------Login
		  <Login user={user} session={session} user={user} onLogin={onLogin} onTokenRefresh={onTokenRefresh}/>
      <br />
      
      --------ApiGetwayAuth
      <ApiGetwayAuth session={session} />
      <br />

      --------SNSTuto
      <SNSTuto session={session} />
      <br />

      --------SQS
      <SQSTuto session={session} />
      <br />


    </div>
  );
}

export default App;
