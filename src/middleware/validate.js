const { countrySchema } = require('../joiValidators');
const ApiError = require('../utils/ApiError');

module.exports.validateCountry = (req, res, next) => {
    const { error } = countrySchema.validate(req.body);
    if (error) {
        const message = `Validation error: ${error.details.map(x => x.message).join(', ')}`;
        throw new ApiError(400, message);
    } else {
        next();
    }
}