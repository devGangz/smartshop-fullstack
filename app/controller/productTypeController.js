// B1: Import Models
const { default: mongoose } = require('mongoose');
const productTypeModel = require('../models/productTypeModel')
const productModel = require('../models/productModel')

// B2: Tạo các function CRUD
// 1. create a new productType (with product)
const CreateProductType = async (req, res) => {
    // B1: Thu thap du lieu
    let body = req.body;
    let id = req.params.productId
    console.log(req.body)
    // B2: Kiem tra du lieu

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            mes: "Id is invalid"
        })
    }

    if (!body.name) {
        return res.status(400).json({
            mes: "name is required!"
        })
    }

    // B3: Xu li va hien thi ket qua
    let newProductType = new productTypeModel({ ...body });
    try {
        res.status(201).json(await newProductType.save())
    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - create",
            err: err.message
        })
    }
    // B4: update lại dữ liệu của product.
    try {
        const productUpdate = await productModel.findById(id)
        if (productUpdate !== null) {
            const updateResult = await productModel.findByIdAndUpdate({ _id: id },
                { $push: { types: newProductType._id } },
                { new: true })
        }
        if (productUpdate == null) {
            return res.status(500).json({
                status: "Interal server error",
                productType: null
            })
        }

    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - update",
            err: err.message
        })
    }
}

// 2. get all productType
const GetAllProductType = async (req, res) => {
    //B3: Xu ly ket qua tra ve
    try {
        const productTypes = await productTypeModel.find();
        res.status(200).json({ productTypes })

    } catch (error) {
        return res.status(500).json({
            status: "Interal server error - get all",
            productTypes: null
        })
    }
}

// 3. get product by Id
const GetProductTypeByID = async (req, res) => {
    //B1: Thu thap du lieu
    let id = req.params.productTypeId
    //B2: Kiem tra du lieu
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            mes: "Id is invalid"
        })
    }
    //B3: Xu du du lieu
    try {
        const productType = await productTypeModel.findById(id)
        if (productType == null) {
            return res.status(500).json({
                status: "Interal server error",
                productType: null
            })
        }
        if (productType !== null) {
            return res.status(200).json({ productType })
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: "Interal server error - get one",
            productType: null
        })
    }
}

// 4. update productType by Id 
const UpdateProductType = async (req, res) => {
    // B1: Thu thap du lieu
    let id = req.params.productTypeId
    let body = req.body;
    // B2: Kiem tra du lieu
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            mes: "Id is invalid"
        })
    }

    if (!body.name) {
        return res.status(400).json({
            mes: "name is required!"
        })
    }

    // B3 Xu ly du lieu
    try {
        const productUpdate = await productTypeModel.findById(id)
        if (productUpdate !== null) {
            const updateResult = await productTypeModel.findByIdAndUpdate({ _id: id },
                {
                    name: body.name,
                    description: body.description,
                },
                {
                    new: true
                })
            res.status(200).json(updateResult)
        }
        if (productUpdate == null) {
            return res.status(500).json({
                status: "Interal server error",
                productType: null
            })
        }

    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - update",
            err: err.message
        })
    }
}

// 5. delete productType by Id
const DeleteProductType = async (req, res) => {
    let productId = req.params.productId
    let productTypeId = req.params.productTypeId

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            mes: "productId is invalid"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return res.status(400).json({
            mes: "productTypeId is invalid"
        })
    }

    try {
        const productTypeDeleted = await productTypeModel.findByIdAndDelete({ _id: productTypeId })
        if (!productTypeDeleted) {
            return res.status(404).json({
                mes: "Object can not found"
            })
        }
        if (productTypeDeleted) {
            res.status(204).json()
        }
    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - delete",
            err: err.message
        })
    }

    // Quay lại xoá id trong productType
    try {
        const productUpdate = await productModel.findById(productId)

        if (productUpdate !== null) {
            const updateResult = await productModel.findByIdAndUpdate({ _id: productId },
                { $pull: { types: productTypeId } },
                { new: true })
        }
        if (productUpdate == null) {
            return res.status(500).json({
                status: "Interal server error",
                productType: null
            })
        }

    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - update",
            err: err.message
        })
    }
}




// B3: Export thành các module
module.exports = { CreateProductType, GetAllProductType, GetProductTypeByID, UpdateProductType, DeleteProductType }
