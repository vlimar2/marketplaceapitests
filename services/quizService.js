'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var QuizService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

QuizService.prototype.createQuiz = async function(quiz) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/quiz/full';

        var header = this.util.getDefaultHeader2(quiz.token);

        var responseCreateQuiz = await this.util.postUrl(urlservice, quiz.requestCreateQuiz, header, url);

        return responseCreateQuiz

    } catch(erro) {
        return erro
    }
}

QuizService.prototype.editQuiz = async function(quiz) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/quiz/full/' + quiz.requestEditQuiz.quizId;
    
        var header = this.util.getDefaultHeader2(quiz.token);
    
        var responseEditQuiz = await this.util.putUrl(urlservice, quiz.requestEditQuiz, header, url);
    
        return responseEditQuiz

    } catch(erro) {
        return erro
    }
}

QuizService.prototype.getQuiz = async function(quiz) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/quiz'
    
        var header = this.util.getDefaultHeader2(quiz.token);
    
        var responseGetQuiz = await this.util.getUrl(urlservice, header, url);
    
        return responseGetQuiz
    } catch(erro) {
        return erro
    }
}

QuizService.prototype.getQuizId = async function(quiz) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/quiz/' + quiz.idQuiz
    
        var header = this.util.getDefaultHeader2(quiz.token);
    
        var responseGetQuizId = await this.util.getUrl(urlservice, header, url);
    
        return responseGetQuizId
    } catch(erro) {
        return erro
    }
}

//-------------------------------------------------------------------------------------------------------------------------
QuizService.prototype.createQuizMot = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi2('');

    var url = '/quiz';
    var now = new Date();

    var quizz = {
        quizFuncao : ["MOTORISTA AUTÔNOMO"],
        descricao : "Quiz teste automatizado",
        dataDe: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z',
        dataAte : "2022-12-31T03:00:00.000Z"
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, quizz, header, url);
}

QuizService.prototype.createQuizFro = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi2('');

    var url = '/quiz';
    var now = new Date();

    var quizz = {
        quizFuncao : ["FROTA"],
        descricao : "Quiz teste automatizado",
        dataDe: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z',
        dataAte : "2022-12-31T03:00:00.000Z"
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, quizz, header, url);
}

QuizService.prototype.createQuizOfi = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi2('');

    var url = '/quiz';
    var now = new Date();

    var quizz = {
        quizFuncao : ["OFICINA"],
        descricao : "Quiz teste automatizado",
        dataDe: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z',
        dataAte : "2022-12-31T03:00:00.000Z"
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, quizz, header, url);
}

QuizService.prototype.answerQuiz = function(token, RespostaId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi2('');

    var url = '/quiz/RespostaParticipante';
    var now = new Date();

    var quizanswer = {
        respostaId: [RespostaId]
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, quizanswer, header, url);
}

QuizService.prototype.quizByfuncao = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi2('');

    var url = '/quiz/QuizPerfilByFuncao';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

QuizService.prototype.deletequiz = function(token, QuizId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi2('');

    var url = '/Quiz/'+ QuizId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.deleteUrl1(urlservice, header, url);
}

QuizService.prototype.inativaquiz = function(token, QuizId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi2('');

    var url = '/quiz/Inativar/'+ QuizId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = QuizService
