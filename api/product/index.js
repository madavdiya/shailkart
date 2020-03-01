const express = require('express');
const productController = require('./product.controller');
const utils = require('../../helpers/utils');
const router = express.Router();

router
.get('/productList', utils.validateToken, productController.getProductList)
.post('/seed', productController.newProduct);

module.exports = router;