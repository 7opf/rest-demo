var express = require('express');
var router = express.Router();
var sensors = require('./sensors');
var gateways = require('./gateways');
var readings = require('./readings');
var subjects = require('./subjects');
var apiError = require('../../middleware/api-error');
var apiNotFound = require('../../middleware/api-not-found');

router.get('/', function(req, res, next) {
  res.redirect('https://documenter.getpostman.com/collection/view/3872201-eaa7fa05-c132-4f26-aca7-c4d66a1ed5a3#68cab93d-8b2d-400c-8b99-3dba0c9d3d0d');
});

router.use('/sensors', sensors);
router.use('/gateways', gateways);
router.use('/readings', readings);
router.use('/subjects', subjects);

router.use(apiNotFound);
router.use(apiError);

module.exports = router;
