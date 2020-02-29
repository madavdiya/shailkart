  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PaymentSchema = new Schema({
    transations: { type: Object },
    user: {type: Schema.ObjectId, ref: 'User', index: true},
});

module.exports = mongoose.model('Payment', PaymentSchema);