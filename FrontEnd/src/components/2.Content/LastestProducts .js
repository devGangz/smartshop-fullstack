import { Button, Col, Container, Row } from "reactstrap"
import React from "react"
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector, useDispatch } from "react-redux"
import { getApiProducts, onClickReset } from "../../actions/24h.action";


const LastestProducts = () => {
    const dispatch = useDispatch();
    const [allProducts, setAllProducts] = useState("")
    var { ProductResult, callApiSuccess, reset } = useSelector((reduxData) => reduxData.ReducerOne)
    useEffect(() => {
        fetch('http://localhost:8080/products?limit=8')
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("xxx")
            })
            .then((res) => { setAllProducts(res.allProducts) })
            .catch((err) => console.log(err))

    }, []);


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

    const responsiveA = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 5000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
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
            {
                allProducts && allProducts !== [] ?
                    <Container fluid >
                        <Col className="d-flex justify-content-center mt-5">
                            <h1 style={{ fontFamily: "Montserrat" }}><b>Sản phẩm mới ra mắt</b></h1>
                        </Col>
                        <Container className="mx-auto mt-3 gd-carousel-wrapper">
                            <Carousel responsive={responsive}
                                className="gd-carousel"
                                style={{ zIndex: '-1' }}>
                                {allProducts && allProducts.map((item, index) => {
                                    return <div className='w-10 border rounded shadow m-3' key={index}>
                                        <div>
                                            <Col className='d-flex justify-content-center'>
                                                <h5 className='m-1 mt-3' style={{ fontFamily: "Montserrat" }}><b>{item.name}</b></h5>
                                            </Col>
                                            <div className="d-flex justify-content-center pt-4 pb-3 ">
                                                <img src={item.imageUrl} alt="Card image cap" style={{ width: "50%" }} />
                                            </div>

                                            <Col className='d-flex justify-content-center'>
                                                <h6 className='m-1'><del>{item.buyPrice.toLocaleString("vi")}₫</del></h6>
                                            </Col>
                                            <Col className='d-flex justify-content-center '>
                                                <h6 className='m-1 text-danger '>{(item.buyPrice - 0.3 * item.buyPrice).toLocaleString("vi")}₫</h6>
                                            </Col>
                                        </div>
                                        <div className='d-flex justify-content-center mb-3'>
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
                        <a href="/products" ><h6 style={{ fontFamily: "Montserrat", color: "gray" }}><ins>Xem tất cả</ins></h6></a>
                        <Col className="d-flex justify-content-center mt-5">
                            <h1 style={{ fontFamily: "Montserrat" }}><b>Tekzone</b></h1>
                        </Col>
                        <Container className="mx-auto mt-3 gd-carousel-wrapper">
                            <Carousel responsive={responsiveA} className="gd-carousel">
                                <div className='w-10 border rounded shadow m-3'>
                                    <div className="d-flex justify-content-center">
                                        <img src="https://cdn.tgdd.vn/Files/2023/05/03/1528356/cach-giu-pin-iphone-ben-4-050523-151409-760x367.jpg" className="rounded-top" alt="Card image cap" style={{ width: "100%" }} />
                                    </div>
                                    <Col className='d-flex justify-content-center bg bg-dark rounded-bottom'>
                                        <a href="https://www.topzone.vn/tekzone/cach-giu-pin-iphone-ben-1528356" style={{ textDecorationLine: "none" }}>
                                            <p className='m-2' style={{ fontFamily: "Montserrat", textAlign: "justify", color: "white" }}>Cách giữ pin iPhone bền vô cùng đơn giản và hiệu quả mà mọi người không thể bỏ qua khi sử dụng</p>
                                        </a>
                                    </Col>
                                </div>
                                <div className='w-10 border rounded shadow m-3'>
                                    <div className="d-flex justify-content-center">
                                        <img src="https://cdn.tgdd.vn/Files/2023/05/06/1528780/2-060523-112711-760x367.jpg" className="rounded-top" alt="Card image cap" style={{ width: "100%" }} />
                                    </div>
                                    <Col className='d-flex justify-content-center bg bg-dark rounded-bottom'>
                                        <a href="https://www.topzone.vn/tekzone/code-anime-fighting-simulator-1528780" style={{ textDecorationLine: "none" }}>
                                            <p className='m-2' style={{ fontFamily: "Montserrat", textAlign: "justify", color: "white" }}>Code Anime Fighting Simulator mới nhất tháng 05, nhận ngay Chikara, Yen và nhiều phần quà giá trị</p>
                                        </a>
                                    </Col>
                                </div>
                                <div className='w-10 border rounded shadow m-3'>
                                    <div className="d-flex justify-content-center">
                                        <img src="https://cdn.tgdd.vn/Files/2023/05/02/1528310/2-050523-003128-760x367.jpg" className="rounded-top" alt="Card image cap" style={{ width: "100%" }} />
                                    </div>
                                    <Col className='d-flex justify-content-center bg bg-dark rounded-bottom'>
                                        <a href="https://www.topzone.vn/tekzone/cach-kiem-tra-iphone-moi-1528310" style={{ textDecorationLine: "none" }}>
                                            <p className='m-2' style={{ fontFamily: "Montserrat", textAlign: "justify", color: "white" }}>7 cách kiểm tra iPhone mới, giúp bạn biết được chính xác chất lượng máy có đúng hàng chính hãng</p>
                                        </a>
                                    </Col>
                                </div>
                            </Carousel>
                        </Container>

                        <Container className="mx-auto mt-3 gd-carousel-wrapper">
                            <Carousel responsive={responsiveA} className="gd-carousel">
                                <div className='w-10 border rounded shadow m-3'>
                                    <div className="d-flex justify-content-center">
                                        <img src="https://cdn.tgdd.vn/Files/2023/05/04/1528523/logo-040523-130952-760x367.jpg" className="rounded-top" alt="Card image cap" style={{ width: "100%" }} />
                                    </div>
                                    <Col className='d-flex justify-content-center bg bg-dark rounded-bottom'>
                                        <a href="https://www.topzone.vn/tekzone/macbook-air-m1-gia-chi-tu-18-490-gia-re-qua-1528523" style={{ textDecorationLine: "none" }}>
                                            <p className='m-2' style={{ fontFamily: "Montserrat", textAlign: "justify", color: "white" }}>MacBook Air M1 giá chỉ từ 18.490.000 đồng - Mua liền tay tại TopZone nào mọi người ơi</p>
                                        </a>
                                    </Col>
                                </div>
                                <div className='w-10 border rounded shadow m-3'>
                                    <div className="d-flex justify-content-center">
                                        <img src="https://cdn.tgdd.vn/Files/2023/05/04/1528504/logo-040523-112346-760x367.jpg" className="rounded-top" alt="Card image cap" style={{ width: "100%" }} />
                                    </div>
                                    <Col className='d-flex justify-content-center bg bg-dark rounded-bottom'>
                                        <a href="https://www.topzone.vn/tekzone/imac-mac-mini-giam-soc-den-30-gia-re-qua-1528504" style={{ textDecorationLine: "none" }}>
                                            <p className='m-2' style={{ fontFamily: "Montserrat", textAlign: "justify", color: "white" }}>iMac, Mac mini giảm sốc đến 30% - Ưu đãi hấp dẫn với số lượng có giới hạn tại TopZone</p>
                                        </a>
                                    </Col>
                                </div>
                                <div className='w-10 border rounded shadow m-3'>
                                    <div className="d-flex justify-content-center">
                                        <img src="https://cdn.tgdd.vn/Files/2023/05/03/1528385/logo-040523-103720-760x367.jpg" className="rounded-top" alt="Card image cap" style={{ width: "100%" }} />
                                    </div>
                                    <Col className='d-flex justify-content-center bg bg-dark rounded-bottom'>
                                        <a href="https://www.topzone.vn/tekzone/macbook-pro-14-16-inch-giam-soc-den-20-gia-re-qua-1528385" style={{ textDecorationLine: "none" }}>
                                            <p className='m-2' style={{ fontFamily: "Montserrat", textAlign: "justify", color: "white" }}>MacBook Pro 14-16 inch giảm sốc đến 20% - Giá rẻ quá! Hãy đến TopZone mua ngay kẻo lỡ</p>
                                        </a>
                                    </Col>
                                </div>
                            </Carousel>
                        </Container>

                    </Container>
                    : []
            }

        </>
    )
}

export default LastestProducts