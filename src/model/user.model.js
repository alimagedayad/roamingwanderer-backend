const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const ApiError = require('../utils/ApiError');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const hashPassword = require('../utils/hashPassword');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        default: 'admin'
    }
})

userSchema.pre('save', async function(next){
    try {
        if(this.isModified('password')) {
            const user = this
            const hashed = await hashPassword(user.password)
            user.password = hashed
            next()
        }
        return next(null, this)
    } catch (err) {
        return next(err)
    }

})

userSchema.pre('findOneAndUpdate', async function(next) {
    try {
        if(this._update.password) {
            const hashed = await hashPassword(this._update.password)
            this._update.password = hashed
        }
    } catch (err) {
        return next(err)
    }
})

userSchema.method.generateHash = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null)
}

userSchema.method.validPassword = (pass) => {
    return bcrypt.compareSync(pass, this.password)
}

userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.password
        return ret
    }
})

userSchema.options.toJSON.transform = function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
};

userSchema.plugin(uniqueValidator, {message: 'is already taken.'})

module.exports = mongoose.model('User', userSchema)