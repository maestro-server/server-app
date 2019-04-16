'use strict';

const _ = require('lodash');
const Report = require('reports/entities/Report');

const DatacentersCreateAnalytics = (req) => (PersistenceServices) => (data) => {
    let {user} = req;
    const {name} = data;

    const report = "general";
    const filters = [{ field: "active", filter: "true", comparer: "equal", typ: "boolean" }];
    const common = {report, filters};

    const reports = [
    {
        name:`DC ${name} - Server`,
        component: "Servers"
    },
    {
        name:`DC ${name} - Apps`,
        component: "Applications",
    }];

    let conducter = [];

    _.forEach(
        reports,
        (post) => {
            const pro = PersistenceServices(Report, user).create(_.assign(post, common));
            conducter.push(pro);
        }
    );

    return Promise.all(conducter);
};

module.exports = DatacentersCreateAnalytics;
