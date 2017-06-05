'use strict';

module.exports = {
    name: "architectures",

    access: 'roles',

    validators: require('../validators'),

    persistence: {
        collection: () => {
            return this.name;
        }
    }
}
