var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gateway = mongoose.model('Gateway');
var wrapResult = require('../../util/wrap-result');

router.get('/', function (req, res, next) {
    var query = {};
    if (!!req.query.location) {
        query.type = {
            $regex: new RegExp(req.query.location, 'i')
        };
    }

    Gateway.find({}, function (err, docs) {
        if (err) {
            return next(err);
        }
        res.json(wrapResult(docs));
    });
});

router.post('/', function (req, res, next) {
    var newDoc = new Gateway(req.body);
    newDoc.save(function (err, savedDoc) {
        if (err) {
            return next(err);
        }

        res.json(wrapResult(savedDoc));
    });
});

router.get('/:id', function (req, res, next) {
    Gateway.findOne({id: req.params.id}, function (err, doc) {
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
    Gateway.findOne({id: req.params.id}, function (err, doc) {
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
