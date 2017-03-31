
import insertHateoasArray from '../helpers/insertHateoasArray';

module.exports = function (item, fielder) {

    return new Promise((resolve, reject) => {

        item[fielder] = insertHateoasArray(item[fielder]);
        resolve(item);

    });
};
