// B1: Khai báo thư viện monggo
const mongoose = require("mongoose")
// B2: Khai báo thư viện Schema của mongoose
const Schema = mongoose.Schema
// B3: Tạo đối tượng Schema bao gồm các thuộc tính thuộc collection
const orderSchema = new Schema({

    cartList: [],
    voucherAndCost: [],
    inforCustomer: []
})

// B4: Export schema ra mode
module.exports = mongoose.model("order", orderSchema)
