var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sensor = mongoose.model('Sensor');
var wrapResult = require('../../util/wrap-result');

router.get('/', function (req, res, next) {
    var query = {};
    if (!!req.query.type) {
        query.type = {
            $regex: new RegExp(req.query.type, 'i')
        };
    }

    if (!!req.query.subject) {
        query.subject = req.query.subject;
    }

    Sensor.find(query, function (err, docs) {
        if (err) {
            return next(err);
        }
        res.json(wrapResult(docs));
    });
});

router.post('/', function (req, res, next) {
    var newDoc = new Sensor(req.body);
    newDoc.save(function (err, savedDoc) {
        if (err) {
            return next(err);
        }

        res.json(wrapResult(savedDoc));
    });
});

router.get('/:id', function (req, res, next) {
    Sensor.findOne({id: req.params.id}, function (err, doc) {
        if (err) {
            return next(err);
        }

        if (!doc) {
            return next();
        }

        res.json(wrapResult(doc));
    });
});

router.put('/:id', function (req, res, next) {
    Sensor.findOne({id: req.params.id}, function (err, doc) {
        if (err) {
            return next(err);
        }

        if (!doc) {
            return next();
        }

        doc.set(req.body);
        doc.save(function (err, savedDoc) {
            if (err) {
                return next(err);
            }

            res.json(wrapResult(savedDoc));
        });
    });
});

module.exports = router;
