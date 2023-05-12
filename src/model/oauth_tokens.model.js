const mongoose = require('mongoose');
const crypto = require('crypto');
const { addSeconds } = require('date-fns');
const Schema = mongoose.Schema;

const oauthTokensSchema = new Schema({
    issuer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'oauth',
    },
    token: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    expires_at: {
        type: Date,
        required: true,
        trim: true,
        lowercase: true,
        default: addSeconds(new Date(), 120),
    }
})

module.exports = mongoose.model('OauthTokens', oauthTokensSchema);