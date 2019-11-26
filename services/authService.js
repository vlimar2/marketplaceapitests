'use strict';

var config = require('../config');
var Util = require('../util')
var UrlService = require('../services/urlService')


var AuthService = function(that) {
    this.that = that;
    this.util = new Util(this.that);
    this.urlService = new UrlService(that);
};

AuthService.prototype.authParticipant = async function(userName, passWord, client_Id) {
    try {

    this.util.timeout(config.util.HIGH_SECONDS);
    
    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = { grant_type: "password", password: passWord, username: userName, client_id: client_Id };

    var response = await this.util.postUrl(url, body, this.util.getHeaderFormUrlEncoded(), '/token');
    return response
    } catch(erro) {
        return erro
    }
};

AuthService.prototype.authParticipantdealer = async function(userName, passWord, client_Id) {
    try {

    
    //this.util.timeout(config.util.HIGH_SECONDS);
    
    var url = await this.urlService.getFullUrlPrincipalApi();

    var body = { grant_type: "password", password: passWord, username: userName, client_id: client_Id };

    var header = await this.util.getHeaderFormUrlEncoded2()

    var response = await this.util.postUrl(url, body, header, '/token');
    return response
    } catch(erro) {
        return erro
    }
};

AuthService.prototype.authAuthorize = function(userName, passWord) {
    this.util.timeout(config.util.HIGH_SECONDS);
    
    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = { grant_type: "password", password: passWord, username: userName };

    return this.util.postUrl(url, body, this.util.getHeaderFormUrlEncoded(), '/token');

};

AuthService.prototype.gettoken = function(body) {
    this.util.timeout(config.util.HIGH_SECONDS);
    
    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = "";

    return this.util.postUrl(url, body, this.util.getHeaderFormUrlEncoded(), '/token');

};

AuthService.prototype.authParticipantClientCredentials = async function(userName, passWord, client_Id) {
    try {

    
    this.util.timeout(config.util.HIGH_SECONDS);
    
    var url = this.urlService.getFullUrlPrincipalApi('');

    var body = { grant_type: "client_credentials", client_secret: passWord, client_id: client_Id };

    var response = await this.util.postUrl(url, body, this.util.getHeaderFormUrlEncoded(), '/token');
    return response
    } catch(erro) {
        return erro
    }
};

module.exports = AuthService

//lastest commit
