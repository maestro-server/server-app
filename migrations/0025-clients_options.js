'use strict';

exports.up = function(db, next){
  let pets = db.collection('adminer');
  pets.insert({
      "value": {
          channels: ['Email', 'HipChat', 'Slack', 'MS Teams', 'RocketChat', 'Skype', 'Phone', 'Glitter']
      },
      "key": "clients_options",
      "active": true,
      "updated_at": new Date()
  }, next);
};

exports.down = function(db, next){
  let pets = db.collection('adminer');

  pets.findAndModify({key: 'clients_options'}, [], {}, {remove: true}, next);
};
