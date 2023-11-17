const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'active'
    },
    productName: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
    
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;