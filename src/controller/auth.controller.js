const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../model/user.model');
const hashPassword = require('../utils/hashPassword');

module.exports.signInController = (async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            error: 'Invalid request'
        })
    }

    const user = await User.findOne({
        email: email
    })

    if (!user) {
        return res.status(401).send({
            error: 'Invalid credentials'
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send({
            error: 'Invalid credentials'
        })
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET)

    res.send({
        jwt: token,
        user: user
    })
})