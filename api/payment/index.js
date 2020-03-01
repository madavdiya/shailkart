const express = require('express');
const paymentController = require('./payment.controller');
const utils = require('../../helpers/utils');
const router = express.Router();

router.post('/createPayment', utils.validateToken, paymentController.createPayment);

module.exports = router;