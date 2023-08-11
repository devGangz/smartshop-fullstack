
// import { useEffect } from "react";
// import { useSelector } from "react-redux"


import { Button, Col, Container, Row } from "reactstrap"
import { useState, useEffect } from "react";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductFilter from "../4.Product/ProductFilter";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from "react-redux"
import { getApiProducts, onClickReset } from "../../actions/24h.action";


const SearchResultComponent = () => {
    const dispatch = useDispatch()
    const { callApiSuccess, SearchOK, reset } = useSelector((reduxData) => reduxData.ReducerOne)


    let listProductSearch = JSON.parse(localStorage.getItem('productsResult'))
    //console.log("listInCPN", listProductSearch);

    useEffect(() => {
        dispatch(getApiProducts());
    }, [reset])


    // Phân trang sản phẩm
    var totalPage = 0;
    const [nPage, setNpage] = useState(1)
    const numberPage = (e, value) => {
        setNpage(value)
    }
    const rowPerPage = []
    if (callApiSuccess) {
        const phanTrang = () => {
            // Tính tổng số trang
            totalPage = Math.ceil(listProductSearch.length / 12)
            // Tính số trang hiện tại từ dòng bao nhiêu đến bao nhiêu
            let n1 = nPage;
            let b1 = n1 * 12 - 12
            let b2 = n1 * 12 - 1
            listProductSearch.forEach((item, index) => {
                if (b1 <= index && index <= b2) {
                    rowPerPage.push(item)
                }
            })
        }
        phanTrang()
    }

    const clickAtc = (item) => {
        let products = JSON.parse(localStorage.getItem('products')) || []
        let ProductS = {
            img: item.imageUrl,
            model: item.name,
            price: Math.ceil(item.buyPrice * 0.7),
            qtt: 1
        }
        products.push(ProductS)
        localStorage.setItem("products", JSON.stringify(products))
        dispatch(onClickReset())
    }


    return (
        <Container className="containerViewAll" style={{ height: "75vh" }} id="marginTopViewAll">
            <Breadcrumbs aria-label="breadcrumb" className="mt-3">
                <Link underline="hover" color="inherit" href="/products" style={{ fontFamily: "Montserrat" }}>
                    Tất cả sản phẩm
                </Link>
                <Typography color="text.primary" style={{ fontFamily: "Montserrat" }}>Kết quả tìm kiếm</Typography><a href="/" style={{ fontFamily: "Montserrat" }}>Back</a>
            </Breadcrumbs>
            {/* {
                callApiSuccess ? <ProductFilter></ProductFilter> : []
            } */}
            <Col className="d-flex justify-content-around">

                {callApiSuccess ?
                    <Row className="d-flex justify-content-between">
                        {rowPerPage.map((item, index) => {
                            return <div key={index} className="mt-4 d-flex justify-content-around col-sm-4 col-xs-6 col-md-4" style={{ backgroundColor: "white", height: "380px" }}>
                                <div className='cardViewAll card-body border mt-0 shadow col-sm-4 col-xs-6 col-md-4 ' style={{ borderRadius: "10px", marginTop: "10px" }}>
                                    <div className="d-flex justify-content-center pt-1 pb-1 mx-auto" style={{ width: "190px", height: "190px" }}>
                                        <img src={item.imageUrl} alt="Card image cap" style={{ marginTop: "10px" }} />
                                    </div>
                                    <Col className='d-flex justify-content-center'>
                                        <p className='m-1' style={{ fontFamily: "Montserrat" }}><b> {item.name}</b></p>
                                    </Col>
                                    <Col className='d-flex justify-content-center'>
                                        <p className='m-1' style={{ fontFamily: "Montserrat" }}>{item.brand}</p>
                                    </Col>
                                    <Row className='d-flex justify-content-start'>
                                        <p className='m-1' style={{ fontFamily: "Montserrat" }}><del>{item.buyPrice.toLocaleString("vi")}₫</del> <br></br> <b style={{ color: "#CF2834" }}>{(item.buyPrice - 0.3 * item.buyPrice).toLocaleString("vi")}₫</b></p>
                                    </Row>
                                    <Col className='d-flex justify-content-center'>
                                        <div className='d-flex justify-content-center m-1'>
                                            <Button style={{ fontFamily: "Montserrat", borderRadius: "0", backgroundColor: "#101010" }}
                                                href={"/products/" + item._id + "/" + item.name} className='mt-2 mb-2 btn-sm fix-chi-tiet'>Xem</Button>
                                        </div>
                                        <div className='d-flex justify-content-center m-1'>
                                            <Button onClick={() => clickAtc(item)}
                                                style={{
                                                    width: "120px", maxWidth: "120px", height: "30px", maxHeight: "30px",
                                                    fontFamily: "Montserrat", borderRadius: "0", backgroundColor: "#101010",
                                                }}
                                                className='mt-2 mb-2 btn-sm'
                                            >
                                                Add to cart
                                            </Button>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        })}
                    </Row> : []
                }
            </Col >
            <Col className="d-flex justify-content-center mt-3 mb-3" style={{ paddingTop: "50px" }}>
                <Stack spacing={2}>
                    <Pagination count={totalPage} variant="outlined" shape="rounded" onChange={numberPage} />
                </Stack>
            </Col>
        </Container >
    )
}

export default SearchResultComponent


