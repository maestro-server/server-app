'use strict';

const insertHateoasSingle = require('../helpers/insertHateoasSingle');

module.exports = function (data, uri="") {

    return new Promise((resolve) => {

        resolve(insertHateoasSingle(data, uri));

    });
};
