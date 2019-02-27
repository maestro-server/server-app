'use strict';

const _ = require('lodash');

function ip(publicip = false, foct=10) {

    if (publicip)
        foct = _.random(176, 215)

    return (foct) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
}

module.exports = ip;
