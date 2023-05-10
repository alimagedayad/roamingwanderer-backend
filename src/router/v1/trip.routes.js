const express = require('express');
const {getTripController, getCountriesController} = require('../../controller/trip.controller');
const router = express.Router();

router.get('/overview/:country', getTripController)
router.get('/countries', getCountriesController)

module.exports = router; 