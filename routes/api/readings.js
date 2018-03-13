var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Reading = mongoose.model('Reading');
var wrapResult = require('../../util/wrap-result');

router.get('/', function (req, res, next) {
    var query = {};
    if (!!req.query.type) {
        query.type = {
            $regex: new RegExp(req.query.type, 'i')
        };
    }

    if (!!req.query.sensor) {
        query.type = req.query.sensor;
    }

    if (!!req.query.gateway) {
        query.type = req.query.gateway;
    }

    if (!!req.query.timestamp ) {
        query.timestamp = {};
        if (Array.isArray(req.query.timestamp)) {
            query.timestamp.$gte = new Date(req.query.timestamp[0]);
            query.timestamp.$lt = new Date(req.query.timestamp[1]);
        } else {
            query.timestamp.$gte = new Date(req.query.timestamp);
        }
    } else {
        query.timestamp = {
            $gte: new Date(Date.now() - 1000 * 60 * 60 * 24)
        };
    }

    Reading.find(query, function (err, docs) {
        if (err) {
            return next(err);
        }
        res.json(wrapResult(docs));
    });
});

router.post('/', function (req, res, next) {
    delete req.body.id;
    var newDoc = new Reading(req.body);
    newDoc.save(function (err, savedDoc) {
        if (err) {
            return next(err);
        }

        res.json(wrapResult(savedDoc));
    });
});

router.get('/:id', function (req, res, next) {
    Reading.findOne({id: req.params.id}, function (err, doc) {
        if (err) {
            return next(err);
        }

        if (!doc) {
            return next();
        }

        res.json(wrapResult(doc));
    });
});

module.exports = router;
