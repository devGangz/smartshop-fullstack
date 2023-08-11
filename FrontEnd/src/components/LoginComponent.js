import { Row, Col, Container, Button, Input } from "reactstrap"
import auth from '../firebase.js'
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, } from 'firebase/auth'
import Header from "./1.Header/Header.js";
import Content from "./2.Content/Content.js";
import Footer from "./3.Footer/Footer.js";


import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';



function LoginForm() {

    const [user, setUser] = useState(null)
    const provider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result);
                setUser(result.user)
                window.location.href = "/"
            })
            .catch((error) => {
                // console.log(error);
                setUser(null)
            })
    }

    const signOutGoogle = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
            })
            .catch((error) => {
                // console.log(error);
                setUser(null)
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (loggedUser) => {
            // if (loggedUser) {
            //     console.log("already logged in");
            // } else {
            //     console.log("have not logged in");
            // }
            setUser(loggedUser)
        })
    }, [])

    return (
        user ?
            <>
                <Header />, <Content />, <Footer />
            </>
            :

            <MDBContainer fluid id="loginCSS">
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                <MDBInput placeholder="Email address" wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' id='formControlLg' type='email' size="lg" />
                                <MDBInput placeholder="Password" wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' id='formControlLg' type='password' size="lg" />
                                <Button style={{ backgroundColor: "#212529", width: "173px", maxWidth: "173px", height: "38px", maxHeight: "38px" }} onClick={signInWithGoogle}>Login with Google!!</Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

    )
}

export default LoginForm