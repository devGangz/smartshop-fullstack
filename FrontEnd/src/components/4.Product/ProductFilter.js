import React from 'react';
import { Label, Container, Col, Row, Button } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import BasicAlerts from '../alert'
import '../../App.css';
import { useEffect, useState } from "react"
import { useRef } from "react"
import {
    Clear,
    Getloaisp,
    GetBrand,
    getMaxMinPrice,
    clickFilterProduct,
    getApiProducts
} from "../../actions/24h.action"

import Form from 'react-bootstrap/Form';


const ProductFilter = () => {
    const refMax = useRef(null)
    const refMin = useRef(null)

    const dispatch = useDispatch();
    const {
        brand, loaisp, MaxPrice, MinPrice,
    } = useSelector((reduxData) => reduxData.ReducerOne)

    // Nhóm Click vào giá
    const [MinA, setMinA] = useState(MinPrice)
    const [MaxA, setMaxA] = useState(MaxPrice)

    const onChangeCreateMin = (e) => {
        setMinA(Number(e.target.value))
    }

    const onChangeCreateMax = (e) => {
        setMaxA(Number(e.target.value))
    }

    const [alert, setAlert] = useState(false)
    const FilterGia = () => {
        console.log(MinA);
        console.log(MaxA);
        if (MaxA < MinA || MaxA > MaxPrice || MinA < MinPrice) {
            return setAlert(true)
        }
        dispatch(getMaxMinPrice(MaxA, MinA))
    }

    // Nhóm Tickbox

    const [hangDienThoai, setHangDt] = useState("0")
    const [loaiSanPham, setLoaiSp] = useState("0")

    const [DefaultBrand, SetDefaultBrand] = useState(false)
    const [DefautLoai, SetDefaultLoai] = useState(false)

    const OnChangeGetBrand = (e) => {
        console.log("e", e.target.value);
        setHangDt(e.target.value)
    }
    const OnChangeGetLoaiSp = (e) => {
        setLoaiSp(e.target.value)
    }



    const OnClickFilter = () => {
        FilterGia()
        dispatch(clickFilterProduct(hangDienThoai, loaiSanPham, MaxA, MinA))
    }

    const onClickClear = () => {
        SetDefaultBrand(true)
        SetDefaultLoai(true)
        refMax.current.value = "";
        refMin.current.value = "";
        //dispatch(Clear());
        dispatch(getApiProducts())
    }

    return (
        <>
            <Row>
                <Col sm={3} xs={6} className='d-flex justify-content-around mt-3'>
                    <Form.Select aria-label="Default select example"
                        onChange={OnChangeGetBrand}
                        style={{ borderRadius: "0", fontFamily: "Montserrat" }}>
                        <option defaultChecked={DefaultBrand} value="0">Chọn hãng</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Oppo">Oppo</option>
                        <option value="Nokia">Nokia</option>
                    </Form.Select>
                </Col>
                <Col sm={3} xs={6} className='d-flex justify-content-around mt-3' >
                    <Form.Select aria-label="Default select example"
                        onChange={OnChangeGetLoaiSp}
                        style={{ borderRadius: "0", fontFamily: "Montserrat" }}>
                        <option defaultValue={DefautLoai} value="0">Chọn Sản phẩm</option>
                        <option value="dienthoai">Điện thoại</option>
                        <option value="tainghe">Tai nghe</option>
                        <option value="maytingbang">Máy tính bảng</option>
                        <option value="laptop">Laptop</option>
                    </Form.Select>
                </Col>
                <Col sm={6} xs={12} className='mt-3'>
                    <Col className="d-flex justify-content-start">

                        <input className='form-control' ref={refMin} placeholder={"fr " + MinPrice.toLocaleString("vi")} onChange={onChangeCreateMin} style={{ borderRadius: "0", marginRight: "15px" }} type="number" />
                        <input className='form-control' ref={refMax} placeholder={"to " + MaxPrice.toLocaleString("vi")} onChange={onChangeCreateMax} style={{ borderRadius: "0", marginRight: "15px" }} type="number" />
                        <Button onClick={OnClickFilter} className="btn btn-dark btn-sm" style={{ fontFamily: "Montserrat", borderRadius: "0", width: "38px", maxWidth: "94px", width: "94px", maxHeight: "38px", marginRight: "15px" }}>Lọc</Button>
                        <Button onClick={onClickClear} className="btn btn-dark btn-sm" style={{ fontFamily: "Montserrat", borderRadius: "0", width: "38px", maxWidth: "94px", width: "94px", maxHeight: "38px" }}>Xoá</Button>
                    </Col>
                </Col>
            </Row>
        </>
    )
}

export default ProductFilter