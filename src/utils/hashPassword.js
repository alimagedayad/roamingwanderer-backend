const bcrypt = require('bcryptjs');
const ApiError = require('./ApiError');

const hashPassword = async(password) => {
    console.log(`hashPassword raw:${password}`)
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (err) {
        throw new ApiError(err.message, 500)
    }
}

module.exports = hashPassword

