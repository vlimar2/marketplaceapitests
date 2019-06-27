'use strict';

var config = require('../config');
var Util = require('../util')
var UrlService = require('../services/urlService')


var AuthdealeradminService = function(that) {
    this.that = that;
    this.util = new Util(this.that);
    this.urlService = new UrlService(that);
};

AuthdealeradminService.prototype.authDealeradm = function(userName, passWord, client_Id) {
    this.util.timeout(config.util.HIGH_SECONDS);
    
    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = { grant_type: "password", password: passWord, username: userName, client_id: client_Id };

    return this.util.postUrl(url, body, this.util.getHeaderFormUrlEncoded(), '/token');

};

/*AuthService.prototype.authAuthorize = function(userName, passWord) {
    this.util.timeout(config.util.HIGH_SECONDS);
    
    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = { grant_type: "password", password: passWord, username: userName };

    return this.util.postUrl(url, body, this.util.getHeaderFormUrlEncoded(), '/token');

};*/

module.exports = AuthdealeradminService
