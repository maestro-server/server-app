'use strict';

const _ = require('lodash');
const fs = require('fs');
let hookies={};

const hooksPath = [__dirname + '/', __dirname + '/../../inventory/hooks/']

hooksPath.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
        if (file.match(/\.js$/) !== null && file !== 'factory.js') {
            const name = file.replace('.js', '');
            hookies[name] = require(dir + file);
        }
    });
});

const execHooks = (configs, name, data={}) => {
  if(hookies[name]) {
    hookies[name](configs)(data);
  }
};

const hookFactory = (Entity, dft={}) => (when) => (data={}) => {
  const path = `hooks.${when}`;

  if(_.has(Entity, path)) {
    const hooks = _.get(Entity, path);
    _.assign(data, dft);

    _.each(hooks,
      (v,k) => execHooks(v, k, data));
  }

  return data;

};

module.exports = hookFactory;
