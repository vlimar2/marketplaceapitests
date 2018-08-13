'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var StoreService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};


StoreService.prototype.getServices = function(token, catalogId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    return this.util.postUrl(baseurl, '{"withCredentials":true}', header,'/v1/stores/getGadgetService?catalogId='+catalogId);
};

StoreService.prototype.getVendorDesc = function(token, vendor) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    return this.util.getUrl(baseurl, header,'/v1/vendor/'+ vendor);
};

StoreService.prototype.getStores = function(token, catalog) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    return this.util.getUrl(baseurl, header,'/v1/stores/getStoresAllStatus?catalogId='+ catalog);
};

module.exports = StoreService;