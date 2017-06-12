'use strict';

const Team = require('../entities/Teams');

/**
 *
 * Entity to call persisntece layer
 */
const PersistenceApp = require('applications/persistenceApplication')(Team);

module.exports = {

    list: PersistenceApp.find,

    single: PersistenceApp.findOne,

    update: PersistenceApp.update,

    create: PersistenceApp.create,

    delete: PersistenceApp.remove

}

