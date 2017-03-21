module.exports = function () {
    return function (err, req, res, next) {
        res.status(400).json(err);
        next();
    };
};
