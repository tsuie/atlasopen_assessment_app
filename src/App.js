import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Chat from './Chat';
import Logout from './Logout';
import { useUser } from 'reactfire';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';


import { firestore } from 'firebase';
import { v4 as uuidv4 } from 'uuid';

// 

//TODO: Add stats dashboard
function App() {
  const user = useUser();
  const fs = firestore();
  // const uid = uuidv4();
  // const messagesRef = fs.collection('messages').get();
  // messagesRef.then(messages => {
  //   console.log(messages);
  // });
  
  return (
      <div className="App">
        {
          user &&
              <>
              <Router>
                  <Chat/>
              </Router>
              </>
        }
        {
          !user &&
          <>
            <Signup />
            <Login />
          </>
        }
      </div>
  );
}

export default App;
