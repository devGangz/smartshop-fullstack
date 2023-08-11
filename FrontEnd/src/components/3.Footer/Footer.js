import Logo from '../1.Header/Logo'
import a2 from '../../Images/icon2.png'

import { Container, Col, Row } from "reactstrap"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Footer() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorE2, setAnchorE2] = React.useState(null);
    const open2 = Boolean(anchorE2);
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };

    const [anchorE3, setAnchorE3] = React.useState(null);
    const open3 = Boolean(anchorE3);
    const handleClick3 = (event) => {
        setAnchorE3(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorE3(null);
    };

    return (
        <Container id="footerTotal FooterFixed" fluid style={{ backgroundColor: "#101010", marginTop: "10px", marginBottom: "-1" }}>
            <Container xs={12} className='d-flex justify-content-center ' id="footerLayout">
                <Col>
                    <img className='mt-3 mx-auto' id="iconBottom" src={a2} width="10%"></img>
                    <p style={{ fontFamily: "Montserrat", color: "white", marginBottom: "1px", fontSize: "15px" }} className='text-center mt-3'>Kết nối với chúng tôi</p>
                    <Col sm={2} xs={6} className="d-flex justify-content-around mx-auto mt-4">
                        <i className="fab fa-facebook fa-xl" style={{ color: "white" }}></i>  &nbsp;&nbsp;
                        <i className="fab fa-instagram-square fa-xl" style={{ color: "white" }} ></i> &nbsp;&nbsp;
                        <i className="fab fa-youtube fa-xl" style={{ color: "white" }}></i> &nbsp;&nbsp;
                        <i className="fab fa-twitter-square fa-xl" style={{ color: "white" }}></i>
                    </Col>
                    <hr style={{ color: "gray" }}></hr>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={2} xs={4} >
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ fontSize: "12px", color: "white" }}
                            >
                                Chính sách
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem style={{ fontFamily: "Montserrat" }} onClick={handleClose}>Thu cũ đổi mới </MenuItem>
                                <MenuItem style={{ fontFamily: "Montserrat" }} onClick={handleClose}>Chính sách giao hàng</MenuItem>
                                <MenuItem style={{ fontFamily: "Montserrat" }} onClick={handleClose}>Chính sách mua hàng</MenuItem>
                            </Menu>
                        </Col>
                        <Col sm={2} xs={4} className='mx-auto'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick2}
                                style={{ fontSize: "12px", color: "white" }}
                            >
                                Sản phẩm
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorE2}
                                open={open2}
                                onClose={handleClose2}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}

                            >
                                <MenuItem style={{ fontFamily: "Montserrat" }} onClick={handleClose2}>Chính sách bảo hành</MenuItem>
                                <MenuItem style={{ fontFamily: "Montserrat" }} onClick={handleClose2}>Chính sách hoàn tiền</MenuItem>
                                <MenuItem style={{ fontFamily: "Montserrat" }} onClick={handleClose2}>Chính sách đổi trả</MenuItem>
                            </Menu>
                        </Col>
                        <Col sm={2} xs={4}>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick3}
                                style={{ fontSize: "12px", color: "white" }}
                            >
                                Dịch vụ
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorE3}
                                open={open3}
                                onClose={handleClose3}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose3}>Sửa chữa Iphone</MenuItem>
                                <MenuItem onClick={handleClose3}>Sửa chữa Macbook</MenuItem>
                                <MenuItem onClick={handleClose3}>Sửa chữa Airpod</MenuItem>
                            </Menu>
                        </Col>


                        <Row sm={12} xs={12} style={{ marginBottom: "9px" }}>
                            <p className='text-center' style={{ margin: "0 auto", color: "white", fontFamily: "Montserrat", fontSize: "13px", marginTop: "10px", marginBottom: "-5px" }}>Copyright &copy; <a href="#">SmartShop</a></p>
                        </Row>
                    </Row>


                </Col>

            </Container >
        </Container >
    )
}

export default Footer