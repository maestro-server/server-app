'use strict';

const _ = require('lodash');
const uuidv4 = require('./uuidv4');
const ipf = require('./ip');
const merge = []

const vpc = ["AWS - US East/West", "AWS - Staging"]
const zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
const regions = ["us-east1", "us-west2"]

//==========================================================subnet
for (let isx = 0; isx < 5; isx++) {
    const tmp = {
        "name": "subnet - " + uuidv4('xxxxxxxxx'),
        "availability_zone": zones[_.random(0, zones.length - 1)],
        "available_ip_address_count": 4091,
        "cidr_block": `10.${_.random(0, 100)}.0.0/20`,
        "default_for_az": true,
        "map_public_ip_on_launch": true,
        "vpc_id": "vpc-" + uuidv4('xxxxxxxxx'),
        "assign_ipv6_address_on_creation": false,
        "ipv6Cidr_block_association_set": [],
        "family": "Subnet",
        "datacenters": "#name::" + vpc[_.random(0, vpc.length - 1)],
        "status": "available",
        "tags": []
    }
    merge.push(tmp);
}

//==========================================================vcl
for (let isx = 0; isx < 2; isx++) {
    const ip = `10.${_.random(0, 100)}.0.0/16`
    const tmp = {
        "name": "vpc - " + uuidv4('xxxxxxxxx'),
        "image_id": ip,
        "dhcp_options_id": "dopt-" + uuidv4('xxxxxxxxx'),
        "instance_tenancy": "default",
        "cidr_block_association_set": [
            {
                "AssociationId": "vpc-cidr-assoc-" + uuidv4('xxxxxxxxx'),
                "CidrBlock": ip,
                "CidrBlockState": {
                    "State": "associated"
                }
            }
        ],
        "is_default": true,
        "family": "Vpc",
        "datacenters": "#name::" + vpc[_.random(0, vpc.length - 1)],
        "status": "available",
        "tags": []
    }

    merge.push(tmp);
}

