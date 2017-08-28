'use strict';

const _ = require('lodash');
const DBRepository = require('core/repositories/DBRepository');
const {transfID} = require('core/applications/transforms/strIDtoObjectID');

const accessMergeTransform = require('./transforms/accessMergeTransform');


const RelationsSyncerService = (Entity) => (REntity) => {

    return {
        syncer: (data,  owner, source = '_id') => {

          return new Promise((resolve, reject) => {

              const _id = _.get(transfID(data, source), source);
              const path = `${Entity.name}._id`;

              const prepared = _.assign({},
                {[path]:_id},
                accessMergeTransform(owner, Entity.access)
              );

              DBRepository(REntity)
                      .count(prepared, [path])
                      .tap(total => {
                          const fielder = `${REntity.name}_count`;

                          return DBRepository(Entity)
                                .update({_id}, {[fielder]: total})
                                .catch(reject);
                      })
                      .then(resolve)
                      .catch(reject);
          });
        }

    };
};

module.exports = RelationsSyncerService;
