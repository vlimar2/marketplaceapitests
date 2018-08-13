'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var PointCash = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};


PointCash.prototype.AddFingerPrint = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.postUrl(baseurl, '',header,'/v1/fingerPrint/1');
};

PointCash.prototype.getPointCash = function(idBandeira, mesExpira, anoExpira, cardNum, idCatalog, nomeCartao, numParcelas, cashPoints, codSeguranca, token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);   
    
    var body = {
        cardBrandId: idBandeira,
        cardExpirationMonthDate: mesExpira,
        cardExpirationYearDate: anoExpira,
        cardNumber: cardNum,
        catalogId: idCatalog,
        nameOfCardHolder: nomeCartao,
        parcels: numParcelas,
        pointsCash: cashPoints,
        securityCode: codSeguranca
    };

    return this.util.postUrl(baseurl, body, header,'/v1/orders/1');
};


PointCash.prototype.AddOrder = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.postUrl(baseurl,'', header,'/v1/orders/1');
};


PointCash.prototype.AddPointCash = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.postUrl(baseurl,'', header,'/v1/orders/1');
};

module.exports = PointCash