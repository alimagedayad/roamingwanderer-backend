const User = require('../model/user.model');
const { validateUser } = require('../middleware/validate');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const getUsersController = (async(req, res, next) => {
    const users = await User.find();
    res.set('Content-Range', `users 0-${users.length}/${users.length}`);
    res.set('X-Total-Count', users.length)
    res.set('Access-Control-Expose-Headers', 'Content-Range')
    res.send(users);
})

const createUserController = (async(req, res, next) => {
    const user = await User.create(req.body);
    res.send(user);
})

const getUserController = (async(req, res, next) => {
    const { user } = req.params;
    const user_instance = await User.findOne({
        _id: user
    })
    if (!user_instance) {
        throw new ApiError('User not found', httpStatus.NOT_FOUND, );
    }
    res.send(user_instance);
})

const putUserController = (async(req, res, next) => {
    const { user } = req.params;
    const user_instance = await User.findOneAndUpdate({
        _id: user
    }, req.body, {new: true})
    if (!user_instance) {
        throw new ApiError('User not found', httpStatus.NOT_FOUND, );
    }
    res.send(user_instance);
})

const deleteUserController = (async(req, res, next) => {
    const { user } = req.params;
    const user_instance = await User.findOneAndDelete({
        _id: user
    })
    if (!user_instance) {
        throw new ApiError('User not found', httpStatus.NOT_FOUND, );
    }
    res.status(200).send({
        id: user_instance._id,
    })
})

module.exports = {
    getUsersController,
    createUserController,
    getUserController,
    putUserController,
    deleteUserController
}