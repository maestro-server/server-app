'use strict';

const _ = require('lodash');

const template = {
    "regions": [],
    "metas": {
        "ownProvider": false
    },
    "sucessed": true
};


const merge = [
    {
        "name": "AWS - US East/West",
        "zones": [
            "us-east-1a",
            "us-east-1b",
            "us-east-1c",
            "us-east-1d",
            "us-east-1e",
            "us-east-1f",
            "us-west-2a",
            "us-west-2b",
            "us-west-2c"
        ],
        "regions": [
            "us-east-1 (N. Virginia)",
            "us-west-2 (Oregon)"
        ],
        "provider": "AWS"
    },
    {
        "name": "Digital Ocean",
        "regions": [
            "nyc1"
        ],
        "provider": "Digital Ocean",
    },
    {
        "name": "Azure - US East",
        "zones": [
            "Zone 1",
            "Zone 2",
            "Zone 3"
        ],
        "regions": [
            "eastus"
        ],
        "provider": "Azure",
        "sucessed": true,
    },
    {
        "name": "AWS - Staging",
        "zones": [
            "us-east-1a",
            "us-east-1b",
            "us-east-1c",
            "us-east-1d",
            "us-east-1e",
            "us-east-1f"
        ],
        "regions": [
            "us-east-1 (N. Virginia)"
        ],
        "provider": "AWS"
    },
    {
        "name": "Openstack - DBs",
        "zones": [
            "RegionOneA",
            "RegionTwoA",
            "RegionOneB",
            "RegionTwoB"
        ],
        "regions": [
            "RegionOne",
            "RegionTwo"
        ],
        "provider": "OpenStack",


    }
]

const data = _.map(merge, (v) => _.assign({}, template, v));

module.exports = data;
