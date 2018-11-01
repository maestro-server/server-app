'use strict';

const _ = require('lodash');

const Flavors = require('../repositories/dao/flavors');

const flavors = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'api_name', 'provider', 'datacenters', 'tags'];

    const singleFilled = [...resFilled, "memory", "compute_units_ecu", "vcpus", 'unique_id',
        "gpus", "fpgas", "ecu_per_vcpu", "physical_processor", "clock_speed_ghz", "intel_avx", "intel_avx2", "intel_turbo",
        "instance_storage", "instance_storage_already_warmed_up", "instance_storage_ssd_trim_support", "arch",
        "network_performance", "ebs_optimized_max_bandwidth", 'active',
        "ebs_optimized_throughput", "ebs_optimized_max_16_k_iops", "max_ips", "enhanced_networking", "vpc_only",
        "ipv_6_support", "placement_group_support", "linux_virtualization", "linux_on_demand_cost", "linux_reserved_cost",
        "rhel_on_demand_cost", "rhel_reserved_cost", "sles_on_demand_cost", "sles_reserved_cost", "windows_on_demand_cost",
        "windows_reserved_cost",  "windows_sql_web_on_demand_cost", "windows_sql_web_reserved_cost",
        "windows_sql_std_on_demand_cost", "windows_sql_std_reserved_cost", "windows_sql_ent_on_demand_cost",
        'service', 'is_public',
        "windows_sql_ent_reserved_cost", "ebs_optimized_surcharge", "roles"];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "flavors",

        access: 'roles',

        validators: require('../validators/flavors'),

        dao: Flavors,

        defaults: {},

        mapRelations: [],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = flavors();
