const {verifyToken} = require('../service/oauth.service');
const ApiError = require('../utils/ApiError');

module.exports.validateToken = async(req, res, next) => {

    if (req.originalUrl === '/v1/oauth/token') {
        return next()
    }

    const token = req.headers.oauth_token;
    if (!token) {
        throw new Error('Access token not found', 401)
    }


    console.log("token: ", token)
    const isValidToken = await verifyToken(token);
    if (!isValidToken) {
        throw new Error('Invalid access token', 401)
    }
    next()
}

