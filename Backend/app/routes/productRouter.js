// Khai báo thư viện
const express = require("express")

// Imprt controller:
const { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct, getAllProductFull, getAllProductLimit8, getProductByFilter, getProductBySearch } = require('../controller/productController')

// tạo ra router
const productRouter = express.Router();

// 1. router cho phương thức post
productRouter.post('/product', createProduct)

// 2. router cho phương thức get (lấy tất cả)
productRouter.get('/product', getAllProduct)

// 2. router cho phương thức get (lấy tất cả)
productRouter.get('/productFull', getAllProductFull)

// 2.5 router cho phương thức lọc
productRouter.get('/productFullA', getProductByFilter)

// 2-6. router cho phương thức get (lấy 8)
productRouter.get('/products', getAllProductLimit8)

// 2-7. getSearch
productRouter.get('/productFullB', getProductBySearch)

// 3. router cho phương thức get (lấy 1 giá trị)
productRouter.get('/product/:productId', getProductById)

// 4. router cho phương thức put
productRouter.put('/product/:productId', updateProduct)

// 5. router cho phương thức delete
productRouter.delete('/product/:productId', deleteProduct)



module.exports = { productRouter }