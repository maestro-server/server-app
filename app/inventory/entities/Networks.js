'use strict';

const _ = require('lodash');

const Networks = require('../repositories/dao/networks');

const network = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'unique_id',  'environment', 'family', 'datacenters.name',
         'status', 'tags'];

    const singleFilled = [...resFilled,
        'vpc_peering_connection_id', 'vpc_id', 'image_id', 'port_id', 'security_id', 'group_id', 'datacenters',
        'subnet_id', 'route_id', 'vpn_gateway_id', 'vpc_endpoint_id', 'route_table_id', 'network_interface_id',
        'availability_zone', 'available_ip_address_count', 'is_vlan_transparent', 'unique_id',
        'cidr_block', 'default_for_az', 'map_public_ip_on_launch', 'assign_ipv6_address_on_creation', 'dhcp_options_id',
        'instance_tenancy', 'ipv6_cidr_block_association_set', 'cidr_block_association_set', 'is_default', 'accepter_vpc_info',
        'expiration_time', 'requester_vpc_info', 'description', 'group_name', 'ip_permissions', 'associations', 'propagating_vgws',
        'routes', 'attachment', 'interface_type', 'ipv6_addresses', 'mac_address', 'owner_id',
        '_private_dns_name', 'private_ip_address', 'private_ip_addresses', 'primary', 'private_dns_name', 'private_ip_address',
        'requesterId', 'requester_managed', 'source_dest_check', 'delete_time', 'dailure_code', 'dailure_message', 'nat_gateway_addresses',
        'nat_gateway_id', 'ProvisionedBandwidth', 'entries', 'NetworkAclId', 'vpc_endpoint_type', 'service_name',
        'policy_document', 'route_table_ids', 'subnet_ids', 'groups', 'private_dns_enabled', 'network_interface_ids, dns_entries',
        'roles', 'owner', 'service', 'is_port_security_enabled', 'ipv4_address_scope_id', 'mtu', 'project_id', 'network_id',
        'mac_address', 'fixed_ips', 'resources_key', 'security_group_ids', 'external_gateway_info', 'flavor_id',
        'allow_list', 'routes', 'availability_zone_hints', 'allocation_pools', 'use_default_subnet_pool', 'ipv6_address_mode',
        'is_dhcp_enabled'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "networks",

        access: 'roles',

        validators: require('../validators/network'),

        dao: Networks,

        defaults: {},

        mapRelations: [],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = network();
