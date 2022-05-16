/* eslint-disable */
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
});

module.exports.Product = mongoose.model('Product', productSchema);