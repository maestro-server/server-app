'use strict';

module.exports = {

    active (mode = 'strict') {
        if(mode === 'all')
            return {};

        return {active: true};
    },

    desactive (mode = 'strict') {
        if(mode === 'all')
            return {};

        return {active: false};
    }
};
