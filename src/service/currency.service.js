const axios = require('axios');
const ApiError = require('../utils/ApiError');

const getCurrency = async(currency) => {
    try{
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`)
        return response.data[currency]
    }
    catch(error){
        console.log(error)
        return new ApiError(500, error.response)
    }
}
module.exports = {
    getCurrency
}