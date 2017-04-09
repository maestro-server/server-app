'use strict';

const Dao = require('./dao');

class ArchitectureDao extends Dao {

    static get db() {
        return 'architectures';
    }

    static get role() {
        return 'roles';
    }

    collection () {
        return ArchitectureDao.db;
    }

}

module.exports = ArchitectureDao;
