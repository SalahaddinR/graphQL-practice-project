const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: { 
        type: String
    },
    email: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema)