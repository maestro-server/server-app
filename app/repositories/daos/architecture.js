'use strict';

import Dao from './dao';

import {Model} from 'mongorito';

class ArchitectureDao extends Dao {

    collection () {
        return 'architectures';
    }

}

module.exports = ArchitectureDao;
