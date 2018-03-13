var mongoose = require('mongoose');
var conf = require('./config');
var track = require('mongoose-trackable');

mongoose.connect(conf.mongo.uri);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// updatedAt and createdAt plugin for all models
mongoose.plugin(track);

// register models
require('./models');