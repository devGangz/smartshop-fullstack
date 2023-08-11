import Header from '../1.Header/Header'
import Footer from '../3.Footer/Footer'
import siteProps from "../4.Product/PropsProducts";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Container, Col, Row, Button, UncontrolledCollapse } from 'reactstrap'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { getApiProducts, getArrayCart, onClickReset } from "../../actions/24h.action";
import { useState, useEffect } from "react";
import CarouselDetail from '../4.Product/CarouselProduct';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddNumberProduct from '../countNumber';
import Carousel from "react-multi-carousel";

const ProductInfor = () => {
    const { idproduct, nameproduct } = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getApiProducts());
    }, [])
    const { ProductResult, callApiSuccess, CartArr, resetCart } = useSelector((reduxData) => reduxData.ReducerOne)
    const ProductDetail = (ProductResult.filter(item => item._id == idproduct))[0]
    const Top6 = []
    const [IsAlert, SetIsAlert] = useState(false)
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 5000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 5000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

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
        <>
            <Header></Header>
            {callApiSuccess ?
                <Container style={{ marginTop: "120px" }}>
                    <Breadcrumbs aria-label="breadcrumb" className="mt-5 mb-3">
                        {/* <Link underline="hover" color="inherit" href={siteProps[0].url}>
                            {siteProps[0].name}
                        </Link> */}
                        <Link underline="hover" color="inherit" href={siteProps[1].url}>
                            {siteProps[1].name}
                        </Link>
                        <Typography color="text.primary"><b>{nameproduct}</b></Typography>
                    </Breadcrumbs>

                    <Col sm={12} xs={12} md={12} className='d-flex justify-content-around'>
                        <Col sm={6} xs={6} md={6} id="CarouselInfor">
                            <CarouselDetail {...ProductDetail} />
                        </Col>
                        <Col sm={6} xs={6} md={6} className='border rounded mt-3' id="inforDetail" style={{ backgroundColor: "#EFEFEF", marginLeft: "20px" }}>
                            <Col md={12} className='d-flex justify-content-start m-3' id="InforTieude">
                                <h1 style={{ fontFamily: "Montserrat" }} id="InforTieude"><b>{nameproduct}</b></h1>
                            </Col>
                            <Col className='d-flex justify-content-start m-3 '>
                                <h4 style={{ fontFamily: "Montserrat", color: "#7F7F7F" }} id="Inforbrand" >Brand: {ProductDetail.brand}</h4>
                            </Col>
                            <Col className='d-flex justify-content-start m-3 '>
                                <h6 style={{ fontFamily: "Montserrat" }} id="InforFeature" >Feature:</h6>
                            </Col>
                            {/* show for large */}
                            <Col sm={6} md={6} xs={12} className='d-flex justify-content-start m-3 rounded' >
                                <Col sm={10} md={12} className='rounded border '>
                                    <p style={{ fontFamily: "Montserrat" }} id="InforDescription" className='text-start'>{ProductDetail.description.map((item, index) => <li key={index}>{item}</li>)}</p>
                                </Col>
                                <Col sm={9} md={9} xs={12} className='rounded ' style={{ marginLeft: "20px", backgroundColor: "#FFFFFF" }}>
                                    <Col>
                                        <Col className='d-flex justify-content-start mt-2 ' style={{ marginLeft: "10px", fontFamily: "Montserrat" }}>
                                            <h5 id="priceFirst"><del>${ProductDetail.buyPrice.toLocaleString("vi")}₫</del></h5>
                                        </Col>
                                        <Col className='d-flex justify-content-center'>
                                            <h4 id="priceSecond" style={{ color: "#DC3545", marginBottom: "-10px", fontFamily: "Montserrat" }}>Giá sốc: <b>{Math.ceil(ProductDetail.buyPrice * 0.7).toLocaleString("vi")}₫</b></h4>
                                        </Col>
                                    </Col>
                                    <Col className='d-flex justify-content-center mt-2'>
                                        <AddNumberProduct{...ProductDetail} />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>

                    {/* hien thi tren dien thoai */}
                    <Col xs={12} className=' inforshowPhone mx-auto mt-3 d-flex justify-content-between rounded' id="inforshowPhone" >
                        <Col xs={6} className='inforshowPhone rounded border'>
                            <p style={{ fontFamily: "Montserrat", fontSize: "10px" }} id="InforDescription" className='text-start'>{ProductDetail.description.map((item, index) => <li key={index}>{item}</li>)}</p>
                        </Col>

                        <Col xs={6} className='inforshowPhone rounded '>
                            <p style={{ marginBottom: "5px" }}><del>${ProductDetail.buyPrice.toLocaleString("vi")}₫</del></p>
                            <p style={{ color: "#DC3545", fontFamily: "Montserrat", fontSize: "15px" }}><b>{Math.ceil(ProductDetail.buyPrice * 0.7).toLocaleString("vi")}₫</b></p>
                            <AddNumberProduct{...ProductDetail} />
                        </Col>
                    </Col>

                    <Col>
                        <Col sm={3} className='mt-3'>
                            <h6 className='text-start'>Description</h6>
                        </Col>
                        <Col>
                            <p style={{ fontFamily: "Montserrat", textAlign: "justify" }}>{ProductDetail.descriptionDetail[0]}</p>
                            <img src={ProductDetail.imgA} width="100%"></img>
                            <Col className='mt-3 mb-3'>
                                <Button style={{ fontFamily: "Montserrat", maxWidth: "200px", width: "200px", maxHeight: "36px", textAlign: "center", background: "none", color: "black" }} id="toggler">Xem thêm...</Button>
                            </Col>

                            <UncontrolledCollapse toggler="#toggler">
                                <p style={{ fontFamily: "Montserrat", textAlign: "justify" }}>{ProductDetail.descriptionDetail[1]}</p>
                                <img src={ProductDetail.imgB} width="100%"></img>

                                <p className='mt-3' style={{ fontFamily: "Montserrat", textAlign: "justify" }}>{ProductDetail.descriptionDetail[2]}</p>
                                <img src={ProductDetail.imgC} width="100%"></img>

                                <p className='mt-3' style={{ fontFamily: "Montserrat", textAlign: "justify" }}>{ProductDetail.descriptionDetail[3]}</p>
                                <img src={ProductDetail.imgD} width="100%"></img>
                            </UncontrolledCollapse >

                            <Col className='mt-3 mb-4' sm={3}>
                                <h6 className='text-start'>Related Product</h6>
                            </Col>
                            {
                                ProductResult.map((item) => {
                                    if (item.brand == ProductDetail.brand && Top6.length < 6) {

                                        Top6.push(item)
                                    }
                                })
                            }

                            <Container className="mx-auto mt-3 gd-carousel-wrapper">
                                <Carousel responsive={responsive} style={{ zIndex: '-1' }} className="gd-carousel">
                                    {Top6.map((item, index) => {
                                        return <div className='cardViewAll w-10 border rounded shadow m-3' key={index}>
                                            <div>
                                                <Col className='d-flex justify-content-center' style={{ height: "54px" }}>
                                                    <h6 className='m-2 mt-3' style={{ fontFamily: "Montserrat" }}><b>{item.name}</b></h6>
                                                </Col>
                                                <div className="d-flex justify-content-center pt-3 pb-3 mx-auto" style={{ width: "180px", height: "180px" }} >
                                                    <img src={item.imageUrl} alt="Card image cap" />
                                                </div>

                                                <Col className='d-flex justify-content-center'>
                                                    <h6 className='m-2'><del>{item.buyPrice.toLocaleString("vi")}₫</del></h6>
                                                </Col>
                                                <Col className='d-flex justify-content-center '>
                                                    <h6 className='m-2 text-danger '>{(item.buyPrice - 0.3 * item.buyPrice).toLocaleString("vi")}₫</h6>
                                                </Col>
                                            </div>
                                            <div className='d-flex justify-content-center mb-2'>
                                                <Button href={"/products/" + item._id + "/" + item.name}
                                                    style={{ fontFamily: "Montserrat", borderRadius: "0", backgroundColor: "#101010" }}
                                                    className='mt-2 mb-2 btn-sm fix-chi-tiet'>Xem
                                                </Button>
                                                <Button onClick={() => clickAtc(item)}
                                                    style={{
                                                        width: "120px", maxWidth: "120px", height: "30px", maxHeight: "30px", marginLeft: "10px",
                                                        fontFamily: "Montserrat", borderRadius: "0", backgroundColor: "#101010"
                                                    }}
                                                    className='mt-2 mb-2 btn-sm'
                                                >
                                                    Add to cart
                                                </Button>
                                            </div>
                                        </div>

                                    })}
                                </Carousel>
                            </Container>
                        </Col>
                    </Col>
                </Container >
                : []}

            <Footer></Footer>
        </>
    )
}

export default ProductInfor