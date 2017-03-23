'use strict';

import Dao from './dao';

import {Model} from 'mongorito';

class TeamDao extends Dao {

    collection () {
        return 'teams';
    }

}

module.exports = TeamDao;
