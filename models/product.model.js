const mongoose = require('mongoose')

const productModel = mongoose.Schema({

    productimage: {
        type: String,
    },
    productname: {
        type: String,
    },

    category: {
        type: String,
    },

    subcategory: {
        type: String,
    },

    productdes: {
        type: String,
    },

    price: {
        type: Number,
    },

    img: {
        type: String,
        required: true,
    },
})


const productData = mongoose.model('product', productModel)
module.exports = productData