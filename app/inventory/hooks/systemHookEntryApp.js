'use strict';

/*
hooks: {
  after_create: {
    systemHookEntryApp: {}
  }
},
*/

const _ = require('lodash');
const Applications = require('inventory/entities/Application');
const {transfID} = require('core/applications/transforms/mapRelationToObjectID');
const DBRepository = require('core/repositories/DBRepository');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');
const Access = require('core/entities/accessRole');
const in_maker = require('core/libs/in_maker');

const get_diff = (entries) => (apps) => {
    const stringfyId = str => _.toString(_.get(str,'_id'));
    const get_ids = ldata => ldata.map(stringfyId);

    const lapps = _.difference(
        get_ids(entries),
        get_ids(apps)
    );

    return in_maker(lapps);
}

const insert_diff = (user, system) => (data) => {
    if(_.isEmpty(data))
        return;

    const access_filter = accessMergeTransform(user, Applications.access, {'_id': data}, Access.ROLE_READ);
    const post = {'system': system};

    return DBRepository(Applications, {ignoreValid: true})
        .updateByPushUnique(access_filter, post);
}


const systemHookEntryApp = ({}) => (system) => {

    let entries = _.get(system, 'entry', []);
    if(_.isEmpty(entries))
        return system;

    const {user, name} = system;
    const {_id} = transfID(system);

    const access_filter = accessMergeTransform(
        user,
        Applications.access,
        {'system._id': _id},
        Access.ROLE_READ
    );

    return DBRepository(Applications)
        .find(access_filter, ['_id'])
        .then(get_diff(entries))
        .then(insert_diff(user, {_id, name}))
        .catch(console.log);
};

module.exports = systemHookEntryApp;
