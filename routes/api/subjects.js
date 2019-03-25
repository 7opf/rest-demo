var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');
var wrapResult = require('../../util/wrap-result');

router.get('/', function (req, res, next) {
    var query = {};
    if (!!req.query.type) {
        query.type = {
            $regex: new RegExp(req.query.type, 'i')
        };
    }

    Subject.find(query, function (err, docs) {
        if (err) {
            return next(err);
        }
        res.json(wrapResult(docs));
    });
});

router.post('/', function (req, res, next) {
    var newDoc = new Subject(req.body);
    newDoc.save(function (err, savedDoc) {
        if (err) {
            return next(err);
        }

        res.json(wrapResult(savedDoc));
    });
});

router.get('/:id', function (req, res, next) {
    Subject.findOne({id: req.params.id}, function (err, doc) {
        if (err) {
            return next(err);
        }

        if (!doc) {
            err = new Error('Subject with ID=' + req.params.id + ' does not exist.');
            err.name = 'ResourceNotFoundError';
            return next(err);
        }

        res.json(wrapResult(doc));
    });
});

router.put('/:id', function (req, res, next) {
    Subject.findOne({id: req.params.id}, function (err, doc) {
        if (err) {
            return next(err);
        }

        if (!doc) {
            err = new Error('Subject with ID=' + req.params.id + ' does not exist.');
            err.name = 'ResourceNotFoundError';
            return next(err);
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
