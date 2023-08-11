// B1: Khai báo thư viện monggo
const mongoose = require("mongoose")
// B2: Khai báo thư viện Schema của mongoose
const Schema = mongoose.Schema
// B3: Tạo đối tượng Schema bao gồm các thuộc tính thuộc collection
const productSchema = new Schema({

    // types: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "productType",
    //         required: true
    //     }
    // ],

    name: {
        type: String,
    },

    brand: {
        type: String,
    },

    description: [],

    descriptionDetail: [],

    imageUrl: {
        type: String,
    },

    imgA: {
        type: String,
    },
    imgB: {
        type: String,
    },
    imgC: {
        type: String,
    },
    imgD: {
        type: String,
    },
    imgE: {
        type: String,
    },
    buyPrice: {
        type: Number,
    },
    loaisp: {
        type: String
    }

})

// B4: Export schema ra mode
module.exports = mongoose.model("product", productSchema)
