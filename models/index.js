// load all models in the directory (registers models in mongoose)
var fs = require("fs");

fs.readdirSync(__dirname).forEach(function (file) {
    if (file !== 'index.js') {
        require("./" + file);
    }
});