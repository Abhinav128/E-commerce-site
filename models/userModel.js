const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    status: {
        type: String,
        default: 'active' // You can set a default status if needed
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false // By default, the user is not an admin
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

