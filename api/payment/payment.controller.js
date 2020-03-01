const Payment = require('./payment.model');
const User = require('../user/user.model');
const Razorpay = require('razorpay');
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    createPayment: (req, res) => {
        const userId = req.decoded.id;
        const paymentId = req.params.paymentId;
        let instance = new Razorpay({
            key_id: process.env.RAZOR_PAY_TEST_KEY,
            key_secret: process.env.RAZOR_PAY_TEST_SECRET,
        });
        instance.payments.fetch(paymentId)
            .then(transaction => {
                transaction.itemsBought = req.body.itemsBought;
                transaction.createdAt = new Date();
                let data = {
                    transaction: transaction,
                    user: userId
                }
                new Payment(data).save((err, payment) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        User.findById(payment.user).exec()
                            .then(userInfo => {
                                if (userInfo) {
                                    userInfo.payments.push(payment);
                                    userInfo.save();
                                }
                            })
                            .catch(error => {
                                res.status(500).json(err);
                            })
                        return res.json({
                            'status': 201,
                            payment
                        });
                    }
                })
            })
            .catch(err => {
                console.log({
                    err
                });
                res.status(500).json(err);
            })
    },
}