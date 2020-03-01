const Payment = require('./payment.model');
const User = require('../user/user.model');
module.exports = {
    createPayment: (req, res) => {
        const userId = req.decoded.id;
        const {transaction} = req.body
        let data = {
            transaction: transaction,
            user: userId
        }
        console.log(data);
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
                return res.json({'status': 201, payment});
            }
        })
    },
}