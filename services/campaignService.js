'use strict';

var Util = require('../util')
var UrlService =  require('../services/urlService')

var CampaignService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};



CampaignService.prototype.getCampaignbyUrl = function(url) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();    
    
    return this.util.getUrl(baseurl, this.util.getOAuthHeader(),'/v1/campaigns?url='+url);
    //return this.util.getUrl(url, header, '/v1/campaigns?url=');
};

CampaignService.prototype.getRegulations = function(token, params) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseurl, header,'/v1/campaigns/regulations?campaignId='+params.campaignId+'&catalogId='+params.catalogId);
};

CampaignService.prototype.getVendorRegulations = function(token, params) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseurl, header,'/v1/campaigns/regulations?campaignId='+params.campaignId+'&vendorId='+params.vendorId);
};

CampaignService.prototype.getCampaigns = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseurl, header,'/v1/configurations/campaigns');
};

CampaignService.prototype.getCampaignsByCPF = function(token, cpf) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();    
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseurl, header,'/v1/campaigns?cpf='+cpf);
};

CampaignService.prototype.getCampaignsByCNPJ = function(token, cnpj) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseurl, header,'/v1/campaigns?cnpj='+cnpj);
};

CampaignService.prototype.getCatalogParameter = function(token, catalog) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    return this.util.getUrl(baseurl, header,'/v1/configurations/catalogs/'+ catalog +'/parameters');
};

CampaignService.prototype.getCatalog = function(token, catalog) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    return this.util.getUrl(baseurl, header,'/v1/configurations/catalogs/'+ catalog);
};

CampaignService.prototype.getCatalogProfile = function(token, catalog) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    return this.util.getUrl(baseurl, header,'/v1/configurations/catalogs/'+ catalog + '/profiles');
};

CampaignService.prototype.getCampaignCatalog = function(token, campaign) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    return this.util.getUrl(baseurl, header,'/v1/configurations/campaigns/'+ campaign +'/catalogs');
};

module.exports = CampaignService;