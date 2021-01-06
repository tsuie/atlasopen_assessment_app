import React, { useEffect, useState } from "react";
import 'firebase/auth'
//HINT https://github.com/FirebaseExtended/reactfire
import { useUser, useFirestoreCollectionData, useFirestore, useFirestoreDocData } from 'reactfire';
import Logout from './Logout';


//HINT
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import {TextField, IconButton, Grid, Typography, Avatar} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

export default function Chat() {
    
    // TODO: Display messages from chat and submit messages
    const firestore = useFirestore();
    const user = useUser();
    const messagesCollection = firestore.collection('messages');
    
    
    return (
        <div style={{width: '300px', margin: '0px auto'}}>
            <Typography variant="h3" component="h4">Chat Page</Typography>
            <Grid
                container
                spacing={1}
            >
                <Grid item lg={3} >
                    <Avatar alt={user.displayName} src={user.photoURL} />
                </Grid>
                <Grid item lg={9}>
                    <Typography variant="body1" component="h5">Welcome {user.displayName} </Typography>
                </Grid>
            </Grid>
            <Grid container 
                justify="center"
                spacing={1}
            >
                <Grid item md={6} >
                    <TextField onChange={(e) => console.log(e.target.value)} placeholder={'Enter Message'}/>
                </Grid>
                <Grid item md={6}>
                    <IconButton aria-label="delete" color="primary">
                        <SendIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <hr />
            <Logout />
        </div>
    )

}
