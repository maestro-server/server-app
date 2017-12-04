'use strict';

const _ = require('lodash');

const Networks = require('../repositories/dao/networks');

const network = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'vpc_peering_connection_id', 'vpc_id', 'image_id',
        'subnet_id', 'environment', 'family', 'datacenters', 'status', 'group_id', 'tags'];

    const singleFilled = [...resFilled, 'availability_zone', 'available_ip_address_count',
        'cidr_block', 'default_for_az', 'map_public_ip_on_launch', 'assign_ipv6_address_on_creation', 'dhcp_options_id',
        'instance_tenancy', 'ipv6_cidr_block_association_set', 'cidr_block_association_set', 'is_default', 'accepter_vpc_info',
        'expiration_time', 'requester_vpc_info', 'description', 'group_name', 'ip_permissions', 'associations', 'propagating_vgws',
        'route_table_id', 'routes', 'attachment', 'interface_type', 'ipv6_addresses', 'mac_address', 'network_interface_id', 'owner_id',
        '_private_dns_name', 'private_ip_address', 'private_ip_addresses', 'primary', 'private_dns_name', 'private_ip_address',
        'requesterId', 'requester_managed', 'source_dest_check', 'delete_time', 'dailure_code', 'dailure_message', 'nat_gateway_addresses',
        'nat_gateway_id', 'ProvisionedBandwidth', 'entries', 'NetworkAclId', 'vpc_endpoint_id', 'vpc_endpoint_type', 'service_name',
        'Policy_document', 'route_table_ids', 'subnet_ids', 'groups', 'private_dns_enabled', 'network_interface_ids, dns_entries', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "networks",

        access: 'roles',

        validators: require('../validators/network'),

        dao: Networks,

        defaults: {},

        mapRelations: [],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = network();
