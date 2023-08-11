import { Container, Col, Button, Row, Input } from "reactstrap"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState, useRef } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { FastfoodOutlined } from "@mui/icons-material";

import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { sendInformation } from '../../actions/24h.action'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CheckOutComponent = () => {
    const [CartList, setCartlist] = useState([])
    const [Cost, setCost] = useState({})
    const dispatch = useDispatch();
    const { voucherAndTotal, useGG, datHangThanhCong } = useSelector((reduxData) => reduxData.ReducerOne)

    //console.log("sttDatHang", datHangThanhCong);

    useEffect(() => {
        //Lấy Data và setData
        let Data = JSON.parse(localStorage.getItem("products"));
        const filteredArr = Data.reduce((acc, current) => {
            const x = acc.find(item => item.price === current.price);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        setCartlist(filteredArr)
        let DataV = JSON.parse(localStorage.getItem("dataVoucher"));
        setCost(DataV)
    }, [])

    const [reqLogin, setReqLogin] = useState()
    const [hoTenA, setHotenA] = useState("")
    const [emailA, setEmailA] = useState("")

    useEffect(() => {
        if (useGG !== null) {
            setHotenA(useGG.displayName)
            setEmailA(useGG.email)
            setReqLogin(false)
        } else if (useGG == null) {
            setReqLogin(true)
        }
    }, [useGG])


    const RefHoTen = useRef(null)
    const RefEmail = useRef(null)
    const RefSdt = useRef(null)
    const RefDiaChi = useRef(null)
    const RefGhiChu = useRef(null)

    let HoTen = ""
    let Email = ""
    let SoDienThoai = ""
    let DiaChi = ""
    let GhiChu = ""

    const [checkHoTen, setCheckHoTen] = useState(false)

    const [OpenSnack, setOpenSnack] = useState(false)



    const ClickPlace = () => {

        HoTen = RefHoTen.current.value.trim()
        Email = RefEmail.current.value.trim()
        SoDienThoai = Number(RefSdt.current.value.trim())
        DiaChi = RefDiaChi.current.value.trim()
        GhiChu = RefGhiChu.current.value.trim()
        //console.log(HoTen, Email, SoDienThoai, DiaChi, GhiChu);
        //console.log(Number.isInteger(SoDienThoai), HoTen, Email, SoDienThoai, DiaChi, GhiChu);

        // console.log("CartList", CartList);
        // console.log("cost", Cost);


        if (HoTen == "") {
            RefHoTen.current.focus()
            setOpenSnack(!OpenSnack)
            return
        }
        else if (Email == "") {
            RefEmail.current.focus()
            setOpenSnack(!OpenSnack)
            return
        }
        else if (SoDienThoai == "") {
            RefSdt.current.focus()
            setOpenSnack(!OpenSnack)
            return
        }

        else if (Number.isInteger(SoDienThoai) == false) {
            RefSdt.current.focus()
            setOpenSnack(!OpenSnack)
            return
        }

        else if (DiaChi == "") {
            RefDiaChi.current.focus()
            setOpenSnack(!OpenSnack)
            return
        }

        const Infor = [
            {
                hoTen: HoTen,
                email: Email,
                soDienThoai: SoDienThoai,
                diaChi: DiaChi,
                ghiChu: GhiChu
            }
        ]
        dispatch(sendInformation(CartList, Cost, Infor))
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };

    useEffect(() => {
        if (datHangThanhCong) {
            localStorage.setItem("dataVoucher", JSON.stringify([]))
            localStorage.setItem("products", JSON.stringify([]))
            window.location.href = "/ordersuccess"
        }
    }, [datHangThanhCong])

    // console.log("GG2", hoTenA);
    return (

        <Container style={{ marginTop: "120px", marginBottom: "330px" }}>
            <Breadcrumbs xs={12} aria-label="breadcrumb" className="mt-5 mb-3">
                {/* <Link underline="hover" color="inherit" href="/">
                    Trang chủ
                </Link> */}
                <Link underline="hover" color="inherit" href="/products">
                    Tất cả sản phẩm
                </Link>
                <Link underline="hover" color="inherit" href="/cart">
                    Giỏ hàng
                </Link>
                <Typography color="text.primary"><b>Trang thanh toán</b></Typography>
            </Breadcrumbs>

            <Container>
                <h1 className="mt-3 mb-3" style={{ fontFamily: "Montserrat" }}>Trang thanh toán</h1>
                <Col className="d-flex justify-content-around rounded border">
                    {/* giao dien web */}
                    <Col sm={4} xs={12} className="mb-1">
                        <h5 className="mb-2 mt-3" style={{ fontFamily: "Montserrat" }}>Chi tiết thanh toán</h5>
                        <Col id="chiTietThanhToan">
                            <p className="text-start" style={{ fontFamily: "Montserrat", fontSize: "12px", marginLeft: "70px", marginBottom: "6px" }}>Tên khách hàng</p>
                            <Col sm={8} className="mx-auto">
                                <input required className="form-control inPutCheckOut" ref={RefHoTen} type="text" style={{ width: "260px", fontSize: "12px" }} defaultValue={hoTenA}></input>
                            </Col>

                            <p className="text-start mt-2" style={{ fontFamily: "Montserrat", fontSize: "12px", marginLeft: "70px", marginBottom: "6px" }}>Email</p>
                            <Col sm={8} className="mx-auto">
                                <input className="form-control inPutCheckOut" ref={RefEmail} style={{ width: "260px", fontSize: "12px" }} defaultValue={emailA}></input>
                            </Col>

                            <p className="text-start mt-2" style={{ fontFamily: "Montserrat", fontSize: "12px", marginLeft: "70px", marginBottom: "6px" }}>Số điện thoại</p>
                            <Col sm={8} className="mx-auto">
                                <input className="form-control inPutCheckOut" ref={RefSdt} style={{ width: "260px", fontSize: "12px" }} ></input>
                            </Col>

                            <p className="text-start mt-2" style={{ fontFamily: "Montserrat", fontSize: "12px", marginLeft: "70px", marginBottom: "6px" }}>Địa chỉ giao hàng</p>
                            <textarea ref={RefDiaChi} className="form-control" style={{ marginLeft: "70px", width: "260px", fontSize: "12px", fontFamily: "Montserrat" }} rows={3}></textarea>
                            <p className="text-start mt-2" style={{ fontFamily: "Montserrat", fontSize: "12px", marginLeft: "70px", marginBottom: "6px" }}>Ghi chú </p>
                            <textarea ref={RefGhiChu} className="form-control" style={{ marginLeft: "70px", width: "260px", fontSize: "12px", fontFamily: "Montserrat" }} rows={3}></textarea>

                            <Col className="d-flex justify-content-center mt-3" style={{ width: "260px", marginLeft: "70px" }}>
                                <p style={{ display: reqLogin ? "block" : "none", fontFamily: "Montserrat", fontSize: "15px", marginRight: "15px" }} sm={8}>Bạn chưa đăng nhập?</p>
                                <a style={{ display: reqLogin ? "block" : "none", fontFamily: "Montserrat", fontSize: "15px", }} href="/login">Click here</a>
                            </Col>
                        </Col>
                    </Col>

                    <Col sm={8} className="p-3 showOrderWeb" style={{ backgroundColor: "#F5F5F7" }}>
                        <Table sm={10} bordered className="mt-2 rounded border" id="tableAddToCart">
                            <thead style={{ backgroundColor: "#F5F5F5" }}>
                                <tr>
                                    <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Mặt hàng</th>
                                    <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Đơn giá</th>
                                    <th className="fontThead" id="slcolumn" style={{ fontFamily: "Montserrat" }}>Số lượng</th>
                                    <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Tổng cộng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CartList.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="col-sm-4 col-xs-3 text-start fontTbody" style={{ height: "50px" }}><img src={item.img} width="20%" /><b> {item.model} </b></td>
                                        <td className="col-sm-2 col-xs-2 fontTbody" ><p><b>{item.price.toLocaleString()}₫</b></p></td>
                                        <td className="col-sm-2 col-xs-5 fontTbody" style={{ fontWeight: "bold" }}>
                                            <Col><p className="fontTbody" style={{ color: "red" }}>{item.qtt}</p></Col>
                                        </td>
                                        <td className="col-sm-2 col-xs-2 fontTbody" style={{ color: "red", fontWeight: "bold" }}><p>{(item.price * item.qtt).toLocaleString()}₫</p></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <h6 className="mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Tạm tính: {Cost.tamTinh} </h6>
                        <h6 className="mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Mã giảm giá: {Cost.maGiamGia} </h6>
                        <h6 className="mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Giảm giá: {Cost.giamGia} </h6>
                        <h6 className="mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Tổng cộng: {Cost.thanhTien}</h6>
                    </Col>


                </Col>

                {/* giao dien dien thoai */}
                <Col xs={12} className="p-3 showOrderMobile" style={{ backgroundColor: "#F5F5F7" }}>
                    <Table sm={10} xs={12} bordered className="mt-2 rounded border" id="tableAddToCart">
                        <thead style={{ backgroundColor: "#F5F5F5" }}>
                            <tr>
                                <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Mặt hàng</th>
                                <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Đơn giá</th>
                                <th className="fontThead" id="slcolumn" style={{ fontFamily: "Montserrat" }}>Số lượng</th>
                                <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Tổng cộng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CartList.map((item, index) => {
                                return <tr key={index}>
                                    <td className="col-sm-4 col-xs-3 text-start fontTbody" style={{ height: "50px" }}><img src={item.img} width="20%" /><b> {item.model} </b></td>
                                    <td className="col-sm-2 col-xs-2 fontTbody" ><p><b>{item.price.toLocaleString()}₫</b></p></td>
                                    <td className="col-sm-2 col-xs-5 fontTbody" style={{ fontWeight: "bold" }}>
                                        <Col><p className="fontTbody" style={{ color: "red" }}>{item.qtt}</p></Col>
                                    </td>
                                    <td className="col-sm-2 col-xs-2 fontTbody" style={{ color: "red", fontWeight: "bold" }}><p>{(item.price * item.qtt).toLocaleString()}₫</p></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <h6 className="fontsizeMobile mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Tạm tính: {Cost.tamTinh} </h6>
                    <h6 className="fontsizeMobile mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Mã giảm giá: {Cost.maGiamGia} </h6>
                    <h6 className="fontsizeMobile mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Giảm giá: {Cost.giamGia} </h6>
                    <h6 className="fontsizeMobile mt-3 text-start" style={{ fontFamily: "Montserrat" }}>Tổng cộng: {Cost.thanhTien}</h6>
                </Col>

                <Col sm={12} className=" mt-3 text-center">
                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <Button className="mx-auto" sm={12}
                            variant="outlined" onClick={ClickPlace}
                            style={{
                                borderRadius: "0",
                                backgroundColor: "#101010",
                                width: "350px",
                                maxWidth: "350px",
                                height: "36px",
                                maxHeight: "36px"
                            }}
                        >Đặt hàng</Button>
                        <Snackbar open={OpenSnack} autoHideDuration={1000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                                Kiểm tra lại thông tin đã nhập
                            </Alert>
                        </Snackbar>
                    </Stack>

                </Col>
            </Container>
        </Container >
    )
}

export default CheckOutComponent