'use strict';

const FactoryDBRepository = require('core/repositories/DBRepository');

module.exports = (Entity) => FactoryDBRepository(Entity, {upsert: true});
