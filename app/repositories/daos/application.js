'use strict';

import Dao from './dao';

import {Model} from 'mongorito';

class ApplicationDao extends Dao {

    collection () {
        return 'applications';
    }

}

module.exports = ApplicationDao;
