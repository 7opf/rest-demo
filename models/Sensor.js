var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sensor = new Schema({
    id: {
        type: String,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                var self = this;
                var Model = mongoose.model('Sensor');
                Model.findOne({id: v}, function (err, doc) {
                    if (err) {
                        return cb(false, 'Database error');
                    }

                    // if id doesn't exist we can create it
                    if (!doc) {
                        return cb(true);
                    }

                    // may change own id only if it doesn't already exist
                    return doc.get('_id').equals(self.get('_id')) ? cb(true) : cb(false);
                });
            },
            message: 'Sensor ID already exists.'
        },
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        default: 'Unnamed'
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    subject: {
        type: String,
        ref: 'Subject',
        trim: true,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                var Model = mongoose.model('Subject');
                Model.findOne({id: v}, function (err, doc) {
                    return !!doc ? cb(true) : cb(false);
                })
            },
            message: 'Subject ID does not exist.'
        }
    }
});

Sensor.virtual('readings', {
    ref: 'Reading',
    localField: 'id',
    foreignField: 'sensor'
});

mongoose.model('Sensor', Sensor);
