module.exports = function () {
    return function (req, res) {
        res.status(404).json({error: "resource not found"});
    };
};
