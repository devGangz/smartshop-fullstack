// Khai báo thư viện
const express = require("express");

// Khai báo controller
const { CreateProductType, GetAllProductType, GetProductTypeByID, UpdateProductType, DeleteProductType } = require("../controller/productTypeController");

// tạo ra router
const productTypeRouter = express.Router();

// 1. router cho phương thức post
productTypeRouter.post('/product/:productId/productType', CreateProductType)

// 2. router cho phương thức get (lấy tất cả)
productTypeRouter.get('/productType', GetAllProductType)

// 3. router cho phương thức get (lấy 1 cái)
productTypeRouter.get('/productType/:productTypeId', GetProductTypeByID)

// 4. router cho phương thức put (Update)
productTypeRouter.put('/productType/:productTypeId', UpdateProductType)

// 5. router cho phương thức delete
productTypeRouter.delete('/product/:productId/productType/:productTypeId', DeleteProductType)


module.exports = { productTypeRouter }