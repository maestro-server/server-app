
import PermissionError from '../../errors/permissionError';

module.exports = function (e) {

    return new Promise((resolve, reject) => {

        if (e.isUpdater.n < 1)
            throw new PermissionError('You dont have access');

        resolve(e);

    });


};
