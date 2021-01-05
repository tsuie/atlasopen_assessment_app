import React, { useEffect, useState } from "react";

//HINT https://github.com/FirebaseExtended/reactfire
import { useUser, useFirestoreCollectionData, useFirestore } from 'reactfire';
import Logout from './Logout';
import 'firebase/auth'

//HINT
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import {TextField, Button, Grid, Typography} from "@material-ui/core";

export default function Chat() {

    // TODO: Display messages from chat and submit messages

    return (
        <div>
            <h1>Chat Page</h1>

            <Grid container>
                <Grid item={true} md={12}>
                    <TextField onChange={(e) => console.log(e.target.value)}/>
                </Grid>
                <Grid item={true} md={12}>
                    <Button variant="contained">Submit</Button>
                </Grid>
            </Grid>

            <Logout />
        </div>
    )

}
