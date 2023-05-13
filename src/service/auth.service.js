const jwt = require('jsonwebtoken');
const OauthTokens = require('../model/oauth_tokens.model');
const ApiError = require('../utils/ApiError');

const verifyToken = async(token) => {
    console.log("auth service: 1", token)
    try {
        const token_instance = await OauthTokens.findOne({
            token: token
        })

        if (!token_instance) {
            return false
        }
        if (token_instance.expires_at > new Date()) {
            return true
        }
        console.log(3)
        return false

    } catch (error) {
        throw new ApiError(error.response, 500)
    }
}

const verifyJWT = async(token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } 
    catch (error) {
        return false
    }
}

module.exports = {
    verifyToken,
    verifyJWT
}