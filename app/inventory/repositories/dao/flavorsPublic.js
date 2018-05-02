'use strict';

const Dao = require('core/repositories/daos/DBConnector');

class Flavorspublic extends Dao {
    collection () {
        return 'flavors-public';
    }
}
module.exports = Flavorspublic;
