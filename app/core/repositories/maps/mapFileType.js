'use strict';

const _ = require('lodash');

const MapFileType = (type=null) => {
    const tprivate = {
        "application/json": "json",
        "text/csv": "csv",
        "text/plain": "txt"
    };

    const tpublic = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/gif": "gif",
        "image/png": "png",
    };

    const maps = _.assign({}, tprivate, tpublic);

    return {
        isPublic() {
            return _.has(tpublic, type, false);
        },

        getFyleTypes() {
            return _.keys(maps);
        },

        getExtesion() {
            return  _.get(maps, type, type);
        },

        getType(ext) {
            return _.findKey(maps, _.partial(_.isEqual, ext));
        }
    };
};

module.exports = MapFileType;
