'use strict';

const _ = require('lodash');
const DFactoryDBRepository = require('core/repositories/DBRepository');

const {transfID} = require('core/applications/transforms/strIDtoObjectID');


const relationInc = (configs) => (data)  => {
  const {Entity, field, source} = configs;


  if(_.has(data, source)) {
    const inc = _.get(configs, 'inc', 1);

    const DBRepository = DFactoryDBRepository(Entity);
    const _id = _.get(transfID(data, source), source);

    if(_id) {
      const post = {[field]: inc};

      DBRepository
        .increment({_id}, post)
        .catch(console.log);
    }
  }


  return data;
};

module.exports = relationInc;
