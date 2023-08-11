import { Col, Container, Input, Row } from "reactstrap"
import IconNavBar from "./IconNavBar";
import Logo from "../../Images/icon2.png";
import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import { signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import auth from '../../firebase'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NumberSL from "./numberSP";
import { sendUserToServer, clickSearchValue } from '../../actions/24h.action'
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import SearchResultPage from "../../page/searchResultPage";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Header() {
    //const { listProductSearch } = useSelector((reduxData) => reduxData.ReducerOne)
    //localStorage.removeItem("productsResult")


    const dispatch = useDispatch()
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { nIncart, SearchOK, listProductSearch } = useSelector((reduxData) => reduxData.ReducerOne)


    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    //-----------------------------------------//
    const [user, setUser] = useState(null)
    const provider = new GoogleAuthProvider()
    const signOutGoogle = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
                window.location.href = "/"
            })
            .catch((error) => {
                console.log(error);
                setUser(null)
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (loggedUser) => {
            setUser(loggedUser)
            //console.log("userSend", loggedUser);
            dispatch(sendUserToServer(loggedUser))
        })
    }, [])


    const LoginWithGG = () => {
        window.location.href = "/login"
    }

    const [anchorE4, setAnchorE4] = useState(null);
    const open4 = Boolean(anchorE4);
    const handleClick4 = (event) => {
        setAnchorE4(event.currentTarget);
    };
    const handleClose4 = () => {
        setAnchorE4(null);
    };

    //-----------------------------------------------------------------//



    const [OpenSnack, setOpenSnack] = useState(false)

    const openCart = () => {
        if (nIncart == "0") {

            setOpenSnack(!OpenSnack)
        } else {
            window.location.href = "/cart"
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };
    const [goTo, setGoTo] = useState(false)

    const enterInputValue = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            dispatch(clickSearchValue(e.target.value))
        }
    }

    const [oke, setOke] = useState(false)
    useEffect(() => {
        //console.log("list in header", listProductSearch);
        if (listProductSearch.length > 0) {
            console.log("GGGG", listProductSearch);
            localStorage.setItem("productsResult", JSON.stringify(listProductSearch))
            console.log("DD", listProductSearch);
            window.location.href = "./resultsearch"
        } else { }
    }, [SearchOK])



    return (
        <div className="fixedCSS">
            {/* {renderSearchResult ? <SearchResultPage /> : */}

            <Container fluid className='headerFluidContainer'>
                <Col xs={12} sm={5} md={5} lg={5} id="scroll-container" className='mx-auto'>
                    <p id="scroll-text" className='text-center' style={{ color: "white", fontFamily: "Montserrat", fontSize: "13px", paddingTop: "5px" }}>Enter ABCXYZ to discount 10%</p>
                </Col>
            </Container>
            <Row>
                <Col sm={10}>
                    <header className="Header" style={{ marginTop: "28px" }}>
                        <img src={Logo} id="logoMobile" className="Logo" alt="logo" />
                        <CSSTransition
                            id="menuDrop"
                            in={!isSmallScreen || isNavVisible}
                            timeout={1000}
                            classNames="NavAnimation"
                            unmountOnExit
                        >
                            <nav className="Nav col-sm-12">
                                <a key={1} href="/">Home</a>
                                {/* <a key={2} href="/">Apple</a>
                                <a key={3} href="/">Samsung</a> */}
                                < Input onKeyPress={(e) => enterInputValue(e)} id="inputTimkiem" key={4} placeholder="Tìm kiếm" xs={5} md={6}></Input>

                                {/* <i key={5} onClick={openCart} className="fas fa-cart-plus fa-xl " style={{ color: "white", cursor: "pointer" }}><NumberSL /></i> */}
                                <Stack spacing={1} sx={{ width: "8000%" }}>
                                    <i className="mx-auto fas fa-cart-plus fa-xl" sm={12}
                                        variant="outlined" onClick={openCart}
                                        style={{
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    ><NumberSL /></i>
                                    <Snackbar open={OpenSnack} autoHideDuration={5000} onClose={handleClose}>
                                        <Alert id="alertEmptyCart" onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
                                            Giỏ hàng trống
                                        </Alert>
                                    </Snackbar>
                                </Stack>

                                <Col key={6}>
                                    {
                                        user ?
                                            <>
                                                <img src={user.photoURL} style={{ borderRadius: "5px", width: "30px", height: "30px", cursor: "pointer", marginLeft: "-9rem" }}
                                                    id="basic-button"
                                                    aria-controls={open4 ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open4 ? 'true' : undefined}
                                                    onClick={handleClick4}
                                                ></img>
                                                <Menu
                                                    style={{ marginTop: "20px" }}
                                                    id="basic-menu"
                                                    anchorEl={anchorE4}
                                                    open={open4}
                                                    onClose={handleClose4}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem><h6><b>{user.displayName}</b></h6></MenuItem>
                                                    <MenuItem style={{ fontFamily: "Montserrat" }} onClick={signOutGoogle}>LogOut</MenuItem>
                                                </Menu>
                                            </>
                                            :
                                            <>
                                                <i className="fas fa-user" style={{ color: "white", marginLeft: "-9rem" }}
                                                    id="basic-button"
                                                    aria-controls={open4 ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open4 ? 'true' : undefined}
                                                    onClick={handleClick4}
                                                ></i>
                                                <Menu
                                                    style={{ marginTop: "20px" }}
                                                    id="basic-menu"
                                                    anchorEl={anchorE4}
                                                    open={open4}
                                                    onClose={handleClose4}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem style={{ fontFamily: "Montserrat" }} onClick={LoginWithGG}>LogIn</MenuItem>
                                                </Menu>
                                            </>
                                    }
                                </Col>
                            </nav>
                        </CSSTransition>
                        <button onClick={toggleNav} className="Burger">
                            <i className="fas fa-chevron-circle-down" style={{ color: "white" }}></i>
                        </button>
                    </header>
                </Col>
            </Row>
        </div >
    )
}

export default Header