//==========================================================security group
for (let isx = 0; isx < 2; isx++) {
    const ip = `10.${_.random(0, 100)}.0.0/16`
    const tmp = {
        "unique_id": "sg-"+ uuidv4('xxxxxxxxxxxxxxxxxxxx'),
        "name": "sc-"+ uuidv4('xxxxxxxxx'),
        "group_name": "maestro-webserver",
        "description":
            "launch-wizard-1 created 2018-05-09T18:30:40.312-03:00",
        "ip_permissions":
            [
                {
                    "FromPort": 80,
                    "IpProtocol": "tcp",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [
                        {
                            "CidrIpv6": "::/0"
                        }
                    ],
                    "PrefixListIds": [],
                    "ToPort": 80,
                    "UserIdGroupPairs": []
                },
                {
                    "FromPort": 0,
                    "IpProtocol": "tcp",
                    "IpRanges": [
                        {
                            "CidrIp": ip
                        },
                        {
                            "CidrIp": ip+"/32"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "ToPort": 65535,
                    "UserIdGroupPairs": []
                },
                {
                    "FromPort": 8888,
                    "IpProtocol": "tcp",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "ToPort": 8888,
                    "UserIdGroupPairs": []
                },
                {
                    "FromPort": 22,
                    "IpProtocol": "tcp",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "ToPort": 22,
                    "UserIdGroupPairs": []
                },
                {
                    "FromPort": 9999,
                    "IpProtocol": "tcp",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "ToPort": 9999,
                    "UserIdGroupPairs": []
                }
            ],
        "vpc_id": "vpc-"+ uuidv4('xxxxxxxxx'),
        "family": "SecurityGroup",
        "datacenters": "#name::" + vpc[_.random(0, vpc.length - 1)],
        "tags": []
    }

    merge.push(tmp);
}

//==========================================================vpc peering
for (let isx = 0; isx < 2; isx++) {
    const ip = `10.${_.random(0, 100)}.0.0/16`
    const tmp = {
        "name": "vpc peering - " + uuidv4('xxxxxxxxx'),
        "unique_id":
            "pcx-"+ uuidv4('xxxxxxxxx'),
        "accepter_vpc_info":
            {
                "CidrBlock": ip,
                "CidrBlockSet":
                    [
                        {
                            "CidrBlock": ip,
                        }
                    ],
                "OwnerId":
                    "036008589636",
                "PeeringOptions":
                    {
                        "AllowDnsResolutionFromRemoteVpc":
                            false,
                        "AllowEgressFromLocalClassicLinkToRemoteVpc":
                            false,
                        "AllowEgressFromLocalVpcToRemoteClassicLink":
                            false
                    }
                ,
                "VpcId":  "vpc-"+ uuidv4('xxxxxxxxx'),
                "Region": regions[_.random(0, regions.length - 1)]
            }
        ,
        "requester_vpc_info":
            {
                "CidrBlock":
                    "192.168.248.0/21",
                "CidrBlockSet":
                    [
                        {
                            "CidrBlock": "192.168.248.0/21"
                        }
                    ],
                "OwnerId":
                    "625844033181",
                "VpcId": "vpc-"+ uuidv4('xxxxxxxxx'),
                "Region": regions[_.random(0, regions.length - 1)]
            }
        ,
        "family": "VpcPeering",
        "datacenters": "#name::" + vpc[_.random(0, vpc.length - 1)],
        "tags": []
    }

    merge.push(tmp);
}


//==========================================================netwrokacl
for (let isx = 0; isx < 2; isx++) {
    const ip = `10.${_.random(0, 100)}.0.0/16`
    const tmp = {
        "name": "acl network - " + uuidv4('xxxxxxxxx'),
        "associations": [],
        "entries": [
            {
                "CidrBlock": "0.0.0.0/0",
                "Egress": true,
                "Protocol": "-1",
                "RuleAction": "allow",
                "RuleNumber": 100
            },
            {
                "CidrBlock": "0.0.0.0/0",
                "Egress": true,
                "Protocol": "-1",
                "RuleAction": "deny",
                "RuleNumber": 32767
            },
            {
                "CidrBlock": "0.0.0.0/0",
                "Egress": false,
                "Protocol": "-1",
                "RuleAction": "allow",
                "RuleNumber": 100
            },
            {
                "CidrBlock": "0.0.0.0/0",
                "Egress": false,
                "Protocol": "-1",
                "RuleAction": "deny",
                "RuleNumber": 32767
            }
        ],
        "is_default": true,
        "vpc_id": "vpc-075f797c",
        "family": "NetworkAcl",
        "datacenters": "#name::" + vpc[_.random(0, vpc.length - 1)],
        "tags": []
    }

    for (let xx = 0; xx < _.random(1, 8); xx++) {
        tmp["associations"].push(
            {
                "NetworkAclAssociationId": "aclassoc-"+ uuidv4('xxxxxxxxx'),
                "NetworkAclId": "acl-"+ uuidv4('xxxxxxxxx'),
                "SubnetId": "subnet-"+ uuidv4('xxxxxxxxx')
            }
        );
    }

    merge.push(tmp);
}

//==========================================================network interface
for (let isx = 0; isx < 2; isx++) {
    const ip = `10.${_.random(0, 100)}.0.0`
    const pip = ipf(true)

    const tmp = {
        "name": "network interface - " + uuidv4('xxxxxxxxx'),
        "association": {
            "AllocationId": "eipalloc-"+ uuidv4('xxxxxxxxxxxxxxxxxxxx'),
            "AssociationId": "eipassoc-"+ uuidv4('xxxxxxxxxxxxxxxxxxx'),
            "IpOwnerId": "036008589636",
            "PublicDnsName": "ec2-"+_.replace(pip, ".", "-")+".compute-1.amazonaws.com",
            "PublicIp": pip
        },
        "attachment": {
            "AttachTime": "2018-05-09T21:31:41Z",
            "AttachmentId": "eni-attach-"+ uuidv4('xxxxxxxxx'),
            "DeleteOnTermination": true,
            "InstanceId": "i-"+ uuidv4('xxxxxxxxxxxxxxxxxxx'),
            "InstanceOwnerId": "036008589636",
            "Status": "attached"
        },
        "availability_zone": zones[_.random(0, zones.length - 1)],
        "description": "",
        "groups": [
            {
                "GroupName": "maestro-webserver",
                "GroupId": "sg-"+ uuidv4('xxxxxxxxxxxxxxxxxxxx')
            }
        ],
        "interface_type": "interface",
        "ipv6_addresses": [],
        "mac_address": "12:5a:77:b7:d9:ac",
        "private_dns_name": "ip-"+_.replace(ip, ".", "-")+".ec2.internal",
        "private_ip_address": ip,
        "private_ip_addresses": [
            {
                "Association": {
                    "AllocationId": "eipalloc-"+ uuidv4('xxxxxxxxxxxxxx'),
                    "AssociationId": "eipassoc-"+ uuidv4('xxxxxxxxxxxxxxxx'),
                    "IpOwnerId": "036008589636",
                    "PublicDnsName": "ec2-"+_.replace(pip, ".", "-")+".compute-1.amazonaws.com",
                    "PublicIp": pip
                },
                "Primary": true,
                "PrivateDnsName": "ip-"+_.replace(ip, ".", "-")+".ec2.internal",
                "PrivateIpAddress": ipf()
            }
        ],
        "requester_managed": false,
        "source_dest_check": true,
        "subnet_id": "subnet-"+ uuidv4('xxxxxxxxx'),
        "vpc_id": "vpc-"+ uuidv4('xxxxxxxxx'),
        "family": "NetworkInterfaces",
        "datacenters": "#name::" + vpc[_.random(0, vpc.length - 1)],
        "tags": []
    }

    merge.push(tmp);
}

//==========================================================route table
for (let isx = 0; isx < 20; isx++) {
    const ip = `10.${_.random(0, 100)}.0.0/16`
    const tmp = {
        "name": "route table - " + uuidv4('xxxxxxxxx'),
        "associations": [
            {
                "Main": true,
                "RouteTableAssociationId": "rtbassoc-"+ uuidv4('xxxxxxxxx'),
                "RouteTableId": "rtb-"+ uuidv4('xxxxxxxxx')
            }
        ],
        "propagating_vgws": [],
        "routes": [
            {
                "DestinationCidrBlock": `192.${_.random(0, 100)}.0.0/16`,
                "Origin": "CreateRoute",
                "State": "active",
                "VpcPeeringConnectionId": "pcx-"+ uuidv4('xxxxxxxxx')
            },
            {
                "DestinationCidrBlock": ip,
                "GatewayId": "local",
                "Origin": "CreateRouteTable",
                "State": "active"
            },
            {
                "DestinationCidrBlock": "0.0.0.0/0",
                "GatewayId": "igw-"+ uuidv4('xxxxxxxxx'),
                "Origin": "CreateRoute",
                "State": "active"
            }
        ],
        "vpc_id": "vpc-"+ uuidv4('xxxxxxxxx'),
        "family": "RouteTable",
        "datacenters": "#name::" + vpc[_.random(0, vpc.length - 1)],
        "tags": []
    }

    merge.push(tmp);
}

module.exports = merge;
