module.exports = function () {
    return function (req, res, next) {
        res.status(404).json({error: "resource not found"});
    };
};
