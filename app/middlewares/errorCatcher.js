module.exports = function () {
    return function (err, req, res, next) {
        console.log(err);
        res.status(500).json({error:err.message});
    };
};
