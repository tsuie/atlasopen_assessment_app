import React from 'react';
import Signup from './components/nonauth/Signup';
import Login from './components/nonauth/Login';
import Chat from './components/auth/Chat';
import Logout from './components/auth/Logout';
import Verify from './components/auth/Verify'; 
import { useUser } from 'reactfire';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Headbar from './components/templates/Headbar';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    container: {
        maxWidth: '500px', 
        margin: '0px auto'
    },
    chatbox: {
        maxHeight: '400px;',
        overflowY: 'scroll'
    },
    fullWidthInput: {
        width: '100%'
    }
}));
// 

//TODO: Add stats dashboard
function App() {
  const user = useUser();
  const classes = useStyles();
  return (
      <div className="App">
        <div className={classes.container}>
          <Headbar />
          <Router>
            <Switch>
              <Route exact path='/'>
                {user ? 
                  (
                    (!user.emailVerified) ? 
                      (
                        <Redirect to="/verify" />
                      ) :
                      (
                        <Chat classes={classes}/>
                      )
                  ) : (
                <>
                  <Redirect to="login" />
                </>
                )}
              </Route>
              <Route exact path='/signup'>
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <Signup classes={classes}/>
                )}
              </Route>
              <Route exact path='/verify'>
                {user ? (
                 <Verify classes={classes}/>
                ) : (
                <>
                  <Redirect to="login" />
                </>
                )}
              </Route>
              <Route exact path='/logout'>
                <Logout  classes={classes}/>
              </Route>
                
              <Route path='/login'>
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <Login  classes={classes}/>
                )}
              </Route>
              {/* <Route path='/chat'>
                <Chat />
              </Route> */}
            </Switch>
          </Router>
        </div>
        
        {/* {
          user && (
              <>
              
                { (user.emailVerified ? (
                  <Chat/>
                ) : 
                <>
                    <Verify/>
                    <Logout />
                  </>
                ) 
                }
              </>
            )
        }
        {
          !user &&
          <>
            <Signup />
            <Login />
          </>
        } */}
      </div>
  );
}

export default App;
