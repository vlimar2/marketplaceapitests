'use strict';

var Util = require('../util.js');
var config = require('../config')
 
var UrlService = function(that) {
this.util = new Util(that);
//this.urls = config.env['staging'];
//this.urls = config.env[config.environment];
this.urls = config.env['qa'];
};

UrlService.prototype.getFullUrlPrincipalApi = function() {
    return this.urls.urlMercedesAPIqa;
};

UrlService.prototype.getFullUrlPrincipalApi2 = async function() {
    return await this.urls.urlMercedesAPIqa;
};

UrlService.prototype.getFullUrlPrincipalApiqa = function() {
    return this.urls.urlMercedesAPIqa;
};

UrlService.prototype.getFullUrlPrincipalApiman = function() {
    return this.urls.urlMercedesAPIman;
};

module.exports = UrlService;

