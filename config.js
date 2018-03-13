var path = require('path');

var confDir = process.env.CONFIG;

if (!confDir) {
    console.error('Cannot load configuration file: CONFIG variable not set.');
    process.exit(1);
}

try {
    module.exports = require(path.normalize(confDir));
} catch (e) {
    console.error('Cannot load configuration file: ' + e.message);
    process.exit(1);
}