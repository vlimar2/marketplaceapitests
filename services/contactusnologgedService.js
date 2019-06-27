'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var ContactusnologgedService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ContactusnologgedService.prototype.getContactus = function(contact) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/faleconosco';
    
    var header = this.util.getHeaderJson1();

    return this.util.postUrl(urlservice, contact, header, url);
}

module.exports = ContactusnologgedService;