'use strict';
var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var mocha = new Mocha();

var testDir = './api';

fs.readdirSync(testDir).filter(function(file){
    var fileArr = file.split('.');
    return fileArr[1] === 'js';
})
.forEach(function(file) {

    mocha.addFile(path.join(testDir, file));
});

mocha.run(function(failures) {
    process.on('exit', function() {
        process.exit(failures);
    });
});