'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var QuizanswerService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

QuizanswerService.prototype.createRespostaquiz = function(token, PerguntaId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/quiz/Resposta';

    var resposta = {
            ativo : true,
            correta : true,
            descricao : "Resposta automatizada",
            perguntaId : ""
      };

    var header = this.util.getDefaultHeader2(token);

    resposta.perguntaId = PerguntaId
    //response.body.perguntaId = PerguntaId
      //var Resposta = this.util.postUrl(urlservice, resposta, header, url);

    return this.util.postUrl(urlservice, resposta, header, url);
}

var SearchanswerService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
}

QuizanswerService.prototype.searchRespostpertuntaaquiz = function(token, PerguntaId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/quiz/ListaResposta/' + PerguntaId ;

    var header = this.util.getDefaultHeader2(token);

    var resposta = this.util.getUrl(urlservice, header, url);

    //console.log(resposta);
    return this.util.getUrl(urlservice, header, url);
}

module.exports = SearchanswerService
module.exports = QuizanswerService