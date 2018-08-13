'use strict';

var Util = require('../util')
var UrlService =  require('../services/urlService')

var ContactService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};



ContactService.prototype.postContact = function(token, participant) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    
    var body = {
        catalogId: participant.CatalogId,
        name: participant.Name,
        email: participant.Emails[0].EmailText,
        campaign: 'Campanha',
        phone: participant.Phones[0].Ddd + participant.Phones[0].Number,
        subject: 'ReclamaÃ§Ãµes',
        message: 'Teste',
        url: 'http://localhost:3126/#/contato'
    };

    return this.util.postUrl(baseurl, body, header,'/v1/contact');
};

ContactService.prototype.getCatalogConfig = function(token, catalog) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseurl, header,'/v1/configurations/catalogs/'+ catalog +'/Configurations');
};

module.exports = ContactService;