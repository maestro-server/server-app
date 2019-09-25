'use strict';

const _ = require('lodash');
const uuidv4 = require('./uuidv4');
const merge = [];

const images = ["ubuntu-lucid", "centos-7"];

for (let isx = 0; isx < 150; isx++) {
    const img = images[_.random(0, images.length-1)];

    const tmp = {

        "name": img + "-amd64-linux-image-" + uuidv4("x.x.xx-xxx") +  "-ec2-v-" + uuidv4(".x.xx-xxx") + "-kernel",
        "image_id": "aki-" + uuidv4("xxxxxxx"),
        "image_location": "ubuntu-sa-east-1/kernels-testing/"+img+"-amd64-linux-image-" + uuidv4("x.x.xx-xxx") +  "-ec2-v-" + uuidv4(".x.xx-xxx") + "-kernel.img.manifest.xml",
        "image_type": "kernel",
        "public": true,
        "storage": [],
        "hypervisor": "xen",
        "root_device_type": "instance-store",
        "datacenters": "#name::AWS - US East/West",
        "status": "available"
    };
    merge.push(tmp);
}

for (let isx = 0; isx < 10; isx++) {
    const img = images[_.random(0, images.length-1)];

    const tmp = {

        "name": img + "-amd64-linux-image-" + uuidv4("x.x.xx-xxx") +  "-ec2-v-" + uuidv4(".x.xx-xxx") + "-kernel",
        "image_id": "aki-" + uuidv4("xxxxxxx"),
        "image_location": "ubuntu-sa-east-1/kernels-testing/"+img+"-amd64-linux-image-" + uuidv4("x.x.xx-xxx") +  "-ec2-v-" + uuidv4(".x.xx-xxx") + "-kernel.img.manifest.xml",
        "image_type": "kernel",
        "public": true,
        "storage": [],
        "hypervisor": "xen",
        "root_device_type": "instance-store",
        "datacenters": "#name::AWS - Staging",
        "status": "available"
    };
    merge.push(tmp);
}
module.exports = merge;
