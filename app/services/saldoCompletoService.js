'use strict';

var config = require('../../config');
var Util = require('../../util');
var UrlService = require('../../services/urlService');

var SaldoCompletoService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

SaldoCompletoService.prototype.listAll = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = 'pontos/saldocompleto'; 

    var header = this.util.getDefaultHeader2(token);//Colocar o token da API 

    return this.util.getUrl(urlservice, header, url);
}

module.exports = SaldoCompletoService
