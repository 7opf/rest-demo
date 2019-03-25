module.exports = function (err, req, res, next) {
    var errors = [];
    switch (err.name) {
        case 'ValidationError':
            res.status(400);
            errors = Object.keys(err.errors).map(function (key) {
                return err.errors[key].message;
            });
            break;
        case 'EndpointNotFoundError':
            res.status(404);
            errors.push(err.message);
            break;
        case 'ResourceNotFoundError':
            res.status(404);
            errors.push(err.message);
            break;
        case 'MongoError':
            res.status(500);
            errors.push('Database error.');
            break;
        default:
            res.status(500);
            errors.push(err.message);
    }

    res.json({
        ok: false,
        errors: errors
    });
};
