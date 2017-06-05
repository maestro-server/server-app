'use strict';

module.exports = function(type) {

    const maps = {
        "image/jpeg": "jpg",
        "image/png": "png"
    };

    if(maps[type] !== null) {
        return maps[type];
    }

    return type;
};
