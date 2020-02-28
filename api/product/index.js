const express = require('express');
const productController = require('./product.controller');
const utils = require('../../helpers/utils');
const router = express.Router();
const Product = require('./product.model');

router.get('/products', utils.verifyLogin, productController.getProductList)
module.exports = router;