'use strict';

const Dao = require('./dao');

class ApplicationDao extends Dao {

    static get db() {
        return 'core/applications';
    }

    static get role() {
        return 'roles';
    }

    collection () {
        return ApplicationDao.db;
    }


}

module.exports = ApplicationDao;
