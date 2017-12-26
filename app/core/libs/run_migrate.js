'use strict';

const { exec } = require('child_process');

module.exports = () => {
    exec('node ./node_modules/mongodb-migrate -runmm -cfg .migration-config.js up', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
};
