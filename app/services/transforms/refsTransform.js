
const insertHateoasArray = require('../helpers/insertHateoasArray');

module.exports = function (item, fielder) {

    return new Promise((resolve, reject) => {

        if (!item)
            reject();

        if (item.hasOwnProperty(fielder))
            item[fielder] = insertHateoasArray(item[fielder]);

        resolve(item);

    });
};
