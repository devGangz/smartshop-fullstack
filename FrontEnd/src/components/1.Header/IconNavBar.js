import { Col, Container } from "reactstrap"
import '@fortawesome/fontawesome-free/css/all.min.css';
import auth from '../../firebase'
import { signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';
import FormLogin from '../LoginComponent'
import Header from "./Header";
import Content from "../2.Content/Content";
import Footer from "../3.Footer/Footer";
import siteProps from '../4.Product/PropsProducts'
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import "./Header.css";


function IconNavBar() {
    const [user, setUser] = useState(null)
    const provider = new GoogleAuthProvider()
    const signOutGoogle = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
            })
            .catch((error) => {
                console.log(error);
                setUser(null)
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (loggedUser) => {
            setUser(loggedUser)
        })
    }, [])

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (

        user ?
            <Col>
                <button className="text-end"
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    Logout
                </button>
                <Popper

                    className="col-sm-1"
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-end"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                        // style={{
                        //     transformOrigin:
                        //         placement === 'bottom-end' ? 'right top' : 'right bottom',
                        // }}
                        >
                            <Paper >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                        <MenuItem onClick={handleClose}>
                                            <img src={user.photoURL} style={{ borderRadius: "5px", width: "30px", height: "30px" }}></img>
                                            <h6 className=" m-3"><b>{user.displayName}</b></h6>
                                        </MenuItem>
                                        <button onClick={signOutGoogle}>Logout</button>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>

                {/* 
                < Col sm={1} >
                    <img src={user.photoURL} style={{ borderRadius: "50px", width: "50px", height: "50px", marginRight: "-50px" }}></img>
                </Col >
                <Col sm={2} style={{ marginTop: "35px", marginRight: "-20px" }} >
                    <h6>{user.displayName}</h6>
                </Col>
                <Col sm={1}>
                    <a href={siteProps[2].url}><i className="fas fa-cart-plus fa-lg "></i></a>
                </Col>
                <Col sm={2}>
                    <Button className="btn-sm" style={{ height: "31px", maxHeight: "31px", width: "80px", maxWidth: "80px" }} onClick={signOutGoogle} >Log out</Button>
                </Col> */}
            </Col >
            :
            <Col>
                <a href="/login" style={{ textDecoration: "none", color: "white" }}> <h6>Login</h6></a>
            </Col>
    )
}

export default IconNavBar