'use strict';

import TeamDao from './daos/team';
import validTeam from './validators/validTeam';

import filledTransform from './transforms/filledTransform';
import activeTransform from './transforms/activeTransform';


class TeamsMembersRepository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled=null, filled=null) {
        this.setFilled(filled || ['name', 'email', 'url', 'avatar', 'owner', 'members', 'access', 'qtds']);
        this.setResFilled(resFilled || ['_id', 'name', 'email', 'url', 'avatar', 'owner', 'qtds']);
    }

    setFilled (val) {
      this.filled = val;
    }

    setResFilled (val) {
      this.resFilled = val;
    }


}

module.exports = TeamsRepository;
