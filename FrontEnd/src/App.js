import "bootstrap/dist/css/bootstrap.min.css"
// import Header from './/components/1.Header/Header'
// import Content from './/components/2.Content/Content'
// import Footer from './/components/3.Footer/Footer'
import { Route, Routes, useParams } from "react-router-dom"
// import ViewAll from "./components/2.Content/ViewAll"
import LoginForm from "./components/LoginComponent"
import { useEffect } from "react"
import ProductInfor from "./components/4.Product/ProductInfor"
import AddToCart from "./components/4.Product/AddToCart"
import WebFont from "webfontloader"


import HomePage from "./page/homepage"
import ProductsPage from "./page/products"

import AddToCartPage from './page/addtocart'
import NumberSL from "./components/1.Header/numberSP"
import AddNumberProduct from "./components/countNumber"

import CheckOutPage from "./page/checkOutPage"
import OrderSuccessPage from "./page/orderSuccessPage"

import SearchResultPage from "./page/searchResultPage"

function App() {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Droid Sans', 'Montserrat', 'poppin']
            }
        })
    }, [])
    let products = JSON.parse(localStorage.getItem('products')) || []
    localStorage.setItem("products", JSON.stringify(products))
    //localStorage.removeItem("productsResult")
    return (

        <div className="App">
            <Routes>
                <Route key={'/'} path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<LoginForm />}></Route>
                <Route path='/products' element={<ProductsPage />}></Route>
                <Route path='/products/:idproduct/:nameproduct' element={<ProductInfor />}></Route>
                <Route path='/cart' element={<AddToCartPage />}></Route>
                <Route path='/thanhtoan' element={<CheckOutPage />}></Route>
                <Route path='/ordersuccess' element={<OrderSuccessPage />}></Route>
                <Route path='/resultsearch' element={<SearchResultPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
