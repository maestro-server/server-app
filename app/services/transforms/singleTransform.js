
import insertHateoasSingle from '../helpers/insertHateoasSingle';

module.exports = function (data, uri="") {

    return new Promise((resolve, reject) => {

        resolve(insertHateoasSingle(data, uri));

    });
};
