'use strict';

const _ = require('lodash');

const DRelationsSyncerService = require('core/services/RelationsSyncerService');


const RelationsApp = (Entity, REntity, RelationsSyncerService = DRelationsSyncerService) => {

    return {
        syncer: (req, res, next) => {
            const source = 'params.id';

            RelationsSyncerService(Entity)(REntity)
                .syncer(req, source)
                .then(e => res.json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(RelationsApp);
