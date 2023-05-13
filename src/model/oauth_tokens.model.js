const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const { addSeconds } = require('date-fns');
const oauthTokensSchema = new Schema({
    issuer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'oauth',
    },
    token: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true,
        trim: true,
        lowercase: true
    }
})

module.exports = mongoose.model('OauthTokens', oauthTokensSchema);