'use strict';

var config = require('../config');
var Util = require('../util')
var UrlService = require('../services/urlService')


var AuthService = function(that) {
    this.that = that;
    this.util = new Util(this.that);
    this.urlService = new UrlService(that);
};

AuthService.prototype.authClient = function(campaignId) {
    this.util.timeout(config.util.HIGH_SECONDS);

    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = { grant_type: "client_credentials", campaign_id: campaignId };

    return this.util.postUrl(url, body, this.util.getOAuthHeader(), '/token');
};

AuthService.prototype.authParticipant = function(campaignId, participantId) {
    this.util.timeout(config.util.HIGH_SECONDS);

    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = { grant_type: "password", campaign_id: campaignId, username: participantId };

    return this.util.postUrl(url, body, this.util.getOAuthHeader(), '/token');
};


AuthService.prototype.logoutParticipant = function(token) {
    this.util.timeout(config.util.HIGH_SECONDS);
    var url = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token.access_token);
    
    return this.util.postUrl(url, '', header, '/v1/participants/logout');
};

module.exports = AuthService
