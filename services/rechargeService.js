'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var RechargeService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};


RechargeService.prototype.getOperatorDDD = function(operator, token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();    
    
    return this.util.getUrl(baseurl, this.util.getTokenHeader(token),'/v1/recharge/'+ operator + '/ddd');
};

RechargeService.prototype.getValuesRecharge = function(operator, ddd, token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();    
    
    return this.util.getUrl(baseurl, this.util.getTokenHeader(token),'/v1/recharge/'+ operator + '/' + ddd + '/valuesrecharge');
};

module.exports = RechargeService;