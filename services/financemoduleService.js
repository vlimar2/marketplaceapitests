'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var FinancemoduleService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

FinancemoduleService.prototype.generateInfos = function(token, url) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    //var url = 'pontos/relatoriopontosmensalidadesgrid?UFId=&CidadeId=&PeriodoId=&DealerId=';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = FinancemoduleService
