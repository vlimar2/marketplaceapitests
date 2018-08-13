'use strict';

var config = require('../config');
var Util = require('../util')
var UrlService = require('../services/urlService')

var MarkupService = function(that) {
    this.that = that;
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

MarkupService.prototype.getMarkupbyUrl = function(token) {
    var header = {
            "Authorization": "Bearer " + token
            ,"Content-Type": "application/json"
            ,"Cache-Control": "no-cache"
    };
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlAdminApi();
    return this.util.getUrl(baseurl, header,'/v1/marginconfiguration//0/0/0/0/0/null/null');
};

module.exports = MarkupService;