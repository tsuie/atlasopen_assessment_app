import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Chat from './Chat';
import Logout from './Logout';
import { useUser } from 'reactfire';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

//TODO: Add stats dashboard
function App() {
  const user = useUser();
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
