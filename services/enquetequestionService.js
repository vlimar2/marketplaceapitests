'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var EnquetequestionService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

EnquetequestionService.prototype.createPerguntaenquete = function(token, EnqueteId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete/EnquetePergunta';

    var pergunta = {
        ativo: true,
        campoAdicional: false,
        descricao: "pergunta pergunta",
        enqueteId: "",
        ordem: 1,
        tipoPerguntaId: 1
      };

    var header = this.util.getDefaultHeader2(token);

   pergunta.enqueteId = EnqueteId

    return this.util.postUrl(urlservice, pergunta, header, url);
}

var SearchquestionService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

EnquetequestionService.prototype.searchPerguntaenquete = function(token, PerguntaId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete/enquetePergunta/'+ PerguntaId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

EnquetequestionService.prototype.searchallPerguntaenquente = function(token, EnqueteId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete/GetEnquetePerguntas/'+ EnqueteId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = SearchquestionService 
module.exports = EnquetequestionService
