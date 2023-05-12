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
        type: String,
        required: true,
        trim: true,
    },
    happiness_level: {
        type: String,
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

// countrySchema.virtual('id').get(function() {
//     return this._id.toHexString();
// });

countrySchema.set('toJSON', {
    virtuals: true,
});

// remove _id
countrySchema.options.toJSON.transform = function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
};

module.exports = mongoose.model('Country', countrySchema, 'countries');