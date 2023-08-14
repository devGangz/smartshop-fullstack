// Khai báo thư viện
const express = require("express")

// Imprt controller:
const { createVoucher, getVoucherById, getAllVoucher } = require('../controller/voucherController')

// tạo ra router
const voucherRouter = express.Router();

// 1. router cho phương thức post
voucherRouter.get('/voucher', getAllVoucher)

// 1. router cho phương thức post
voucherRouter.post('/voucher', createVoucher)

// 3. router cho phương thức get (lấy 1 giá trị)
voucherRouter.get('/voucher/:voucherId', getVoucherById)


module.exports = { voucherRouter }