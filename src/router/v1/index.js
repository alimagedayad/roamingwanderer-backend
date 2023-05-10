const express = require('express');
const tripRouter = require('./trip.routes');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/trip',
    route: tripRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;