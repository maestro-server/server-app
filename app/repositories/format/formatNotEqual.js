
module.exports = function (filter, fielder, id) {

    Object.assign(filter, {[fielder]: {$ne : id}});

};
