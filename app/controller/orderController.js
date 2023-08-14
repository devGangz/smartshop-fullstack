// B1: Import voucher Model
const { default: mongoose } = require('mongoose');
const orderModel = require('../models/orderModel')

// B2: Tạo các function CRUD

// 1. create a new voucher
const createOrder = async (req, res) => {
    // B1: Thu thap du lieu
    let body = req.body;
    // B3: Xu li va hien thi ket qua
    let newOrder = new orderModel({ ...body });
    try {
        res.status(201).json(await newOrder.save())
    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - create",
            err: err.message
        })
    }
}

// 2. get all product
const getAllOrder = async (req, res) => {
    try {
        const allOrder = await orderModel.find();
        res.status(200).json({ allOrder })

    } catch (error) {
        return res.status(500).json({
            status: "Interal server error - get all",
            product: null
        })
    }
}

// 3. get order by Id
const getOrderById = async (req, res) => {
    let id = req.params.orderId
    try {
        const order = await orderModel.findById(id)
        if (order == null) {
            return res.status(500).json({
                status: "Interal server error",
                voucher: null
            })
        }
        if (order !== null) {
            return res.status(200).json({ order })
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: "Interal server error - get one",
            voucher: null
        })
    }
}

// B3: Export thành các module
module.exports = { createOrder, getOrderById, getAllOrder }
