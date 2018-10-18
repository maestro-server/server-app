'use strict';

const _ = require('lodash');
const in_maker = require('core/libs/in_maker');
const Access = require('core/entities/accessRole');

const DFactoryDBRepository = require('core/repositories/DBRepository');
const DFactoryDBBatch = require('core/repositories/DBRepositoryBatch');

const validNotEqual = require('core/services/validator/validNotEqual');
const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');

const factoryValid = require('core/libs/factoryValid');
const depsValid = require('inventory/validators/depsValid');
const batchDepsToUpdate = require('./batch/batchDepsToUpdate');
const systemEndpoint = require('./sync/systemEndpoint');


const DepsServices = (Entity, field, FactoryDBRepository = DFactoryDBRepository, FactoryDBBatch = DFactoryDBBatch) => {

    const DBRepository = FactoryDBRepository(Entity);
    const DBBatch = FactoryDBBatch(Entity);

    return {
        addDep (_id, post, owner) {

            return new Promise((resolve, reject) => {

                factoryValid(post, depsValid.create);

                const access = Object.assign({}, {
                    _id: in_maker(post._id)
                },
                    _.pick(post, 'name', 'family')
                );

                const filter = _.assign({},
                  accessMergeTransform(owner, Entity.access, {_id}, Access.ROLE_ADMIN),
                  validNotEqual(`${field}._id`, access._id)
                );

                return DBRepository
                    .updateByPushUnique(filter, {[field]: access}, field)
                    .then(resolve)
                    .catch(reject);
            });

        },

        updateSingleDep (_id, _idu, post, owner) {

            return new Promise((resolve, reject) => {

                factoryValid(post, depsValid.update);

                return DepsServices(Entity, field, FactoryDBRepository)
                    .deleteDep(_id, _idu, owner)
                    .then(() => {
                        const roler = Object.assign({}, post, {id: _idu});
                        return DepsServices(Entity, field).addDep(_id, roler, owner);
                    })
                    .then(resolve)
                    .catch(reject);
            });
        },

        updateManyDep (post, owner) {
            return new Promise((resolve, reject) => {

                post =  mapRelationToObjectID(post, ['systems']);

                const {tree, systems} = factoryValid(post, depsValid.updateMany);

                if (_.has(tree, 'root')) {
                    if (systems)
                        systemEndpoint(systems, owner)().addEndpoint(tree['root']);
                    delete tree['root'];
                }

                if (_.isEmpty(tree)) resolve();

                const data = batchDepsToUpdate(tree, owner, Entity.access, systems);

                return DBBatch
                    .batch(data)
                    .then(resolve)
                    .catch(reject);
            });
        },

        deleteDep (_id, _idu, owner) {

            return new Promise((resolve, reject) => {
                const prepared = accessMergeTransform(owner, Entity.access, {_id}, Access.ROLE_WRITE);

                const arr = {
                    [field]: {
                        _id: in_maker(_idu)
                    }
                };

                return DBRepository
                    .updateByPull(prepared, arr, field)
                    .then(resolve)
                    .catch(reject);
            });
        }
    };

};

module.exports = _.curry(DepsServices);
