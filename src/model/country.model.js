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

    food: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    airfare: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    accommodation: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
}, {
    timestamps: true,
    useVirtuals: true,
});

countrySchema.virtual('total_cost_per_day').get(function() {
    return this.food + this.airfare + this.accommodation;
});

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