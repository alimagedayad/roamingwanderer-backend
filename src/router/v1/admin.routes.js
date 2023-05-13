const express = require('express');
const router = express.Router();
const use = require('../../utils/use');
const { getCountriesController, createCountryController, getCountryController, putCountryController, deleteCountryController } = require('../../controller/admin.controller');
const { getUsersController, createUserController, getUserController, putUserController, deleteUserController } = require('../../controller/user.controller');
const { signInController } = require('../../controller/auth.controller');
const { validateCountry, validateUser } = require('../../middleware/validate');
const { validateJWT } = require('../../middleware/auth');

router.use(use(validateJWT))

router.route('/country')
    .get(getCountriesController)
    .post(validateCountry, use(createCountryController))

router.route('/country/:country')
    .get(use(getCountryController))
    .put(validateCountry, use(putCountryController))
    .delete(use(deleteCountryController))

router.route('/user')
    .get(getUsersController)
    .post(validateUser, use(createUserController))

router.route('/user/:user')
    .get(use(getUserController))
    .put(use(putUserController))
    .delete(use(deleteUserController))

router.route('/login')
    .post(use(signInController))

module.exports = router;