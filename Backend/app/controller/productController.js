// B1: Import product Model
const { default: mongoose } = require('mongoose');
const productModel = require('../models/productModel')

// B2: Tạo các function CRUD

// 1. create a new product
const createProduct = async (req, res) => {
    // B1: Thu thap du lieu
    let body = req.body;

    // B3: Xu li va hien thi ket qua
    let newProduct = new productModel({ ...body });
    try {
        res.status(201).json(await newProduct.save())
    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - create",
            err: err.message
        })
    }
}

// 2. get all product
const getAllProduct = async (req, res) => {
    //B3: Xu ly ket qua tra ve
    try {
        const allProducts = await productModel.find().limit(6);
        res.status(200).json({ allProducts })

    } catch (error) {
        return res.status(500).json({
            status: "Interal server error - get all",
            product: null
        })
    }
}




// 2-5. get all product
const getAllProductFull = async (req, res) => {
    //B3: Xu ly ket qua tra ve
    try {
        const allProducts = await productModel.find();
        res.status(200).json({ allProducts })

    } catch (error) {
        return res.status(500).json({
            status: "Interal server error - get all",
            product: null
        })
    }
}

// 2.5 get Product by Filter


const getProductBySearch = async (req, res) => {
    let searchValue = req.query.search
    if (searchValue !== "") {
        try {
            const allProducts = await productModel.find({
                loaisp: searchValue
            })
            res.status(200).json({ allProducts })
        } catch (err) {
            return res.status(500).json({
                status: "Interal server error - get all",
            })
        }
    }
}



const getProductByFilter = async (req, res) => {
    let brandBE = req.query.brand
    let loaispBE = req.query.loaisp
    let maxCostBE = req.query.maxCost
    let minCostBE = req.query.minCost

    //console.log(brandBE, loaispBE, maxCostBE, minCostBE);

    if (brandBE == "0" && loaispBE !== "0") {
        try {
            const allProducts = await productModel.find({
                loaisp: loaispBE,
                // brand: brandBE,
                buyPrice: { $gte: minCostBE / 0.7, $lte: maxCostBE / 0.7 }
            })
            res.status(200).json({ allProducts })
        } catch (err) {
            return res.status(500).json({
                status: "Interal server error - get all",
            })
        }
    }

    else if (brandBE !== "0" && loaispBE == "0") {
        try {
            const allProducts = await productModel.find({
                //loaisp: loaispBE,
                brand: brandBE,
                buyPrice: { $gte: minCostBE / 0.7, $lte: maxCostBE / 0.7 }
            })
            res.status(200).json({ allProducts })
        } catch (err) {
            return res.status(500).json({
                status: "Interal server error - get all",
            })
        }
    }

    else if (brandBE == "0" && loaispBE == "0") {
        try {
            const allProducts = await productModel.find({
                buyPrice: { $gte: minCostBE / 0.7, $lte: maxCostBE / 0.7 }
            })
            res.status(200).json({ allProducts })
        } catch (err) {
            return res.status(500).json({
                status: "Interal server error - get all",
            })
        }
    }

    else if (brandBE !== "0" && loaispBE !== "0") {
        try {
            const allProducts = await productModel.find({
                loaisp: loaispBE,
                brand: brandBE,
                buyPrice: { $gte: minCostBE / 0.7, $lte: maxCostBE / 0.7 }
            })
            res.status(200).json({ allProducts })
        } catch (err) {
            return res.status(500).json({
                status: "Interal server error - get all",
            })
        }
    }
}



// 2-6. get all product limit 8
const getAllProductLimit8 = async (req, res) => {
    let query8 = req.query.limit
    //B3: Xu ly ket qua tra ve
    try {
        const allProducts = await productModel.find().limit(query8);
        res.status(200).json({ allProducts })

    } catch (error) {
        return res.status(500).json({
            status: "Interal server error - get all",
            product: null
        })
    }
}




// 3. get product by Id
const getProductById = async (req, res) => {
    //B1: Thu thap du lieu
    let id = req.params.productId
    //B2: Kiem tra du lieu
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            mes: "Id is invalid"
        })
    }
    //B3: Xu du du lieu
    try {
        const product = await productModel.findById(id)
        if (product == null) {
            return res.status(500).json({
                status: "Interal server error",
                product: null
            })
        }
        if (product !== null) {
            return res.status(200).json({ product })
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: "Interal server error - get one",
            product: null
        })
    }
}

// 4. update product by Id
const updateProduct = async (req, res) => {
    // B1: Thu thap du lieu
    let id = req.params.productId
    let body = req.body;
    // B2: Kiem tra du lieu
    if (!body.name) {
        return res.status(400).json({
            mes: "name is required!"
        })
    }

    if (!body.imageUrl) {
        return res.status(400).json({
            mes: "imageUrl is required!"
        })
    }


    if (!body.buyPrice) {
        return res.status(400).json({
            mes: "buyPrice is required!"
        })
    }

    if (!Number.isInteger(body.buyPrice) || body.buyPrice < 0) {
        return res.status(400).json({
            mes: "buyPrice is invalid"
        })
    }

    if (!body.promotionPrice) {
        return res.status(400).json({
            mes: "promotionPrice is required!"
        })
    }

    if (!Number.isInteger(body.promotionPrice) || body.promotionPrice < 0) {
        return res.status(400).json({
            mes: "promotionPrice is invalid"
        })
    }

    if (!Number.isInteger(body.amount) || body.amount < 0) {
        return res.status(400).json({
            mes: "amount is invalid"
        })
    }
    try {
        const productUpdate = await productModel.findById(id)
        if (productUpdate !== null) {
            const updateResult = await productModel.findByIdAndUpdate({ _id: id },
                {
                    name: body.name,
                    description: body.description,
                    imageUrl: body.imageUrl,
                    buyPrice: body.buyPrice,
                    promotionPrice: body.promotionPrice,
                    amount: body.amount,
                },
                {
                    new: true
                })
            res.status(200).json(updateResult)
        }
        if (productUpdate == null) {
            return res.status(500).json({
                status: "Interal server error",
                product: null
            })
        }

    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - update",
            err: err.message
        })
    }
}

// 5. delete product by Id
const deleteProduct = async (req, res) => {
    let id = req.params.productId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            mes: "Id is invalid"
        })
    }
    try {
        const productDeleted = await productModel.findByIdAndDelete({ _id: id })
        if (!productDeleted) {
            return res.status(404).json({
                mes: "Object can not found"
            })
        }
        if (productDeleted) {
            return res.status(204).json()
        }
    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - delete",
            err: err.message
        })
    }
}

// B3: Export thành các module
module.exports = {
    createProduct, getAllProduct,
    getProductById, updateProduct,
    deleteProduct, getAllProductFull,
    getAllProductLimit8, getProductByFilter,
    getProductBySearch
}
