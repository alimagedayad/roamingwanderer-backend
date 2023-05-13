const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.countrySchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
    capital: Joi.string().required(),
    continent: Joi.string().required(),
    currency: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        symbol: Joi.string().required(),
    }).required(),
    language: Joi.string().required(),
    geometry: Joi.object({
        type: Joi.string().required(),
        coordinates: Joi.array().items(Joi.number()).required(),
    }).required(),
    demonym: Joi.string().required(),
    flag: Joi.string().required(),
    life_score: Joi.string().required(),
    happiness_level: Joi.string().required(),
    airfare: Joi.number().required(),
    food: Joi.number().required(),
    accommodation: Joi.number().required(),
})

module.exports.userSchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
    email: Joi.string().required().escapeHTML(),
    password: Joi.string().required().escapeHTML(),
    role: Joi.forbidden(),
})