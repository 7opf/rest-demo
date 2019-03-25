module.exports = function (req, res, next) {
    var msg = req.params.id === undefined ? 'Resource with ID=' + req.params.id : 'Endpoint ' + req.path;
    var notFoundError = new Error(msg + ' does not exist.');
    notFoundError.name = 'NotFoundError';
    next(notFoundError);
};
