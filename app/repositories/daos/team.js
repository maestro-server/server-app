'use strict';

const Dao = require('./dao');

const {Model} = require('mongorito');

class TeamDao extends Dao {

    collection () {
        return 'teams';
    }

}

module.exports = TeamDao;
