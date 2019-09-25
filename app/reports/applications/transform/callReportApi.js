'use strict';

const {ReportHTTPService} = require('core/services/HTTPService');


const CallReportApi = (owner_user = null, req = null) => {

    return {
        create(e) {
            const data = {
                "report_id": e["_id"],
                "component": e['component'],
                "filters": JSON.stringify(e['filters'], null, 2),
                owner_user
            };

            return ReportHTTPService()
                .create(`/reports/${e['report']}`, data);
        },

        update(e) {
            const data = {
                "report_id": req.params.id,
                "component": e['component'],
                "filters": JSON.stringify(e['filters'], null, 2),
                owner_user
            };

            return ReportHTTPService()
                .create(`/reports/${e['report']}`, data);
        },

        patch(e) {
            const data = {
                "report_id": e["_id"],
                "component": e['component'],
                "filters": JSON.stringify(e['filters'], null, 2),
                owner_user
            };

            return ReportHTTPService()
                .create(`/reports/${e['report']}`, data);
        },

        remove({_id, report, msg, status}) {
            if (status == 'finished')
                return ReportHTTPService().remove(`/reports/${_id}__${report}_${msg}`);
        }
    };
};

module.exports = CallReportApi;
