'use strict';

const Dao = require('./dao');

const {Model} = require('mongorito');

class ProjectDao extends Dao {

    collection () {
        return 'projects';
    }


}

module.exports = ProjectDao;
