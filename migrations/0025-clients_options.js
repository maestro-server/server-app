'use strict';

exports.up = function(db, next){
  let pets = db.collection('adminer');
  pets.insertOne({
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

  pets.findOneAndDelete({key: 'clients_options'}, next);
};
