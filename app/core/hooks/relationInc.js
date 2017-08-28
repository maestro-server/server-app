'use strict';

/*
hooks: {
  after_create: {
    relationInc: {
      Entity: require('inventory/entities/Datacenter'),
      field: 'servers_count',
      source: 'datacenters._id'
    }
  }
},
*/

const _ = require('lodash');
const DFactoryDBRepository = require('core/repositories/DBRepository');

const {transfID} = require('core/applications/transforms/strIDtoObjectID');

const relationInc = (configs) => (data)  => {
  const {Entity, field} = configs;
  const source = _.get(configs, 'source', `${Entity.name}._id`);

  if(_.has(data, source)) {
    const inc = _.get(configs, 'inc', 1);

    const DBRepository = DFactoryDBRepository(Entity);
    const _id = _.get(transfID(data, source), source);

    if(_id) {
      const post = {[field]: inc};

      DBRepository
        .increment({_id}, post)
        .catch(console.log);

      return post;
    }
  }


  return data;
};

module.exports = relationInc;
