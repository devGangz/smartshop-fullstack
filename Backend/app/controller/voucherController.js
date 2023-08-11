// B1: Import voucher Model
const { default: mongoose } = require('mongoose');
const voucherModel = require('../models/voucherModel')

// B2: Tạo các function CRUD

// 1. create a new voucher
const createVoucher = async (req, res) => {
    // B1: Thu thap du lieu
    let body = req.body;
    // B3: Xu li va hien thi ket qua
    let newVoucher = new voucherModel({ ...body });
    try {
        res.status(201).json(await newVoucher.save())
    } catch (err) {
        return res.status(500).json({
            status: "Interal server error - create",
            err: err.message
        })
    }
}



// 2. get all product
const getAllVoucher = async (req, res) => {
    //B3: Xu ly ket qua tra ve
    try {
        const allVoucher = await voucherModel.find();
        res.status(200).json({ allVoucher })

    } catch (error) {
        return res.status(500).json({
            status: "Interal server error - get all",
            product: null
        })
    }
}




// 3. get voucher by Id
const getVoucherById = async (req, res) => {
    //B1: Thu thap du lieu
    let vCode = req.params.voucherId
    console.log("vcode", vCode);
    try {
        const voucher = await voucherModel.find({ voucherCode: vCode })
        if (voucher == null) {
            return res.status(500).json({
                status: "Interal server error",
                voucher: null
            })
        }
        if (voucher !== null) {
            return res.status(200).json({ voucher })
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
module.exports = { createVoucher, getVoucherById, getAllVoucher }
