import React from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'
import { Button, Grid } from "@material-ui/core";

const Logout = () => {
    // Import firebase
    const firebase = useFirebaseApp();

    // Log out function
    const handleClick = () => {
        firebase.auth().signOut();
    }

    return (
        <Grid item={true} md={12}>
            <Button variant="contained" onClick={handleClick}>Log Out</Button>
        </Grid>
    )
};

export default Logout;
