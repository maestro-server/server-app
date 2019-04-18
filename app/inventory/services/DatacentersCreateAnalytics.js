'use strict';

const _ = require('lodash');
const Report = require('reports/entities/Report');
const Access = require('core/entities/accessRole');
const aclRoles = require('core/applications/transforms/aclRoles');
const CallReportApi = require('reports/applications/transform/callReportApi');

const createTemplate = (name, req) => {
    const oaclRoles = aclRoles(req.user, Report, Access.ROLE_ADMIN);

    return [
    {
        name:`DC ${name} - Server`,
        component: "Servers",
        ...oaclRoles
    },
    {
        name:`DC ${name} - Apps`,
        component: "Applications",
        ...oaclRoles
    }];
};

const DatacentersCreateAnalytics = (req) => (PersistenceServices) => (data) => {
    const {name} = data;

    const report = "general";
    const filters = [{ field: "active", filter: "true", comparer: "equal", typ: "boolean" }];
    const common = {report, filters};

    const reports = createTemplate(name, req);
    const owner_user = _.get(req, 'user._id');

    const conducter = _.map(
        reports,
        (post) => {
            return PersistenceServices(Report)
                .create(_.assign(post, common))
                .then(CallReportApi(owner_user).create);
        }
    );

    return Promise.all(conducter);
};

module.exports = DatacentersCreateAnalytics;
