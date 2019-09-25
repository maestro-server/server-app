'use strict';

const _ = require('lodash');
const uuidv4 = require('./uuidv4');


const aws_instance = ['t2.micro', 'm5.medium', 'm5.large', 'm5.xlarge', 'm5.2xlarge', 'm5.4xlarge', 'r3.large', 'c3.4xlarge'];
const azure_instance = ['Standard_B1ms', "Standard_B1s", 'Standard_B2s', 'Standard_B4ms', 'Standard_B8ms', 'Standard_F2s'];
const do_instance = ['1gb', '2gb', '4gb', '8gb', '16gb'];

function makeDC(provider) {

    const dv_blue = {
        "AWS": {
            "type": "Virtual",
            "instance": aws_instance[_.random(0, aws_instance.length-1)],
            "instance_id": "i-" + uuidv4('xxxxxxxxxxxxxxxxx'),
            "subnet_id": "subnet-" + uuidv4('xxxxxxxxxxxxxxxxx'),
            "virtualization_type": "hvm",
            "hypervisor": "xen",
            "root_device_type": "ebs",
            "image_id": "ami-" + uuidv4('xxxxxxxxxxxxxxxxx'),
            "architecture": "x86_64",
            "cloudwatch_monitoring": "disabled"
        },
        "Azure": {
            "instance": azure_instance[_.random(0, azure_instance.length-1)],
            "type": "Virtual",
            "resource": "Microsoft.Compute/virtualMachines",
            "instance_id": uuidv4("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")
        },
        "Digital Ocean": {
            "available": true,
            "type": "Virtual",
            "instance": do_instance[_.random(0, do_instance.length-1)],
            "instance_id": _.random(4000000, 4999999),
            "kernel": {
                "id": 2924
            },
            "name": "Ubuntu 14.04 x64 vmlinuz-3.13.0-43-generic",
            "version": "3.13.0-43-generic",
            "backups": true,
            "virtio": true
        }
    };


    return _.get(dv_blue, provider, {});
}

module.exports = makeDC;
