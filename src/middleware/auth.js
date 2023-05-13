const {verifyToken, verifyJWT} = require('../service/auth.service');
const User = require('../model/user.model');
const ApiError = require('../utils/ApiError');

module.exports.validateToken = async(req, res, next) => {

    if (req.originalUrl === '/v1/oauth/token') {
        return next()
    }

    const token = req.headers.oauth_token;
    if (!token) {
        throw new ApiError('Access token not found', 401)
    }

    const isValidToken = await verifyToken(token);
    if (!isValidToken) {
        throw new ApiError('Invalid access token', 401)
    }
    next()
}

module.exports.validateJWT = async(req, res, next) => {
    if (req.originalUrl === '/v1/admin/login') {
        return next()
    }
    let token = req.headers.authorization;

    if (!token) {
        throw new ApiError('token not found', 401)
    }
    token = token.split(' ')[1];
    console.log("token: ", req.headers.authorization)
    const isValidToken = await verifyJWT(token);
    
    if (!isValidToken) {
        throw new ApiError('Invalid token', 401)
    }

    const user = await User.findOne({
        _id: isValidToken
    })
    if (!user) {
        throw new ApiError('Invalid token', 401)
    }
    req.user = user
    next()
}