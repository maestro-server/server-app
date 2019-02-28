'use strict';

const regizons = {
    'AWS': {
        "us-east-1 (N. Virginia)": [
            "us-east-1a",
            "us-east-1b",
            "us-east-1c",
            "us-east-1d",
            "us-east-1e",
            "us-east-1f"
        ],
        "us-west-2 (Oregon)": [
            "us-west-2a",
            "us-west-2b",
            "us-west-2c"
        ]
    },

    'OpenStack': {
        'RegionOne': [
            "RegionTwoA",
            "RegionTwoB"
        ],
        'RegionTwo': [
            "RegionTwoA",
            "RegionTwoB"
        ],
    },

    'Azure': {
        'eastus': [
            "Zone 1",
            "Zone 2",
            "Zone 3"
        ]
    }
};

module.exports = regizons;
