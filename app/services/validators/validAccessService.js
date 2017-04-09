
const PermissionError = require('../../errors/permissionError');

module.exports = function (e) {

    return new Promise((resolve) => {

        if (!e)
            throw new PermissionError('You dont have access');

        resolve(e);

    });


};
