'use strict';

exports.up = function (db, next) {

    const list = [
        {
            name: 'server-list',
            time: 4*60,
            expires: 4*60
        },
        {
            name: 'loadbalance-list',
            time: 4*60*60,
            expires: 4*60
        },
        {
            name: 'dbs-list',
            time: 24*60*60,
            expires: 4*60
        },
        {
            name: 'storage-object-list',
            time: 24*5*60,
            expires: 4*60
        },
        {
            name: 'volumes-list',
            time: 4*60*60,
            expires: 4*60
        },
        {
            name: 'cdns-list',
            time: 48*60*60,
            expires: 4*60
        },
        {
            name: 'snapshot-list',
            time: 24*60*60,
            expires: 4*60
        },
        {
            name: 'images-list',
            time: 60*24*60*60,
            expires: 4*60
        },
        {
            name: 'security-list',
            time: 6*60*60,
            expires: 4*60
        },
        {
            name: 'network-list',
            time: 15*24*60*60,
            expires: 4*60
        }
    ]

    let col = db.collection('scheduler');
    col.insertMany(list, next);
};

exports.down = function (db, next) {
    db.collection('scheduler').remove(next);
};
