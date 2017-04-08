'use strict';

const RolesRepository = require('./rolesRepository');
const TeamDao = require('./daos/team');


class TeamMembersRepository extends RolesRepository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled = null, filled = null) {
        super(resFilled, filled);

        this.dao = TeamDao;
    }

}

module.exports = TeamMembersRepository;
