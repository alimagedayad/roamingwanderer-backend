const {countrySchema, userSchema} = require('../../joiValidators');
const ApiError = require('../utils/ApiError');

const validateCountry = (req, res, next) => {
    const { error } = countrySchema.validate(req.body);
    if (error) {
        throw new ApiError(error.details[0].message, 422)
    } else {
        next();
    }
}

const validateUser = (req, res, next) => {
    const {error} = userSchema.validate(req.body);
    if (error) {
        throw new ApiError(error.details[0].message, 422)
    } else {
        next()
    }
}

module.exports = {
    validateCountry,
    validateUser
}