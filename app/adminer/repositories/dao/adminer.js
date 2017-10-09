'use strict';

const Dao = require('core/repositories/daos/DBConnector');

class Adminer extends Dao {
  collection () {
    return 'adminer';
  }
}
module.exports = Adminer;
