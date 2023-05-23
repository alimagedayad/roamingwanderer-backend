const axios = require('axios');
const ApiError = require('../utils/ApiError');
const getWeather = async (lat, long, days=7) => {
    try{
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=${days}`)
        const data = response.data.daily
        const tempMax = data.temperature_2m_max;
        const tempMin = data.temperature_2m_min;
        const dates = data.time;
        const result = []
        for(let i = 0; i < dates.length; i++) {
            const date = dates[i]
            const temp_max = tempMax[i]
            const temp_min = tempMin[i]
            result.push({
                date,
                min: temp_min,
                max: temp_max,
                unit: "°C"
            })
        }
        return result
    }
    catch(error){
        return new ApiError(500, error.response.data.reason)
    }
}


const getWeatherCities = async(cities) => {
    const weatherList = await Promise.all(cities.map(async(city) => {
        const weather = await getWeather(city.geometry.coordinates[1], city.geometry.coordinates[0]);
        return {
            city,
            // weather
        }
    }))
    return weatherList
}

module.exports = {
    getWeather,
    getWeatherCities
}