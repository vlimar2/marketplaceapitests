'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var ParticipantlistService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ParticipantlistService.prototype.generatelist = function(token, DocumentoParticipante) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/participante/listar/soparticipantes/' + DocumentoParticipante;

    var header = this.util.getDefaultHeader2(token);

    //var resposta = this.util.getUrl(urlservice, header, url);

    return this.util.getUrl(urlservice, header, url, DocumentoParticipante);
}

module.exports = ParticipantlistService