const express = require('express');
const {getWeather, getWeatherCities} = require('../service/weather.service');
const {getPopularDishes} = require('../service/food.service');
const {getCurrency} = require('../service/currency.service');
const Country = require('../model/country.model');

const getTripController = (async(req, res, next) => {
    const { country } = req.params;
    const { days } = req.query;

    let country_name = country.toLowerCase()
    country_name = country_name.charAt(0).toUpperCase() + country_name.slice(1)
    let country_instance = await Country.findOne({
        name: country_name
    })

    const weather = await getWeather(country_instance.geometry.coordinates[1], country_instance.geometry.coordinates[0], days);
    let food = await getPopularDishes(country_instance.demonym);
    const currency = await getCurrency(country_instance.currency.code);

    res.send({
        country: country_instance,
        weather: weather,
        exchange_rate: currency,
        food: food?.data?.meals ? food.data.meals : []   
    });
})

const getCountriesController = (async(req, res, next) => {
    const { budget } = req.query;

    if (budget) {
        country_instance = await Country.find().select("name capital continent flag total_cost_per_day total_score happiness_level airfare language accommodation food");
        // Filter out countries that their total_cost_per_day is <= budget
        return res.send(country_instance.filter(country => country.total_cost_per_day <= budget));
    } 
    const countries = await Country.find().select("-_id name capital continent flag total_cost_per_day total_score happiness_level airfare language accommodation food");
    res.send(countries);
})


module.exports = {
    getTripController,
    getCountriesController,
}