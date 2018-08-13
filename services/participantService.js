'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');



var ParticipantService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ParticipantService.prototype.createParticipant = function(token, participant) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var urlservice = this.urlService.getFullUrlPrincipalApi();
    var url = '/v1/participants';
    
    var header = this.util.getHeaderJson(token);
    return this.util.postUrl(urlservice, participant, header, url);
}

ParticipantService.prototype.updateParticipant = function(token, participant, participantId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var urlservice = this.urlService.getFullUrlPrincipalApi();
    var url = '/v1/participants/'+participantId;
    
    var header = this.util.getHeaderJson(token);
    return this.util.postUrl(urlservice, participant, header, url);
}


ParticipantService.prototype.getParticipant = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/me');
};


ParticipantService.prototype.Authenticate = function(username,password,urlAcess,token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var baseUrl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    var url = '/v1/participants/authenticate';

      var body = {
        Username: username,
        Password: password,
        Url: urlAcess
    }; 
    return this.util.postUrl(baseUrl, body, header, url);
}

ParticipantService.prototype.AdminAuthenticate = function(username,password,urlAcess,token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var baseUrl = this.urlService.getFullUrlAdminApi();
    var header = this.util.getTokenAdminHeader(token);
    var url = '/v1/marginconfiguration/0/0/0/0/0/null/null';

      var body = {
      Username: username,
      Password: password,
      Url: urlAcess
    }; 
    return this.util.postUrl(baseUrl, body, header, url);
}

ParticipantService.prototype.IsAuthenticate = function(user, pass, urluser) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseUrl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getAuthParticipant();
    var url = '/v1/participants/authenticate';

    var body = {
        Username: user,
        Password: pass,
        Url: urluser
    };

    return this.util.postUrl(baseUrl, body, header, url);
}

ParticipantService.prototype.IsAuthenticated = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/isAuthenticated');
};

ParticipantService.prototype.getBrowserCompatibility = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/browser-compatibility');
};

ParticipantService.prototype.getBalance = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/me/balance');
};

ParticipantService.prototype.getRegulations = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/regulations');
};

ParticipantService.prototype.getCatalogParticipant = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/me/catalog');
};

ParticipantService.prototype.postFingerPrint = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getTokenHeader(token);
    
    return this.util.postUrl(baseurl, '', header,'/v1/fingerprint/');
};

ParticipantService.prototype.getBalanceType = function(token, type) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    //As três APIs de balance estão usando este serviço
    //Parâmetros que podem ser usados:'balanceOrigin', 'balanceOnHold', 'fullBalance' e 'toExpire/0'
    return this.util.getUrl(baseurl, header,'/v1/participants/me/'+type );
};

ParticipantService.prototype.getExtract = function(token, type) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/me/extract' );
};

ParticipantService.prototype.postAuthCnpj = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.postUrl(baseurl, '', header,'/v1/participants/cpfcnpj/authenticate');
};

ParticipantService.prototype.ParticipantSearch = function(token, loginuser, campaign) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    
    var body = {
        login: loginuser,
        campaignId: campaign
    }; 

    return this.util.postUrl(baseurl, body, header,'/v1/participants/search');
};

ParticipantService.prototype.ParticipantAuthCpfCnpj = function(loginuser, password, campaign) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    
    var body = {
        CpfCnpj: loginuser,
        Password: password,
        CampaignId: campaign
    }; 
    
    return this.util.postUrl(baseurl, body, this.util.getOAuthHeader(),'/v1/participants/cpfcnpj/authenticate');
};

ParticipantService.prototype.getWishlist = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.getUrl(baseurl, header,'/v1/participants/me/wishlist');
};

ParticipantService.prototype.postAddWishlist = function(token, productsku) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.postUrl(baseurl, '', header,'/v1/participants/me/wishlist/'+ productsku +'/add');
};

ParticipantService.prototype.postRemoveWishlist = function(token, productsku) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getHeaderJson(token);
    
    return this.util.postUrl(baseurl, '', header,'/v1/participants/me/wishlist/'+ productsku +'/remove');
};

module.exports = ParticipantService;