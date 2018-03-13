module.exports = function (req, res, next) {
    var notFoundError = new Error('Endpoint ' + req.path + ' not found.');
    notFoundError.name = 'NotFoundError';
    next(notFoundError);
};