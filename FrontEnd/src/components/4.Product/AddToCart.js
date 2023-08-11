import { useState, useEffect, useRef, useCallback } from "react";
import { Table, Container, Button, Col, Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from "react-redux";
import {
    getApiVoucher, getInformation,
    requestAlertVoucher, onClickReset
} from '../../actions/24h.action'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import AlertInformation from '../alertInfor'


const AddToCart = (ArrProduct) => {
    const dispatch = useDispatch();
    const { pending, voucherIs, error2 } = useSelector((reduxData) => reduxData.ReducerOne)

    const [Data, setStored] = useState([])
    const [rerender, setRerender] = useState(false);
    const [c1, setC1] = useState(false)

    // console.log("VoucherHi", voucherIs);

    useEffect(() => {
        let stored = JSON.parse(localStorage.getItem("products"));
        stored = stored.filter(item => item.qtt > 0)
        localStorage.setItem("products", JSON.stringify(stored))
        setStored(stored)
    }, [rerender])



    const filteredArr = Data.reduce((acc, current) => {
        const x = acc.find(item => item.price === current.price);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    const [cong, setCong] = useState(1)
    const clickCong = (item) => {
        const foundIndex = filteredArr.indexOf(item) // lấy được chỉ số của nó trong man
        filteredArr[foundIndex].qtt += 1
        console.log(filteredArr);
        setCong(item.qtt)
        localStorage.setItem("products", JSON.stringify(filteredArr))
        setRerender(!rerender)
        clickUpdate(filteredArr)
        dispatch(onClickReset())
    }

    const clickTru = (item) => {
        const foundIndex = filteredArr.indexOf(item) // lấy được chỉ số của nó trong man
        filteredArr[foundIndex].qtt -= 1
        console.log(filteredArr);
        setCong(item.qtt)
        localStorage.setItem("products", JSON.stringify(filteredArr))
        setRerender(!rerender)
        clickUpdate(filteredArr)
        dispatch(onClickReset())
    }
    const [A2, setA2] = useState(false)
    const clickRemove = (item) => {
        let foundIndex = filteredArr.indexOf(item)
        let x = filteredArr[foundIndex]
        let filteredArrOne = filteredArr.filter((item) => {
            return item !== x
        })
        localStorage.setItem("products", JSON.stringify(filteredArrOne))
        setRerender(!rerender)
        setA2(!A2)
        dispatch(onClickReset())
    }
    const [voucher, setVoucher] = useState(0)
    const [Subtotal, setSubtotal] = useState(0)
    const [Discount, setDiscount] = useState(0)
    const [Total, setTotal] = useState(0)

    let RefTamTinh = useRef("")
    let RefMaGiamGia = useRef("")
    let RefGiamGia = useRef("")
    let RefThanhTien = useRef("")

    //const [objectInfor, setObject] = useState(null)

    let voucherData = {
        tamTinh: "0₫",
        maGiamGia: "Not available",
        giamGia: "0%",
        thanhTien: "0₫"
    }

    const [reFresh, setRefresh] = useState(false)
    const clickUpdate = (arr) => {
        let sum = 0
        setRerender(!rerender)
        const x = arr.forEach((item) => {
            sum += item.price * item.qtt
            return sum
        })
        setSubtotal(sum)
        dispatch(getApiVoucher(voucherCode))

        setRefresh(!reFresh)
    }
    const [voucherCode, setvoucherCode] = useState("")

    useEffect(() => {
        voucherData = {
            tamTinh: RefTamTinh.current.innerHTML,
            maGiamGia: RefMaGiamGia.current.innerHTML,
            giamGia: RefGiamGia.current.innerHTML,
            thanhTien: RefThanhTien.current.innerHTML
        }
        //console.log(voucherData);
        dispatch(getApiVoucher(voucherCode))
        localStorage.setItem("dataVoucher", JSON.stringify(voucherData))
    }, [reFresh, voucherCode])



    // useEffect(() => {
    //     console.log("mang", voucherData);
    //     // setObject(voucherData)
    //     localStorage.setItem("dataVoucher", JSON.stringify(voucherData))
    // }, [reFresh])





    const [disApply, setDisApply] = useState(false)
    const [showOkVoucher, setShowVoucher] = useState(null)
    const [showInvalid, setShowInvalid] = useState(null)


    const getVoucherCode = (e) => {
        setvoucherCode(e.target.value.trim().toUpperCase())
        //dispatch(getApiVoucher(e.target.value.trim().toUpperCase()))
        if (e.target.value.trim() == "") {
            setDisApply(false)
            setShowVoucher(false)
            setShowInvalid(false)
            setDiscount(0)
        }
    }


    const clickApplyVoucher = () => {
        dispatch(getApiVoucher(voucherCode))
    }


    useEffect(() => {
        if (voucherIs && voucherCode !== "") {
            setDiscount(Number(voucherIs.percent))
            setShowVoucher(true)
            setShowInvalid(false)
        }
        else if (!voucherIs && voucherCode !== "") {
            setDiscount(0)
            setShowVoucher(false)
            setShowInvalid(true)
        } else if (!voucherIs && voucherCode == "") {
            setShowVoucher(false)
            setShowInvalid(false)
        }

    }, [voucherIs])



    const [alertInforEff, setAlertInforEff] = useState(false)
    const [alertInfor, setAlertInfor] = useState(true)

    const clickProced = () => {
        window.location.href = "/thanhtoan"
    }

    useEffect(() => {
        //console.log(voucherData.thanhTien);
        if (voucherData.thanhTien == "0₫") {
            setAlertInfor(true)
        }
        if (voucherData.thanhTien !== "0₫") {
            setAlertInfor(false)
        }
    }, [reFresh])


    return (
        <Container xs={12} style={{ marginTop: "120px", marginBottom: "370px" }}>
            <Breadcrumbs aria-label="breadcrumb" className="mt-5 mb-3">
                <Link underline="hover" color="inherit" href="/">
                    Trang chủ
                </Link>
                <Link underline="hover" color="inherit" href="/products">
                    Tất cả sản phẩm
                </Link>
                <Typography color="text.primary"><b>Trang giỏ hàng</b></Typography>
            </Breadcrumbs>

            <h1 className="mt-3" style={{ fontFamily: "Montserrat" }}>Trang giỏ hàng</h1>
            <Table xs={12} bordered className="mt-3 rounded border" id="tableAddToCart">
                <thead style={{ backgroundColor: "#F5F5F5" }}>
                    <tr>
                        <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Mặt hàng</th>
                        <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Đơn giá</th>
                        <th className="fontThead" id="slcolumn" style={{ fontFamily: "Montserrat" }}>Số lượng</th>
                        <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Tổng cộng</th>
                        <th className="fontThead" style={{ fontFamily: "Montserrat" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArr.map((item, index) => {
                        return <tr key={index}>
                            <td className="col-sm-4 col-xs-3 text-start border fontTbody" style={{ height: "50px" }}><img src={item.img} width="20%" /><b> {item.model} </b></td>
                            <td className="col-sm-2 col-xs-2 fontTbody" ><p><b>{item.price.toLocaleString()}₫</b></p></td>
                            <td className="col-sm-2 col-xs-5 fontTbody" style={{ fontWeight: "bold" }}>
                                <Col className="d-flex justify-content-around col-sm-6 col-xs-6 mx-auto">
                                    <i onClick={() => clickCong(item)} type="button" className="fas fa-plus mt-1"></i>
                                    <Col><p className="fontTbody" style={{ color: "red" }}>{item.qtt}</p></Col>
                                    <i style={{ display: item.qtt > 0 ? "block" : "none" }} onClick={() => clickTru(item)} type="button" className="fas fa-minus mt-1"></i>
                                </Col>
                            </td>
                            <td className="col-sm-2 col-xs-2 fontTbody" style={{ color: "red", fontWeight: "bold" }}><p>{(item.price * item.qtt).toLocaleString()}₫</p></td>
                            <td ><i type="button" onClick={() => clickRemove(item)} id="iconRemove" className="fas fa-trash-alt"></i></td>
                        </tr>
                    })}
                </tbody>
            </Table>

            <Container className="d-flex justify-content-around">
                <Col className="text-start">
                    <h6 className="fontsizeCart" type="button"><a href="/products" style={{ color: "gray", textDecorationLine: "none", fontFamily: "Montserrat" }}>Tiếp tục mua sắm</a></h6>
                </Col>
                <Col className="text-end">
                    <h6 className="fontsizeCart" onClick={() => clickUpdate(filteredArr)} style={{ color: "gray", fontFamily: "Montserrat" }} type="button">Cập nhật giỏ hàng</h6>
                </Col>
            </Container>
            <hr></hr>

            <Col sm={12} xs={6} className="d-flex justify-content-center">
                <Col sm={6} xs={6} className="cartWeb" >
                    <Col sm={12}>
                        <h5 className="text-center mb-3" style={{ fontFamily: "Montserrat" }}>Mã giảm giá</h5>
                    </Col>
                    <Col sm={12} className="d-flex justify-content-start cartWeb">
                        <Col className="col-sm-8">
                            <Input autoComplete="off" type="text" valid={showOkVoucher} invalid={showInvalid} onChange={getVoucherCode}></Input>
                        </Col>
                        <Col className="col-sm-2">
                            <Button onClick={clickApplyVoucher}
                                //disabled={disApply}
                                style={{
                                    backgroundColor: "#101010",
                                    marginLeft: "5px", borderRadius: "0", maxHeight: "38px",
                                    maxWidth: "90px", fontFamily: "Montserrat", width: "90px"
                                }}>
                                Apply</Button>
                        </Col>
                    </Col>
                </Col>

                <Col sm={6} xs={6}>
                    <Col className="cartWeb">
                        <Col><h5 className="mb-3" style={{ fontFamily: "Montserrat" }}>Giỏ hàng</h5></Col>
                        <Col className="d-flex justify-content-around">
                            <Col>
                                <h6 className="text-start fontTbody" style={{ fontFamily: "Montserrat" }}>Tạm tính</h6>
                            </Col>
                            <Col>
                                <h6 ref={RefTamTinh} className="text-end" style={{ color: "red", fontFamily: "Montserrat" }}>{Subtotal.toLocaleString()}₫</h6>
                            </Col>
                        </Col>


                        <Col className="d-flex justify-content-around">
                            <Col>
                                <h6 className="text-start fontTbody" style={{ fontFamily: "Montserrat" }}>Mã giảm giá</h6>
                            </Col>
                            <Col>
                                <h6 ref={RefMaGiamGia} className="text-end" style={{ color: "red", fontFamily: "Montserrat" }}>
                                    {!voucherIs ? "Not available" : voucherIs.voucherCode}
                                </h6>
                            </Col>
                        </Col>


                        <Col className="d-flex justify-content-around">
                            <Col>
                                <h6 className="text-start" style={{ fontFamily: "Montserrat" }}>Giảm giá</h6>
                            </Col>
                            <Col>
                                <h6 ref={RefGiamGia} className="text-end" style={{ color: "red", fontFamily: "Montserrat" }}>{error2 == false ? Discount : 0}%</h6>
                            </Col>
                        </Col>
                        <hr className="cartWeb"></hr>
                        <Col className="d-flex justify-content-around">
                            <Col>
                                <h6 className="text-start" style={{ fontFamily: "Montserrat" }}>Thành tiền</h6>
                            </Col>
                            <Col>
                                <h6 className="text-end"
                                    ref={RefThanhTien}
                                    style={{ color: "red", fontFamily: "Montserrat" }}>
                                    {error2 == false ? (Subtotal - Discount * Subtotal / 100).toLocaleString() : Subtotal.toLocaleString()}₫</h6>
                            </Col>
                        </Col>
                    </Col>

                    <hr className="cartWeb"></hr>
                    <Col sm={12} xs={12} className="cartWeb">
                        <Button onClick={clickProced} className="col-sm-12 col-xs-12 mt-3"
                            disabled={alertInfor}
                            style={{
                                backgroundColor: "#101010", borderRadius: "0", fontFamily: "Montserrat",
                                height: "37px", maxHeight: "37px", width: "348px", maxWidth: "636px"
                            }}>Continue</Button>
                        {alertInfor ? <AlertInformation /> : []}
                    </Col>
                </Col>
            </Col>
            {/*show on mobile  */}

            <Container xs={12}>
                <Col sm={12} xs={12} >
                    {/* <Col sm={12}>
                        <h5 className="text-center" style={{ fontFamily: "Montserrat" }}>Mã giảm giá</h5>
                    </Col> */}
                    <Col sm={12} xs={12} className="d-flex justify-content-start">
                        <Col className="col-sm-8 col-xs-9 text-start  offMobile">
                            <Input autoComplete="off" type="text" valid={showOkVoucher} invalid={showInvalid} onChange={getVoucherCode}></Input>
                        </Col>
                        <Col className="col-sm-2 col-xs-2 text-end  offMobile">
                            <Button onClick={clickApplyVoucher}
                                style={{
                                    fontSize: "15px", backgroundColor: "#101010", marginLeft: "5px",
                                    borderRadius: "0", maxHeight: "38px", height: "38px", maxWidth: "90px", fontFamily: "Montserrat", width: "90px"
                                }}>
                                Apply</Button>
                            {/* <Spinner animation="border" size="sm" style={{ marginLeft: "-250px", marginRight: "-100px" }} /> */}

                        </Col>
                    </Col>
                </Col>

                <Col xs={12}>
                    <Col>
                        {/* <Col><h5 style={{ fontFamily: "Montserrat" }}>Giỏ hàng</h5></Col> */}
                        <Col className="d-flex justify-content-around  ">
                            <Col className="offMobile">
                                <h6 className="text-start mt-2" style={{ fontFamily: "Montserrat", fontSize: "15px" }}>Tạm tính</h6>
                            </Col>
                            <Col className="offMobile">
                                <h6 className="text-end mt-2" style={{ color: "red", fontFamily: "Montserrat", fontSize: "15px" }}>{Subtotal.toLocaleString()}₫</h6>
                            </Col>
                        </Col>
                        <Col className="d-flex justify-content-around ">
                            <Col className="offMobile">
                                <h6 className="text-start" style={{ fontFamily: "Montserrat", fontSize: "15px" }}>Giảm giá</h6>
                            </Col>
                            <Col className="offMobile">
                                <h6 className="text-end" style={{ color: "red", fontFamily: "Montserrat", fontSize: "15px" }}>{error2 == false ? Discount : 0}%</h6>
                            </Col>
                        </Col>
                        <hr className="offMobile"></hr>
                        <Col className="d-flex justify-content-around  offMobile">
                            <Col className="offMobile">
                                <h6 className="text-start" style={{ fontFamily: "Montserrat", fontSize: "15px" }}>Thành tiền</h6>
                            </Col>
                            <Col className="offMobile">
                                <h6 className="text-end"
                                    style={{ color: "red", fontFamily: "Montserrat", fontSize: "15px" }}>
                                    {error2 == false ? (Subtotal - Discount * Subtotal / 100).toLocaleString() : Subtotal.toLocaleString()}₫</h6>
                            </Col>
                        </Col>
                    </Col>

                    <hr className="offMobile"></hr>
                    <Col sm={12} xs={12}>
                        <Button onClick={clickProced} className="col-sm-12 col-xs-12 mt-3 offMobile"
                            disabled={alertInfor}
                            style={{
                                fontSize: "15px", backgroundColor: "#101010", borderRadius: "0", fontFamily: "Montserrat",
                                height: "37px", maxHeight: "37px", width: "348px", maxWidth: "636px"
                            }}>Continue</Button>
                        {/* {alertInfor ? <AlertInformation /> : []} */}
                    </Col>
                </Col>
            </Container>



        </Container >
    )
}
export default AddToCart

