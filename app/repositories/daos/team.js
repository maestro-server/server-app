'use strict';

const Dao = require('./dao');

class TeamDao extends Dao {

    static get db() {
        return 'teams';
    }

    static get role() {
        return 'members';
    }

    collection () {
        return TeamDao.db;
    }

}

module.exports = TeamDao;
