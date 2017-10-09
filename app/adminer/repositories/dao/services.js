'use strict';

const Dao = require('core/repositories/daos/DBConnector');

class Services extends Dao {
  collection () {
    return 'services';
  }
}
module.exports = Services;
