'use strict';

/*
hooks: {
  after_create: {
    createEmptyChecksum: {
        entity: 'servers',
        fill: filled //array with allowed fields
    }
  }
},
*/
const _ = require('lodash');

const createEmptyChecksum = () => (data) => {
    _.set(data, 'checksum', 'tombstone');

    return data;
};

module.exports = createEmptyChecksum;
