const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: {
                price: {
                    type: Number,
                    required: true,
                },
                compareAtPrice:  {
                    type: Number,
                    required: true,
                },
                costPerItem:  {
                    type: Number,
                    required: true,
                }
            },
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema)