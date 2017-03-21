module.exports = function () {
    return function (err, req, res, next) {
        if(err.name === 'ConflictError') {
          res.status(409).json(err);
          next();
        }
        next(err);
    };
};
