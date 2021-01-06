import React, { useEffect, useState } from "react";
import 'firebase/auth'
//HINT https://github.com/FirebaseExtended/reactfire
import { useUser, useFirestoreCollectionData, useFirestore } from 'reactfire';
import Logout from './Logout';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import PetsIcon from '@material-ui/icons/Pets';
//HINT
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import {
    TextField,
    IconButton,
    Grid,
    Avatar,
    Card,
    CardHeader,
    CardContent
} from "@material-ui/core";

import Messagebox from './chat/Messagebox';
import Headbar from '../templates/Headbar';
import _ from 'lodash';



export default function Chat(props) {
    
    // TODO: Display messages from chat and submit messages
    const user = useUser();
    const [mData, setMessageData] = useState("");

    const firestore = useFirestore();

    
    const messagesCollection = firestore.collection('messages');
    const usersCollection = firestore.collection('users');

    const messages = _.sortBy(useFirestoreCollectionData(messagesCollection), 'createdAt');
    const users = useFirestoreCollectionData(usersCollection);

    const { classes } = props;

    useEffect(() => {
        scrollToBottom()
    })
    const scrollToBottom = () => {
        const chatbox = document.getElementById('chatBoxContainer');
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(mData);
        if(mData !== '') {
            
            messagesCollection.doc(uuidv4()).set({
                uid: user.uid,
                message: mData,
                createdAt: firebase.firestore.Timestamp.now()
            })
            setMessageData("")
            scrollToBottom()
        }
    }
    return (
        <div className={classes.container}>
            <Card >
                <CardHeader
                    avatar={
                        <Avatar alt={user.displayName} src={user.photoURL} />
                    }
                    action={
                        <Logout />
                      }
                    title={'Welcome ' + user.displayName}
                    subheader={user.email}
                ></CardHeader>
                <CardContent className={classes.chatbox} id="chatBoxContainer">
                    <Messagebox items={messages} users={users}/>
                </CardContent>
            </Card>
           <form onSubmit={handleSubmit}>
            <Grid 
                container 
                spacing={1}
                alignItems="flex-end"
            >
                <Grid item xs={11} >
                    <TextField 
                        onChange={(e) => setMessageData(e.target.value)} 
                        name="message" 
                        placeholder={'Enter Message'} 
                        value={mData}
                        label="Message" 
                        variant="outlined"
                        size="small"
                        className={classes.fullWidthInput}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="delete" color="primary" type={"submit"}>
                        <PetsIcon />
                    </IconButton>
                </Grid>
            </Grid>
            </form>
        </div>
    )

}