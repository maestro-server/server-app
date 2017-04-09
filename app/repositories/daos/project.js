'use strict';

const Dao = require('./dao');

class ProjectDao extends Dao {

    static get db() {
        return 'projects';
    }


    collection () {
        return ProjectDao.db;
    }


}

module.exports = ProjectDao;
