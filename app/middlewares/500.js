module.exports = function () {
    return function (err, req, res) {
        res.status(500).json({error:err.message});
    };
};
