
import PermissionError from '../../errors/permissionError';

module.exports = function (e) {

    return new Promise((resolve, reject) => {

        if (e.isUpdater.nModified < 1)
            throw new PermissionError('You dont have access');

        resolve(e);

    });


};
