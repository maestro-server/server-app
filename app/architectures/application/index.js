'use strict';

const Architecture = require('../entities/Architecture');


/**
 *
 * Architecture is Entity to call persisntece layer
 */
const PersistenceApp = require('applications/persistenceApplication')(Architecture);


module.exports = {

    list: PersistenceApp.find,

    single: PersistenceApp.findOne,

    update: PersistenceApp.update,

    create: PersistenceApp.create,

    delete: PersistenceApp.remove

}
