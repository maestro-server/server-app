'use strict';

import Dao from './dao';

import {Model} from 'mongorito';

class ProjectDao extends Dao {

    collection () {
        return 'projects';
    }


}

module.exports = ProjectDao;
