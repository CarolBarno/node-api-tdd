/* eslint-disable */
const express = require('express');

const router = express.Router();
const controller = require('../controllers/product.controller');

router
    .route('/')
    .get(controller.getAllProducts)
    .post(controller.createProduct);

router
    .route('/id:')
    .get(controller.getProduct)
    .put(controller.updateProduct)
    .delete(controller.deleteProduct);

module.exports = router;