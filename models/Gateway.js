var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Gateway = new Schema({
    id: {
        type: String,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                var self = this;
                var Model = mongoose.model('Gateway');
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
