'use strict';

const Dao = require('./dao');

const {Model} = require('mongorito');

class ApplicationDao extends Dao {

    collection () {
        return 'applications';
    }

}

module.exports = ApplicationDao;
