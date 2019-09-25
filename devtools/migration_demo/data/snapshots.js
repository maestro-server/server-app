'use strict';

const _ = require('lodash');
const uuidv4 = require('./uuidv4');
const merge = [];

for (let isx = 0; isx < 100; isx++) {
    const tmp = {
        "name": "snap-"+uuidv4('xxxxxxxx'),
        "owner_id" : uuidv4('xxxxxxxxxxx'),
        "progress" : "100%",
        "snapshot_id" : "snap-"+uuidv4('xxxxxxxx'),
        "start_time" : String(Date.now()),
        "volume_id" : "vol-"+uuidv4('xxxxxxxx'),
        "volume_size" : _.random(50, 1000),
        "datacenters": "#name::AWS - US East/West",
        "status" : "completed"
    };
    merge.push(tmp);
}

for (let isx = 0; isx < 10; isx++) {
    const tmp = {
        "name": "snap-"+uuidv4('xxxxxxxx'),
        "owner_id" : uuidv4('xxxxxxxxxxx'),
        "progress" : "100%",
        "snapshot_id" : "snap-"+uuidv4('xxxxxxxx'),
        "start_time" : String(Date.now()),
        "volume_id" : "vol-"+uuidv4('xxxxxxxx'),
        "volume_size" : _.random(50, 1000),
        "datacenters": "#name::AWS - Staging",
        "status" : "completed"
    };
    merge.push(tmp);
}

for (let isx = 0; isx < 20; isx++) {
    const tmp = {
        "name": "snap-"+uuidv4('xxxxxxxx'),
        "owner_id" : "647496772601",
        "progress" : "100%",
        "snapshot_id" : "snap-"+uuidv4('xxxxxxxx'),
        "start_time" : String(Date.now()),
        "volume_id" : "vol-"+uuidv4('xxxxxxxx'),
        "volume_size" : _.random(50, 1000),
        "datacenters": "#name::Azure - US East",
        "status" : "completed"
    };
    merge.push(tmp);
}

module.exports = merge;
