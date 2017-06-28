'use strict';

module.exports = function(type) {

    const maps = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/gif": "gif",
        "image/png": "png"
    };

    if(maps[type] !== null && maps.hasOwnProperty(type)) {
        return maps[type];
    }

    return type;
};
