const Product = require('./product.model');

module.exports = {
    getProductList: async (req, res) => {
        try {
            const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
            const products = await Product.find({}, undefined, { skip, limit: 12 }).sort('name');
            const count = await Product.count({});
            res.json({products, count});  
        } catch (e) {
            res.status(500).send()
        }
    },
    newProduct: async (req, res) => {
        try {
            const products = await Product.create(req.body.data);
            res.status(201).send()
        } catch (error) {
            res.status(500).send(error)
        }
    },
}