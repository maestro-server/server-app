module.exports = function () {
    return function (err, req, res, next) {

        if(err.name === 'PermissionError') {
          res.status(401).json(err);
          next();
        }
        next(err);
    };
};
