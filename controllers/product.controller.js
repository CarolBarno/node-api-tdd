/* eslint-disable */
const mongoose = require('mongoose');
const { Product } = require('../models/product.model');

const product = {};

product.getAllProducts = async (req, res) => {
    const products = await Product.find({});
    return res.send(products);
};

product.getProduct = async (req, res) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) { return res.status(400).send('Invalid object id'); }
    const product = await Product.findById(productId);
    if (!product) { return res.status(404).send('Product not found'); }
    return res.send(product);
};

product.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category
    });

    await product.save();
    return res.send(product);
};

product.updateProduct = async (req, res) => {
    const productId = req.params.id;
    Product.findOneAndUpdate(productId, req.body, { new: true })
        .then((product) => res.send(product))
        .catch((err) => res.status(500).send(err));
};

product.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    return res.send('Product deleted');
};

module.exports = product;
