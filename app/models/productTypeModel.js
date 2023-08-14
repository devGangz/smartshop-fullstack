// B1: Khai báo thư viện monggo
const mongoose = require("mongoose")
// B2: Khai báo thư viện Schema của mongoose
const Schema = mongoose.Schema
// B3: Tạo đối tượng Schema bao gồm các thuộc tính thuộc collection
const ProductTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    created_At: {
        type: Date,
        default: Date.now()
    },
    updated_At: {
        type: Date,
        default: Date.now()
    }
})

// B4: Export schema ra mode
module.exports = mongoose.model("productType", ProductTypeSchema)
