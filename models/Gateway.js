var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Gateway = new Schema({
    id: {
        type: String,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                var Model = mongoose.model('Gateway');
                Model.findOne({id: v}, function (err, doc) {
                    return doc === null ? cb(true) : cb(false);
                })
            },
            message: 'Gateway ID already exists.'
        },
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        default: 'Unnamed'
    },
    location: {
        type: String,
        trim: true,
        required: true
    }
});

mongoose.model('Gateway', Gateway);