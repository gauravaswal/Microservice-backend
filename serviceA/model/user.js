const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String
    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String
    },
    password: {
        type: String
    }

});
const User = mongoose.model('User', userSchema);
module.exports = User