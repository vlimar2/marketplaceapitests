'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var ContactusloggedService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ContactusloggedService.prototype.getContactus = function(token, contact) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/faleconosco';
    
    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, contact, header, url);
}

module.exports = ContactusloggedService;