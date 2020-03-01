module.exports = { 
    'init': function (app) {
        // Insert routes below
        app.use('/api/user', require('../api/user'));
        app.use('/api/product', require('../api/product'));
        app.use('/api/payment', require('../api/payment'));
    }
};