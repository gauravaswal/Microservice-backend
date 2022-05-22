const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginTokenSchema = new Schema({
    name: String,
    token: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    email: {
        type: String
    }

});
const Logintoken = mongoose.model('Logintoken', loginTokenSchema);
module.exports = Logintoken
