
import bcrypt from 'bcrypt';
import crypto from '../../../helpers/crypto';

module.exports = function (string) {
    return  bcrypt.hashSync(string, crypto.getCryptLevel());
};
