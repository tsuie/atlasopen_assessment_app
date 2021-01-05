import React, { useEffect, useState } from "react";

//HINT https://github.com/FirebaseExtended/reactfire
import { useUser, useFirestoreCollectionData, useFirestore } from 'reactfire';
import Logout from './Logout';
import 'firebase/auth'

//HINT
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import {TextField, IconButton, Grid, Typography, Avatar} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

export default function Chat() {
    
    // TODO: Display messages from chat and submit messages
    const user = useUser();
    const messageRef = useFirestore().collection('messages');
    const { status, data } = useFirestoreCollectionData(messageRef);
    console.log(user.photoURL)
    return (
        <div>
            <Typography variant="h3" component="h4">Chat Page</Typography>
            <Grid
                container
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item md={12}>
                    <Avatar alt={user.displayName} src={user.photoURL} />
                </Grid>
                <Grid item md={12}>
                    <Typography variant="body1" component="h5">Welcome {user.displayName} </Typography>
                </Grid>
            </Grid>
            <Grid container 
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item md={12}>
                    <TextField onChange={(e) => console.log(e.target.value)} placeholder={'Enter Message'}/>
                </Grid>
                <Grid item md={12}>
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
