module.exports = function () {
    return function (err, req, res, next) {
        if(err.name === 'ValidatorError') {
          res.status(400).json(err);
          next();
        }
        next(err);
    };
};
