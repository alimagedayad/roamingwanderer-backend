const Country = require('../model/country.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const getCountriesController = (async(req, res, next) => {
    const countries = await Country.find();
    res.set('Content-Range', `country 0-${countries.length}/${countries.length}`);
    res.set('X-Total-Count', countries.length)
    res.set('Access-Control-Expose-Headers', 'Content-Range')
    res.send(countries);
})

const createCountryController = (async(req, res, next) => {
    console.log(1)
    const country = await Country.create(req.body);
    res.send(country);
    console.log(2)
})

const getCountryController = (async(req, res, next) => {
    const { country } = req.params;
    const country_instance = await Country.findOne({
        _id: country
    })
    if (!country_instance) {
        throw new ApiError('User not found', httpStatus.NOT_FOUND, );
    }
    res.send(country_instance);
})

const putCountryController = (async(req, res, next) => {
    const { country } = req.params;
    const country_instance = await Country.findOneAndUpdate({
        _id: country
    }, req.body, {new: true})
    res.send(country_instance);
})

const deleteCountryController = (async(req, res, next) => {
    const { country } = req.params;
    const country_instance = await Country.findOneAndDelete({
        _id: country
    })
    if (!country_instance) {
        throw new ApiError('Country not found', httpStatus.NOT_FOUND, );
    }
    res.status(200).send({
        id: country_instance._id,
    })
})

module.exports = {
    getCountriesController,
    createCountryController,
    getCountryController,
    putCountryController,
    deleteCountryController
}