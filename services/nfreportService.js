'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var NfreportService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

NfreportService.prototype.generatereportnf = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '//pontos/relatorioauditorianf?fileName=relatorioauditorianf';

    var header = this.util.getDefaultHeader2(token);

    //var resposta = this.util.getUrl(urlservice, header, url);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = NfreportService