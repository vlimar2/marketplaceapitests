'use strict';

var QuizService = require('../services/quizService')
var ValidacaoQuiz = require('../validation/validacaoQuiz')
var BodyEditQuizFactory = require('../factories/bodyEditQuizFactory')
var moment = require('moment')
var data = new Date()
var dataHoje = moment.utc(data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()).format('DD/MM/YYYY')

var ValidaQuiz = function () {
    
}

ValidaQuiz.prototype.cadastrarQuiz = async function (quiz) {
    var criarQuiz = new QuizService()
    var validacaoQuiz = new ValidacaoQuiz()
    quiz.responseCreateQuiz = await criarQuiz.createQuiz(quiz)
    await validacaoQuiz.validacaoCadastrarQuiz(quiz)
}

ValidaQuiz.prototype.naoCadastrarQuiz = async function (quiz) {
    var criarQuiz = new QuizService()
    var validacaoQuiz = new ValidacaoQuiz()
    quiz.responseCreateQuiz = await criarQuiz.createQuiz(quiz)
    await validacaoQuiz.validacaoNaoCadastrarQuiz(quiz)
}

ValidaQuiz.prototype.editarQuiz = async function (quiz) {
    var editarQuiz = new QuizService()
    var validacaoQuiz = new ValidacaoQuiz()
    quiz.responseEditQuiz = await editarQuiz.editQuiz(quiz)
    await validacaoQuiz.validacaoEditarQuiz(quiz)
}

ValidaQuiz.prototype.naoEditarQuiz = async function (quiz) {
    var editarQuiz = new QuizService()
    var validacaoQuiz = new ValidacaoQuiz()
    quiz.responseEditQuiz = await editarQuiz.editQuiz(quiz)
    await validacaoQuiz.validacaoNaoEditarQuiz(quiz)
}

ValidaQuiz.prototype.consultarListaQuiz = async function () {
    var validacaoQuiz = new ValidacaoQuiz()
    await consultarQuiz()
    await validacaoQuiz.validacaoConsultarQuiz(config.quiz)
}

ValidaQuiz.prototype.quizAtivoVigente = async function (quiz) {
    await consultarQuiz(quiz)
    for(var i = 0; i < config.quiz.responseGetQuiz.body.length; i ++) {
        if(config.quiz.responseGetQuiz.body[i].ativo === true && moment.utc(config.quiz.responseGetQuiz.body[i].dataDe).format('DD/MM/YYYY') <= dataHoje && moment.utc(config.quiz.responseGetQuiz.body[i].dataAte).format('DD/MM/YYYY') >= dataHoje) {
            config.quiz.idQuiz = config.quiz.responseGetQuiz.body[i].quizId
            await consultarQuizId(config.quiz)
            break
        }
        if(i === config.quiz.responseGetQuiz.body.length -1) {
            throw Error('NÃO EXISTE QUIZ ATIVO E VIGENTE')
        }
    }
}

ValidaQuiz.prototype.quizInativo = async function (quiz) {
    await consultarQuiz(quiz)
    for(var i = 0; i < config.quiz.responseGetQuiz.length; i ++) {
        if(config.quiz.responseGetQuiz.body[i].Ativo === false && config.quiz.responseGetQuiz.body[i].dataDe <= dataHoje && config.quiz.responseGetQuiz.body[i].dataAte >= dataHoje) {
            config.quiz.idQuiz === config.quiz.responseGetQuiz.body[i].$id 
            await consultarQuizId(config.quiz)
        }
    }
}

async function consultarQuiz(quiz) {
    var consultarQuiz = new QuizService()
    config.quiz.responseGetQuiz = await consultarQuiz.getQuiz(quiz)
}

ValidaQuiz.prototype.consultarIdQuiz = async function () {
    var validacaoQuiz = new ValidacaoQuiz()
    await consultarQuiz()
    config.quiz.idQuiz === config.quiz.responseGetQuiz.body[0].$id 
    await consultarQuizId(config.quiz)
    await validacaoQuiz.validacaoConsultarIdQuiz(config.quiz)
}

async function consultarQuizId(quiz) {
    var consultarQuiz = new QuizService()
    config.quiz.responseGetQuizId = await consultarQuiz.getQuizId(quiz)
}

ValidaQuiz.prototype.bodyEditarQuizAtivoInativo = function () {
    bodyEditarQuiz()
}

ValidaQuiz.prototype.bodyEditarDataFimQuiz = function () {
    bodyEditarQuiz()
    config.quiz.requestEditQuiz.ativo = true
}

//REVER ESTRUTURA DO BODY
 function bodyEditarQuiz() {
    var bodyEditQuiz = new BodyEditQuizFactory()
    config.quiz.requestEditQuiz = bodyEditQuiz.build()
    config.quiz.requestEditQuiz.id = config.quiz.responseGetQuizId.body.id
    config.quiz.requestEditQuiz.descricao = config.quiz.responseGetQuizId.body.descricao
    config.quiz.requestEditQuiz.dataDe = config.quiz.responseGetQuizId.body.dataDe
    config.quiz.requestEditQuiz.dataAte = config.quiz.responseGetQuizId.body.dataAte
    config.quiz.requestEditQuiz.ativo = false
    for(var i = 0; i < config.quiz.responseGetQuizId.body.quizFuncao.length; i++) {
        config.quiz.requestEditQuiz.quizFuncao[i] === config.quiz.responseGetQuizId.body.quizFuncao[i]
    }        
    for(var j = 0; j < config.quiz.responseGetQuizId.body.QuizPerfis.length; j++) {
        config.quiz.requestEditQuiz.perfisSelecionados[j] === config.quiz.responseGetQuizId.body.QuizPerfis[j] 
    }
    config.quiz.requestEditQuiz.quizId = config.quiz.responseGetQuizId.body.quizId
    for(var k = 0; k < config.quiz.responseGetQuizId.body.Pergunta.length; k++) {
        config.quiz.requestEditQuiz.Pergunta[k].id === config.quiz.responseGetQuizId.body.Pergunta[k].id
        config.quiz.requestEditQuiz.Pergunta[k].descricao === config.quiz.responseGetQuizId.body.Pergunta[k].descricao
        for(var l = 0; l < config.quiz.responseGetQuizId.body.Pergunta[k].Resposta.length; l++) {
            config.quiz.requestEditQuiz.Pergunta[k].Resposta[l].descricao === config.quiz.responseGetQuizId.body.Pergunta[k].Resposta[l].descricao
            config.quiz.requestEditQuiz.Pergunta[k].Resposta[l].correta === config.quiz.responseGetQuizId.body.Pergunta[k].Resposta[l].correta
        }
    }
}

module.exports = ValidaQuiz;