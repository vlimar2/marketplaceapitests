'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var OrderService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};


OrderService.prototype.AddFingerPrint = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.postUrl(baseurl, '',header,'/v1/fingerPrint/1');
};


OrderService.prototype.AddOrder = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.postUrl(baseurl,'', header,'/v1/orders/1');
};

OrderService.prototype.GetOrder = function(token){
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.getUrl(baseurl, header,'/v1/participants/me/orders?orderId=&startDate=&endDate=&offset=0&limit=10');
};

OrderService.prototype.GetTracking = function(token, orderId){
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.getUrl(baseurl, header,'/v1/orders/'+ orderId +'/16309583/Tracking');
};

module.exports = OrderService