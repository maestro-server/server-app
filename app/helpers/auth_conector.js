
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const UserRepository = require('../repositories/usersRepository');

const config = require('../helpers/auth_config');

const permissionError = require('../errors/permissionError');


module.exports = function(req, res, next) {
    let strategy = new Strategy(config.jwtSecret, function (payload, done) {

        let _id = payload._id;

        if(_id) {
            new UserRepository()
                .findOne({_id})
                .then(e => {
                    if (e) {
                        return done(null, e);
                    }

                    return done(new permissionError("User not found"), false);
                })
                .catch(error => done(error, null));
        }

    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};
