'use strict';

const FlavorsPublic = require('../repositories/dao/flavorsPublic');
const {filled, singleFilled, resFilled, visibility, mapRelations, defaults, validators} = require('./Flavors');


const flavors = () => {

    return {
        name: "flavorsPublic",

        access: null,

        validators,

        dao: FlavorsPublic,

        defaults,
        mapRelations,
        visibility,
        filled,
        singleFilled,
        resFilled
    };
};

module.exports = flavors();
