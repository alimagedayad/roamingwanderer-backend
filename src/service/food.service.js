const axios = require('axios');

const httpClient = axios.create()
httpClient.defaults.timeout = 1000;

const ApiError = require('../utils/ApiError');

const getPopularDishes = async (demonym) => {
    try{
        console.log(demonym)
        const response = await httpClient.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${demonym}`)
        if (response.data.meals === null) return new ApiError(404, "No dishes found")
        return response.data.meals
    }
    catch(error){
        if (error.code === 'ECONNABORTED') return new ApiError(500, "Timeout")
        return new ApiError(500, error.response)
    }
}
module.exports = {
    getPopularDishes
}