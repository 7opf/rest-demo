var express = require('express');
var router = express.Router();
var async = require('async');
var mongoose = require('mongoose');
var Sensor = mongoose.model('Sensor');
var Gateway = mongoose.model('Gateway');
var Reading = mongoose.model('Reading');
var Subject = mongoose.model('Subject');

/* GET home page. */
router.get('/', function (req, res, next) {
    async.parallel({
        sensors: async.apply(Sensor.find.bind(Sensor), {}),
        gateways: async.apply(Gateway.find.bind(Gateway), {}),
        subjects: async.apply(Subject.find.bind(Subject), {}),
        readings: async.apply(Reading.find.bind(Reading), {})
    }, function (err, result) {
        if (err) {
            return next(err);
        }

        res.render('index', result)
    });
});

module.exports = router;
