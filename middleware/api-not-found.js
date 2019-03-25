module.exports = function (req, res, next) {
    var notFoundError = new Error('Endpoint ' + req.path + ' does not exist.');
    notFoundError.name = 'EndpointNotFoundError';
    next(notFoundError);
};
