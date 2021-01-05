import React, { useState } from 'react';
import './Signup.css';
import { useFirebaseApp } from 'reactfire';
import axios from 'axios';


const Signup = () => {
    // User State
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        password: '',
        photoUrl: '',
        error: '',
    });

    // onChange function
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: '',
        })
    };
    
    // Import firebase
    const firebase = useFirebaseApp();
   
    
    // Submit function (Create account)
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Sign up code here.
        axios.get('http://random.dog/woof.json').then(result => {
            console.log(result.data)
            user.photoUrl = result.data.url;
        });
        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(result => {
                
                // Update the nickname
                result.user.updateProfile({
                    displayName: user.nickname,
                    photoURL: user.photoUrl
                })

                const myURL = { url: 'http://localhost:3000/' }

                // Send Email Verification and redirect to my website.
                result.user.sendEmailVerification(myURL)
                    .then(() => {
                        setUser({
                            ...user,
                            verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
                        })
                    })
                    .catch(error => {
                        setUser({
                            ...user,
                            error: error.message,
                        })
                    })

                // Sign Out the user.
                firebase.auth().signOut();
            }).catch(error => {
                // Update the error
                setUser({
                    ...user,
                    error: error.message,
                })
            })
    }
    return (
        
        <>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nickname" name="nickname" onChange={handleChange}/><br />
                <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
                <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
                <button type="submit">Sign Up</button>
            </form>
            {user.error && <h4>{user.error}</h4>}
        </>
    )
};

export default Signup;
