const Product = require('../models/product');

async function getSingleProduct (req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id)
        if(product == null) {
            return res.status(404).json({ 
                success: false, 
                message: "Cannot find product"
            })
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }

    res.product = product;
    next();
}

module.exports = getSingleProduct;