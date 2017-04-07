'use strict';

const Dao = require('./dao');

const {Model} = require('mongorito');

class ArchitectureDao extends Dao {

    collection () {
        return 'architectures';
    }

}

module.exports = ArchitectureDao;
