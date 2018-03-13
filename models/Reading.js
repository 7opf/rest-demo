var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');

var Reading = new Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
    unit: {
        type: String,
        trim: true
    },
    sensor: {
        type: String,
        trim: true,
        ref: 'Sensor',
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                var Model = mongoose.model('Sensor');
                Model.findOne({id: v}, function (err, doc) {
                    return !!doc ? cb(true) : cb(false);
                })
            },
            message: 'Sensor ID does not exist.'
        }
    },
    gateway: {
        type: String,
        trim: true,
        ref: 'Gateway',
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                var Model = mongoose.model('Gateway');
                Model.findOne({id: v}, function (err, doc) {
                    return !!doc ? cb(true) : cb(false);
                })
            },
            message: 'Gateway ID does not exist.'
        }
    },
    timestamp: {
        type: Date,
        required: true
    }
});

mongoose.model('Reading', Reading);