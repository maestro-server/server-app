'use strict';

const _ = require('lodash');

const json = [
    {
        "name": "All Clients",
        "report": "general",
        "component": "Clients",
        "filters": [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}],
        "status": "process"
    },
    {
        "name": "All Systems",
        "report": "general",
        "component": "Systems",
        "filters": [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}],
        "status": "process"
    },
    {
        "name": "All Applications",
        "report": "general",
        "component": "Applications",
        "filters": [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}],
        "status": "process"
    },
    {
        "report": "general",
        "component": "Servers",
        "filters": [{
            "field": "active",
            "filter": "true",
            "comparer": "equal",
            "typ": "boolean"
        }, {"field": "datacenters", "filter": null, "subfield": "provider", "subfilter": "AWS", "typ": "object"}],
        "status": "process",
        "name": "AWS - Servers"
    },
    {
        "name": "All Servers",
        "report": "general",
        "component": "Servers",
        "filters": [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}],
        "status": "process"
    },
    {
        "report": "general",
        "component": "Servers",
        "filters": [{
            "field": "active",
            "filter": "true",
            "comparer": "equal",
            "typ": "boolean"
        }, {"field": "datacenters", "filter": null, "subfield": "provider", "subfilter": "Azure", "typ": "object"}],
        "status": "process",
        "name": "Azure - Servers"
    },
    {
        "report": "general",
        "component": "Servers",
        "filters": [{
            "field": "active",
            "filter": "true",
            "comparer": "equal",
            "typ": "boolean"
        }, {"field": "datacenters", "filter": null, "subfield": "provider", "subfilter": "Digital Ocean", "typ": "object"}],
        "status": "process",
        "name": "Digital Ocean - Servers"
    },
    {
        "name": "All Volumes",
        "report": "general",
        "component": "Volumes",
        "filters": [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}],
        "status": "process"
    }
];

_.reverse(json);
module.exports = json;
