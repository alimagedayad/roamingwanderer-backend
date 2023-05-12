const OauthTokens = require('../model/oauth_tokens.model');
const ApiError = require('../utils/ApiError');

const verifyToken = async(token) => {
    try {
        const token_instance = await OauthTokens.findOne({
            token: token
        })
        if (!token_instance) {
            return false
        }

        if (token_instance.expires_at < new Date()) {
            return true
        }

        return false

    } catch (error) {
        console.log(error)
        return new ApiError(error.response, 500)
    }
}

module.exports = {
    verifyToken
}