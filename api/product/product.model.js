  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: { type: String, required: true},
    image: { type: String, default: null, required: true},
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);