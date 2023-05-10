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
    life_score: Joi.number().required(),
    happiness_level: Joi.string().required(),
    income_level: Joi.number().required(),
    live_cost: Joi.number().required(),
    rent_price: Joi.number().required(),
    total_score : Joi.number().required(),
    total_cost_per_day: Joi.number().required(),
})