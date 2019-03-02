'use strict';

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
    }
];

module.exports = json;
