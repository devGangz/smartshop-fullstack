import { Row, Col, Button } from "reactstrap"
import { useState, useEffect, useRef } from "react";
import { onClickReset } from '../actions/24h.action'
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';


const AddNumberProduct = (productItem) => {
    const dispatch = useDispatch();
    const { ProductResult, callApiSuccess, CartArr, exA } = useSelector((reduxData) => reduxData.ReducerOne)
    const ProductDetail = (ProductResult.filter(item => item._id == productItem._id))[0]
    //console.log("Detail", ProductDetail);
    const [numberSP, setNumber] = useState(0)

    // tạo product cần thêm
    const [cong, setCong] = useState(0)

    const ProductNew = {
        img: ProductDetail.imageUrl,
        model: ProductDetail.name,
        price: Math.ceil(ProductDetail.buyPrice * 0.7),
        qtt: cong
    }

    //console.log("sản phầm mới tạo đưa đi so sánh", ProductNew);
    // lấy dữ liệu trong giỏ hàng và
    let products = JSON.parse(localStorage.getItem('products')) || []
    //console.log("Dữ liệu trong giỏ hàng", products);
    // Kiểm tra xem đối tượng có trong giỏ hàng hay không?
    const listProductDefQtt = (products.filter(item => item.model == productItem.name)) || []

    useEffect(() => {
        if (listProductDefQtt.length !== 0) {
            setCong(listProductDefQtt[0].qtt)
        }
        if (listProductDefQtt.length == 0) {
            setCong(0)
        }
    }, [])

    const productArr = useState([])
    const [productArr0, setArr0] = useState([])
    const productPush = useState([])

    const clickAtc = () => {
        localStorage.setItem("products", JSON.stringify(productArr0))
        dispatch(onClickReset())
    }

    const clickCong = () => {
        // let products = JSON.parse(localStorage.getItem('products')) || []
        if (products.length > 0) {
            products = products.filter(item => item.model !== ProductDetail.name)
            const ProductNew2 = {
                img: ProductDetail.imageUrl,
                model: ProductDetail.name,
                price: Math.ceil(ProductDetail.buyPrice * 0.7),
                qtt: cong + 1
            }
            setCong(cong + 1)
            productArr.push(ProductNew2)
            const productsLastest = productArr.pop()
            products.push(productsLastest)
            setArr0(products)
        } else if (products.length == 0) {
            const ProductNew2 = {
                img: ProductDetail.imageUrl,
                model: ProductDetail.name,
                price: Math.ceil(ProductDetail.buyPrice * 0.7),
                qtt: cong + 1
            }
            setCong(cong + 1)
            productArr.push(ProductNew2)
            const productsLastest = productArr.pop()
            products.push(productsLastest)
            setArr0(products)
        }
    }


    const clickTru = () => {
        // let products = JSON.parse(localStorage.getItem('products')) || []
        if (products.length > 0) {
            products = products.filter(item => item.model !== ProductDetail.name)
            const ProductNew2 = {
                img: ProductDetail.imageUrl,
                model: ProductDetail.name,
                price: Math.ceil(ProductDetail.buyPrice * 0.7),
                qtt: cong - 1
            }
            setCong(cong - 1)
            productArr.push(ProductNew2)
            const productsLastest = productArr.pop()
            products.push(productsLastest)
            setArr0(products)
        } else if (products.length == 0) {
            const ProductNew2 = {
                img: ProductDetail.imageUrl,
                model: ProductDetail.name,
                price: Math.ceil(ProductDetail.buyPrice * 0.7),
                qtt: cong - 1
            }
            setCong(cong - 1)
            productArr.push(ProductNew2)
            const productsLastest = productArr.pop()
            products.push(productsLastest)
            setArr0(products)
        }
    }

    const [disableA, setDisableA] = useState("none")
    useEffect(() => {
        if (cong == 0 || cong < 0) {
            setDisableA("block")
        }
    }, [])




    return (
        <Col id="tangGiamComponent">
            <Col sm={8} md={5} xs={6} className='d-flex justify-content-between align-items-center mx-auto' style={{ height: "30px" }} id="borderQuantity" >
                <Col id="congTru">
                    <i style={{ cursor: "pointer" }} onClick={clickCong} className="fas fa-plus"></i>
                </Col>
                <Col className='pt-3'>
                    <p>{cong > 0 ? cong : 0}</p>
                </Col>
                <Col >
                    <i style={{ cursor: "pointer", display: cong > 0 ? "block" : "none" }} onClick={clickTru} className="fas fa-minus"></i>
                </Col>
            </Col>
            <Col sm={8} md={12} xs={6} className="mt-2 mx-auto">
                <Button id='AddtocartButton' onClick={clickAtc}
                    className='btn btn-light border btn-sm' style={{ borderRadius: "0", fontFamily: "Montserrat", maxWidth: "120px", width: "120px", maxHeight: "31px" }}><b>Add to Cart</b></Button>
            </Col>
        </Col>
    )
}

export default AddNumberProduct