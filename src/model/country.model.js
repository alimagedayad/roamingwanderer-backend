const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    capital: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    continent: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    currency: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            trim: true,
        },
        symbol: {
            type: String,
            required: true,
            trim: true,
        }
    },
    language: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    demonym: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    flag: {
        type: String,
        required: true,
        trim: true,
    },
    life_score: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    happiness_score: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    income_level: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    live_cost: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    rent_price: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    total_score: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    total_cost_per_day: {
        type: Number,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
    useVirtuals: true,
});

module.exports = mongoose.model('Country', countrySchema, 'countries');