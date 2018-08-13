'use strict';

var config = require('../config');
var Util = require('../util')
var UrlService = require('../services/urlService')

var AuthAdminService = function(that) {
    this.that = that;
    this.util = new Util(this.that);
    this.urlService = new UrlService(that);
};

AuthAdminService.prototype.authClient = function(adminHeader) {
    this.util.timeout(config.util.HIGH_SECONDS);
    var header = adminHeader;
    var url = this.urlService.getFullUrlAdminApi('');
    var body = { grant_type: "password", username: "16" };
    return this.util.postUrl(url, body, header, '/token');
};

module.exports = AuthAdminService
