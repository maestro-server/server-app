'use strict';

import Dao from './dao';

import {Model} from 'mongorito';

class AccessDao extends Dao {

    collection () {
        return 'access';
    }

}

module.exports = AccessDao;
