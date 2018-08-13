'use strict';

var Util = require('../util.js');
var config = require('../config')
 
var UrlService = function(that) {
this.util = new Util(that);
this.urls = config.env['qa']; //config.env[this.util.getEnv()];
};

UrlService.prototype.getFullUrlPrincipalApi = function() {
    return this.urls.urlMktplaceAPI;
};

UrlService.prototype.getFullUrlMainApi = function() {
    return this.urls.urlMainMktplaceAPI;
};

UrlService.prototype.getFullUrlAdminApi = function() {
    return this.urls.urlMktplaceAdminAPI;
};

module.exports = UrlService;

