'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var BlacklistService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

BlacklistService.prototype.generateblist = function(token, blacklistId, DocumentoParticipante) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/participante/cadastrarBlackList/' + blacklistId + '/' + DocumentoParticipante + '/lol';

    var header = this.util.getDefaultHeader2(token);

    //var resposta = this.util.getUrl(urlservice, header, url);

    return this.util.getUrl(urlservice, header, url, blacklistId, DocumentoParticipante);
}

BlacklistService.prototype.generateblistporLote = function(token, filePath, fileName) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/participante/cadastrarBlackListXLS';

    var header = this.util.getDefaultHeader2(token);

    //var resposta = this.util.getUrl(urlservice, header, url);

    return this.util.postUrlformdata1(urlservice, null, header, url, filePath, fileName);
}

module.exports = BlacklistService