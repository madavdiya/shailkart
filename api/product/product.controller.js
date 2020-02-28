const Product = require('./product.model');

module.exports = {
    getProductList: (req, res) => {
        Product.find({}).exec()
        .then(products => {
            res.json({products});
        })
        .catch(err => {
            res.status(500).json({err});
        })
    },
    newProduct: (req, res) => {
        let newProduct = new Product(req.body);
        newProduct.save((err, product) => {
            if (err) {
                return res.json(err);
            } else {
                return res.json({'status': 200, product});
            }
        });
    },
}