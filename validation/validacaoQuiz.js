'use strict';

var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
let config = require('../config')
var moment = require('moment')

var ValidacaoQuiz = function () {
    
}

ValidacaoQuiz.prototype.validacaoCadastrarQuiz = function (quiz) {
    console.log('- VALIDAÇÃO CADASTRAR QUIZ - Iniciado')
    expect(quiz.responseCreateQuiz,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    expect(quiz.requestCreateQuiz.descricao, 'Valida descrição(título do Quiz)').to.equal(quiz.responseCreateQuiz.body.descricao)   
    expect(moment.utc(quiz.requestCreateQuiz.dataDe).format('DD/MM/YYYY'), 'Valida data de início da vigência').to.equal(moment.utc(quiz.responseCreateQuiz.body.dataDe).format('DD/MM/YYYY'))  
    expect(moment.utc(quiz.requestCreateQuiz.dataAte).format('DD/MM/YYYY') + 'T23:59:59', 'Valida data de final da vigência').to.equal(moment.utc(quiz.responseCreateQuiz.body.dataAte).format('DD/MM/YYYY') + 'T23:59:59')  
    expect(quiz.requestCreateQuiz.ativo, 'Valida status do Quiz').to.equal(quiz.responseCreateQuiz.body.ativo)
    for(var i = 0; i < quiz.requestCreateQuiz.quizFuncao.length; i++) {
        for(var n = 0; n < quiz.requestCreateQuiz.quizFuncao.length; n++) {
            if(quiz.requestCreateQuiz.quizFuncao[i] === quiz.responseCreateQuiz.body.quizFuncao[n]) {
                expect(quiz.requestCreateQuiz.quizFuncao[i], 'Valida perfis participante do Quiz').to.equal(quiz.responseCreateQuiz.body.quizFuncao[n])  
                break
            }
            if(n === quiz.requestCreateQuiz.quizFuncao.length -1) {
                throw Error('Perfil não cadastrado')
            }
        }
    }  
    for(var j = 0; j < quiz.requestCreateQuiz.perfisSelecionados.length; j++) {
        for(var o = 0; o < quiz.requestCreateQuiz.perfisSelecionados.length; o++) {
            if(quiz.requestCreateQuiz.perfisSelecionados[j] === quiz.responseCreateQuiz.body.perfisSelecionados[o]) {
                expect(quiz.requestCreateQuiz.perfisSelecionados[j], 'Valida subperfis participante do Quiz').to.equal(quiz.responseCreateQuiz.body.perfisSelecionados[o]) 
                break
            }
            if(o === quiz.requestCreateQuiz.perfisSelecionados.length -1) {
                throw Error('Subperfil não cadastrado')
            }
        }
    }
    for(var l = 0; l < quiz.requestCreateQuiz.Pergunta.length; l++) {
        expect(quiz.requestCreateQuiz.Pergunta[l].descricao, '').to.equal(quiz.responseCreateQuiz.body.Pergunta[l].descricao)
        for(var m = 0; m < quiz.requestCreateQuiz.Pergunta[l].Resposta.length; m++) {
            expect(quiz.requestCreateQuiz.Pergunta[l].Resposta[m].descricao, '').to.equal(quiz.responseCreateQuiz.body.Pergunta[l].Resposta[m].descricao)
            expect(quiz.requestCreateQuiz.Pergunta[l].Resposta[m].correta, '').to.equal(quiz.responseCreateQuiz.body.Pergunta[l].Resposta[m].correta)
        }  
    }
    console.log('✓ VALIDAÇÃO CADASTRAR QUIZ - finalizado')    
    return "OK"
}

ValidacaoQuiz.prototype.validacaoEditarQuiz = function (quiz) {
    console.log('- VALIDAÇÃO EDITAR QUIZ - Iniciado')
    expect(quiz.responseEditQuiz,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    expect(quiz.requestEditQuiz.descricao, 'Valida descrição(título do Quiz)').to.equal(quiz.responseEditQuiz.body.descricao)   
    expect(moment.utc(quiz.requestEditQuiz.dataDe).format('DD/MM/YYYY'), 'Valida data de início da vigência').to.equal(moment.utc(quiz.responseEditQuiz.body.dataDe).format('DD/MM/YYYY'))  
    expect(moment.utc(quiz.requestEditQuiz.dataAte).format('DD/MM/YYYY'), 'Valida data de final da vigência').to.equal(moment.utc(quiz.responseEditQuiz.body.dataAte).format('DD/MM/YYYY'))  
    expect(quiz.requestEditQuiz.ativo, 'Valida status do Quiz').to.equal(quiz.responseEditQuiz.body.ativo)
    for(var i = 0; i < quiz.requestEditQuiz.quizFuncao.length; i++) {
        for(var n = 0; n < quiz.requestEditQuiz.quizFuncao.length; n++) {
            if(quiz.requestEditQuiz.quizFuncao[i] === quiz.responseEditQuiz.body.quizFuncao[n]) {
                expect(quiz.requestEditQuiz.quizFuncao[i], 'Valida perfis participante do Quiz').to.equal(quiz.responseEditQuiz.body.quizFuncao[n])  
                break
            }
            if(n === quiz.requestEditQuiz.quizFuncao.length -1) {
                throw Error('Perfil não cadastrado')
            }
        }
    }  
    for(var j = 0; j < quiz.requestEditQuiz.perfisSelecionados.length; j++) {
        for(var o = 0; o < quiz.requestEditQuiz.perfisSelecionados.length; o++) {
            if(quiz.requestEditQuiz.perfisSelecionados[j] === quiz.responseEditQuiz.body.perfisSelecionados[o]) {
                expect(quiz.requestEditQuiz.perfisSelecionados[j], 'Valida subperfis participante do Quiz').to.equal(quiz.responseEditQuiz.body.perfisSelecionados[o]) 
                break
            }
            if(o === quiz.requestEditQuiz.perfisSelecionados.length -1) {
                throw Error('Subperfil não cadastrado')
            }
        }
    }
    for(var l = 0; l < quiz.requestEditQuiz.Pergunta.length; l++) {
        expect(quiz.requestEditQuiz.Pergunta[l].descricao, '').to.equal(quiz.responseEditQuiz.body.Pergunta[l].descricao)
        for(var m = 0; m < quiz.requestEditQuiz.Pergunta[0].Resposta.length; m++) {
            expect(quiz.requestEditQuiz.Pergunta[l].Resposta[m].descricao, '').to.equal(quiz.responseEditQuiz.body.Pergunta[l].Resposta[m].descricao)
            expect(quiz.requestEditQuiz.Pergunta[l].Resposta[m].correta, '').to.equal(quiz.responseEditQuiz.body.Pergunta[l].Resposta[m].correta)
        }  
    }
    console.log('✓ VALIDAÇÃO EDITAR QUIZ - finalizado')    
    return "OK"
}

ValidacaoQuiz.prototype.validacaoNaoEditarQuiz = function (quiz) {
    console.log('- VALIDAÇÃO NÃO EDITAR QUIZ - Iniciado')
    validacaoErroQuiz(quiz)    
    console.log('✓ VALIDAÇÃO NÃO EDITAR QUIZ - finalizado')    
    return "OK"
}

ValidacaoQuiz.prototype.validacaoNaoCadastrarQuiz = function (quiz) {
    console.log('- VALIDAÇÃO NÃO CADASTRAR QUIZ - Iniciado')
    validacaoErroQuiz(quiz)
    console.log('✓ VALIDAÇÃO NÃO CADASTRAR QUIZ - finalizado')    
    return "OK"
}

function validacaoErroQuiz(quiz) {
    var responseQuiz = quiz.responseCreateQuiz || quiz.responseEditQuiz
    expect(responseQuiz,'Deve retornar status 400').to.have.status(config.util.HTTP.BAD_REQUEST) 
    var perfilObrigatorio = 'O campo Perfil é obrigatório.'
    if(responseQuiz.response.body[0].ErrorMessage === perfilObrigatorio) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida que perfil é obrigatório').to.equal(perfilObrigatorio)
    }
    var subperfilObrigatorio = 'O campo Sub Perfil é obrigatório.'
    if(responseQuiz.response.body[0].ErrorMessage === subperfilObrigatorio) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida que subperfil é obrigatório').to.equal(subperfilObrigatorio)
    }
    var tituloObrigatorio = 'O campo Título do Quiz é obrigatório.'
    if(responseQuiz.response.body[0].ErrorMessage === tituloObrigatorio) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida que título é obrigatório').to.equal(tituloObrigatorio)
    }
    var dataInicioObrigatorio = 'O campo Data início é obrigatório.'
    if(responseQuiz.response.body[0].ErrorMessage === dataInicioObrigatorio) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida que data início é obrigatório').to.equal(dataInicioObrigatorio)
    }
    var dataInicioMenorHoje = 'O campo Data início não pode ser menor que a data atual'
    if(responseQuiz.response.body[0].ErrorMessage === dataInicioMenorHoje) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida que data início é menor que hoje').to.equal(dataInicioMenorHoje)
    }
    var dataFimMaiorDataInicio = 'A data do campo Data fim deve ser maior ou igual a data do campo Data início'
    if(responseQuiz.response.body[0].ErrorMessage === dataFimMaiorDataInicio) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida que data fim é maior que data início').to.equal(dataFimMaiorDataInicio)
    }
    var dataFimObrigatorio = 'O campo Data fim é obrigatório.'
    if(responseQuiz.response.body[0].ErrorMessage === dataFimObrigatorio) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida que data fim é obrigatório').to.equal(dataFimObrigatorio)
    }
    var quizAtivoNoPeriodo = 'Já existe quiz ativo para o perfil selecionado no período'
    if(responseQuiz.response.body[0].ErrorMessage === quizAtivoNoPeriodo) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida Quiz ativo no período').to.equal(quizAtivoNoPeriodo)
    }
    var quizesAtivoNoPeriodo = 'Já existe quiz ativo para os perfis selecionados no período'
    if(responseQuiz.response.body[0].ErrorMessage === quizesAtivoNoPeriodo) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida Quiz ativo no período').to.equal(quizesAtivoNoPeriodo)
    }
    var perguntaObrigatorio = 'O campo pergunta é obrigatório.'
    if(responseQuiz.response.body[0].ErrorMessage === perguntaObrigatorio) {
        expect(responseQuiz.response.body[0].ErrorMessage, 'Valida pergunta obrigatório').to.equal(perguntaObrigatorio)
    }
    for(var i = 0; i < responseQuiz.response.body.length; i++) {
        var respostaObrigatorio = 'O campo resposta é obrigatório.'
        if(responseQuiz.response.body[i].ErrorMessage === respostaObrigatorio) {
            expect(responseQuiz.response.body[i].ErrorMessage, 'Valida resposta obrigatório').to.equal(respostaObrigatorio)
        }
        var pergunta2resposta = 'A pergunta:Pergunta 1, deve conter no mínimo 2 respostas'
        if(responseQuiz.response.body[i].ErrorMessage === pergunta2resposta) {
            expect(responseQuiz.response.body[i].ErrorMessage, 'Valida pergunta 2 resposta').to.equal(pergunta2resposta)
        }
        var pergunta2resposta2 = 'A pergunta:Pergunta 2, deve conter no mínimo 2 respostas'
        if(responseQuiz.response.body[i].ErrorMessage === pergunta2resposta2) {
            expect(responseQuiz.response.body[i].ErrorMessage, 'Valida pergunta 2 resposta').to.equal(pergunta2resposta2)
        }
        var descricaoRespostaObrigatorio = 'O campo descrição da resposta é obrigatório.'
        if(responseQuiz.response.body[i].ErrorMessage === descricaoRespostaObrigatorio) {
            expect(responseQuiz.response.body[i].ErrorMessage, 'Valida descrição resposta em branco').to.equal(descricaoRespostaObrigatorio)
        }
        var respostaCorreta = 'A pergunta:Pergunta 1, deve conter máximo 1 resposta correta'
        if(responseQuiz.response.body[i].ErrorMessage === respostaCorreta) {
            expect(responseQuiz.response.body[i].ErrorMessage, 'Valida resposta correta').to.equal(respostaCorreta)
        }
    }
    
    return "OK"
}



ValidacaoQuiz.prototype.validacaoConsultarQuiz = function (quiz) {
    console.log('- VALIDAÇÃO CONSULTAR QUIZ - Iniciado')
    expect(quiz.responseGetQuiz,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    if(quiz.responseGetQuiz.body.lenght > 0) {
        console.log('Lista de Quiz maior que 0')
    }
    console.log('✓ VALIDAÇÃO CONSULTAR QUIZ - finalizado')    
    return "OK"
}

ValidacaoQuiz.prototype.validacaoConsultarIdQuiz = function (quiz) {
    console.log('- VALIDAÇÃO CONSULTAR ID QUIZ - Iniciado')
    expect(quiz.responseGetQuizId,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    expect(quiz.responseGetQuizId.body.lenght, 'Valida que retornou 1 quiz').to.equal(1)
    console.log('✓ VALIDAÇÃO CONSULTAR ID QUIZ - finalizado')    
    return "OK"
}

module.exports = ValidacaoQuiz;