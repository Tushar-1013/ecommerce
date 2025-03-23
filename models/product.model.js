const mongoose = require('mongoose')

const productModel = mongoose.Schema({
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
        type: Number
    },
})


const productData = mongoose.model('products', productModel)
module.exports = productData