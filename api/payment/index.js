const express = require('express');
const paymentController = require('./payment.controller');
const utils = require('../../helpers/utils');
const router = express.Router();

router.post('/savePayment/:paymentId', utils.validateToken, paymentController.createPayment)

module.exports = router;