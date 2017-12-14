'use strict';

exports.up = function (db, next) {

    const list = [
        {
            name: 'server-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'loadbalance-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'dbs-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'storage-object-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'volumes-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'cdns-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'snapshot-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'images-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'security-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'network-list',
            time: {minutes: 5},
            expires: 4*60
        },
        {
            name: 'flavor-list',
            time: {minutes: 5},
            expires: 4*60
        }
    ]

    let col = db.collection('scheduler');
    col.insertMany(list, next);
};

exports.down = function (db, next) {
    db.collection('scheduler').remove(next);
};
