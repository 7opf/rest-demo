var express = require('express');
var router = express.Router();
var sensors = require('./sensors');
var gateways = require('./gateways');
var readings = require('./readings');
var subjects = require('./subjects');
var apiError = require('../../middleware/api-error');
var apiNotFound = require('../../middleware/api-not-found');

router.get('/', function(req, res, next) {
  res.redirect('https://documenter.getpostman.com/view/3872201/RVnVGMF1');
});

router.use('/sensors', sensors);
router.use('/gateways', gateways);
router.use('/readings', readings);
router.use('/subjects', subjects);

router.use(apiNotFound);
router.use(apiError);

module.exports = router;
