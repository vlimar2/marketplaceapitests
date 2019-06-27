'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var QuizquestionService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

QuizquestionService.prototype.createPerguntaquiz = function(token, QuizId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/quiz/Pergunta';

    var pergunta = {
        ativo: true,
        descricao: "Pergunta automatizada",
        multiplaEscolha: true,
        quizId: ""
      };

    var header = this.util.getDefaultHeader2(token);

   pergunta.quizId = QuizId

    return this.util.postUrl(urlservice, pergunta, header, url);
}

var SearchquestionService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

QuizquestionService.prototype.searchPerguntaquiz = function(token, PerguntaId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/quiz/Pergunta/'+ PerguntaId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

QuizquestionService.prototype.searchallPerguntaquiz = function(token, QuizId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/quiz/GetPerguntas/'+ QuizId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = SearchquestionService 
module.exports = QuizquestionService
