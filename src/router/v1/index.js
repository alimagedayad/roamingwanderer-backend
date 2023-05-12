const express = require('express');
const tripRouter = require('./trip.routes');
const adminRouter = require('./admin.routes');
const oauthRouter = require('./oauth.routes');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/trip',
    route: tripRouter,
  },
  {
    path: '/admin',
    route: adminRouter,
  },
  {
    path: '/oauth',
    route: oauthRouter,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;