module.exports = { 
    'init': function (app) {
        // Insert routes below
        app.use('/api/user', require('../api/user'));
    }
};