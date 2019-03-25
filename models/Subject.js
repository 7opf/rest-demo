var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Subject = new Schema({
    id: {
        type: String,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                if (!this.isNew) {
                    // only validate for new docs
                    return cb(true);
                }
                var Model = mongoose.model('Subject');
                Model.findOne({id: v}, function (err, doc) {
                    return doc === null ? cb(true) : cb(false);
                })
            },
            message: 'Subject ID already exists.'
        },
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        enum: ['Object', 'Person'],
        trim: true,
        required: true
    }
});

mongoose.model('Subject', Subject);
