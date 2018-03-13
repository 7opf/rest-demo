function sanitizeDoc(doc) {
    var json = doc.toJSON();
    delete json._id;
    delete json.__v;
    return json;
}

module.exports = function (result) {
    if (Array.isArray(result)) {
        result = result.map(sanitizeDoc)
    } else {
        result = sanitizeDoc(result);
    }
    return {
        ok: true,
        result: result
    }
};