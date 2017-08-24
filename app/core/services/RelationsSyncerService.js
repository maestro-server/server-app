'use strict';

const _ = require('lodash');
const DBRepository = require('core/repositories/DBRepository');
const {transfID} = require('core/applications/transforms/strIDtoObjectID');


const RelationsSyncerService = (Entity) => (REntity) => {

    return {
        syncer: (data, source = '_id') => {

          return new Promise((resolve, reject) => {

              const _id = _.get(transfID(data, source), source);
              const path = `${Entity.name}._id`;

              const fielder = `${REntity.name}_count`;

              DBRepository(REntity)
                      .count({[path]:_id}, [path])
                      .then(total => {
                          return DBRepository(Entity)
                                .update({_id}, {[fielder]: total})
                                .catch(console.log);
                      })
                      .then(resolve)
                      .catch(reject);
          });
        }

    };
};

module.exports = RelationsSyncerService;
