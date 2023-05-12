const express = require('express');
const router = express.Router();
const use = require('../../utils/use');
const { generateToken } = require('../../controller/oauth.controller');

router.route('/token')
    .post(use(generateToken))

module.exports = router;