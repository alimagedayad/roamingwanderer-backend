const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const oauthSchema = new Schema({
    client_id: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    client_secret: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        default: crypto.randomBytes(64).toString('hex'),
    },
})

module.exports = mongoose.model('Oauth', oauthSchema);