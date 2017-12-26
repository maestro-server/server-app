'use strict';

const Access = require('core/entities/accessRole');

const DFactoryPesistenceApp = require('core/applications/persistenceApplication');
const PersistenceServices = require('core/services/PersistenceServices');

const notExist = require('core/applications/validator/validNotExist');
const changerUser = require('./transforms/swapUser');


const WrapperPersistenceApp = (Entity) => (ACEntity) => (FactoryPesistenceApp = DFactoryPesistenceApp) => (apply) => {

    const PesistenceApp = FactoryPesistenceApp(Entity);

    const factoryWrapper = function(method, access) {
        return (req, res, next) => {
          const {user, params} = req;

          PersistenceServices(ACEntity)
              .findOne(params.id, user, access)
              .then(notExist)
              .then((e) => {
                  const newReq = changerUser(req, e, params, ACEntity);
                  PesistenceApp[method](newReq, res, next);
              })
              .catch(next);
        };
    };

    return {
        find (req, res, next) {
            const mtd = apply || 'find';
            factoryWrapper(mtd, Access.ROLE_READ)(req, res, next);
        },

        count (req, res, next) {
            const mtd = apply || 'count';
            factoryWrapper(mtd, Access.ROLE_READ)(req, res, next);
        },

        findOne (req, res, next) {
            const mtd = apply || 'findOne';
            factoryWrapper(mtd, Access.ROLE_READ)(req, res, next);
        },

        update (req, res, next) {
            const mtd = apply || 'update';
            factoryWrapper(mtd, Access.ROLE_WRITER)(req, res, next);
        },

        updateSingle (req, res, next) {
            factoryWrapper('updateSingle', Access.ROLE_WRITER)(req, res, next);
        },

        patch (req, res, next) {
            const mtd = apply || 'patch';
            factoryWrapper(mtd, Access.ROLE_WRITER)(req, res, next);
        },

        create (req, res, next) {
            const mtd = apply || 'create';
            factoryWrapper(mtd, Access.ROLE_WRITER)(req, res, next);
        },

        remove (req, res, next) {
            factoryWrapper('remove', Access.ROLE_ADMIN)(req, res, next);
        }
    };

};


module.exports = WrapperPersistenceApp;
