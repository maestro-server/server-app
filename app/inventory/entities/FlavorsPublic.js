'use strict';

const FlavorsPublic = require('../repositories/dao/flavorsPublic');
const {filled, singleFilled, resFilled, visibility, mapRelations, defaults, validators} = require('./Flavors');


const flavors = () => {

    const name = 'flavorsPublic';

    return {
        name,

        access: null,

        validators,

        dao: FlavorsPublic,

        hooks: {
            after_update: {
                auditHookUpdated: {
                    entity: name,
                    fill: filled
                }
            },
            after_patch: {
                auditHookPatched: {
                    entity: name,
                    fill: filled
                }
            },
            after_delete: {
                auditHookDeleted: {
                    entity: name,
                    fill: filled
                }
            }
        },

        defaults,
        mapRelations,
        visibility,
        filled,
        singleFilled,
        resFilled
    };
};

module.exports = flavors();
