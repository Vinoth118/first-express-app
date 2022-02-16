const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const getSingleProduct = require('../middlewares/product')

router.route('/:id')
    .get(getSingleProduct, (req, res) => {
        res.status(200).json({
            success: true,
            data: res.product
        })
    })
    .patch(getSingleProduct, async(req, res) => {
        try {
            if(req.body.name != null) {
                res.product.name = req.body.name
            }
            if(req.body.category != null) {
                res.product.category = req.body.category
            }
            if(req.body.price != null) {
                res.product.price = req.body.price
            }
            const updatedProduct = await res.product.save();
            res.status(200).json({
                success: true,
                message: "Product Updated Successfully",
                updatedProduct: updatedProduct
            })
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            })
        }
    })
    .delete(getSingleProduct, async (req, res) => {
        try {
            await res.product.remove();
            res.status(200).json({
                success: true,
                message: "Product Deleted Successfully"
            })
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            })
        }
    })

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
})

router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });
    try {
        const newProduct = await product.save();
        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
})


module.exports = router;