'use strict';

var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
let config = require('../config')
var moment = require('moment')

var ValidacaoEnquete = function () {
    
}

ValidacaoEnquete.prototype.validacaoCadastrarEnquete = function (enquete) {
    console.log('- VALIDAÇÃO CADASTRAR Enquete - Iniciado')
    expect(enquete.responseCreateEnquete,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    expect(enquete.requestCreateEnquete.descricao, 'Valida descrição(título do Enquete)').to.equal(enquete.responseCreateEnquete.body.descricao)   
    expect(moment.utc(enquete.requestCreateEnquete.dataDe).format('DD/MM/YYYY'), 'Valida data de início da vigência').to.equal(moment.utc(enquete.responseCreateEnquete.body.dataDe).format('DD/MM/YYYY'))  
    expect(moment.utc(enquete.requestCreateEnquete.dataAte).format('DD/MM/YYYY') + 'T23:59:59', 'Valida data de final da vigência').to.equal(moment.utc(enquete.responseCreateEnquete.body.dataAte).format('DD/MM/YYYY') + 'T23:59:59')  
    expect(enquete.requestCreateEnquete.ativo, 'Valida status do Enquete').to.equal(enquete.responseCreateEnquete.body.ativo)
    for(var i = 0; i < enquete.requestCreateEnquete.enqueteFuncao.length; i++) {
        for(var n = 0; n < enquete.requestCreateEnquete.enqueteFuncao.length; n++) {
            if(enquete.requestCreateEnquete.enqueteFuncao[i] === enquete.responseCreateEnquete.body.enqueteFuncao[n]) {
                expect(enquete.requestCreateEnquete.enqueteFuncao[i], 'Valida perfis participante do Enquete').to.equal(enquete.responseCreateEnquete.body.enqueteFuncao[n])  
                break
            }
            if(n === enquete.requestCreateEnquete.enqueteFuncao.length -1) {
                throw Error('Perfil não cadastrado')
            }
        }
    }  
    for(var j = 0; j < enquete.requestCreateEnquete.perfisSelecionados.length; j++) {
        for(var o = 0; o < enquete.requestCreateEnquete.perfisSelecionados.length; o++) {
            if(enquete.requestCreateEnquete.perfisSelecionados[j] === enquete.responseCreateEnquete.body.perfisSelecionados[o]) {
                expect(enquete.requestCreateEnquete.perfisSelecionados[j], 'Valida subperfis participante do Enquete').to.equal(enquete.responseCreateEnquete.body.perfisSelecionados[o]) 
                break
            }
            if(o === enquete.requestCreateEnquete.perfisSelecionados.length -1) {
                throw Error('Subperfil não cadastrado')
            }
        }
    }
    for(var l = 0; l < enquete.requestCreateEnquete.enquetePergunta.length; l++) {
        expect(enquete.requestCreateEnquete.enquetePergunta[l].descricao, '').to.equal(enquete.responseCreateEnquete.body.enquetePergunta[l].descricao)
        expect(enquete.requestCreateEnquete.enquetePergunta[l].tipoPerguntaId, '').to.equal(enquete.responseCreateEnquete.body.enquetePergunta[l].tipoPerguntaId)
        for(var m = 0; m < enquete.requestCreateEnquete.enquetePergunta[l].enqueteResposta.length; m++) {
            expect(enquete.requestCreateEnquete.enquetePergunta[l].enqueteResposta[m].descricao, '').to.equal(enquete.responseCreateEnquete.body.enquetePergunta[l].enqueteResposta[m].descricao)
            expect(enquete.requestCreateEnquete.enquetePergunta[l].enqueteResposta[m].ativo, '').to.equal(enquete.responseCreateEnquete.body.enquetePergunta[l].enqueteResposta[m].ativo)
            expect(enquete.requestCreateEnquete.enquetePergunta[l].enqueteResposta[m].link, '').to.equal(enquete.responseCreateEnquete.body.enquetePergunta[l].enqueteResposta[m].link)
            expect(enquete.requestCreateEnquete.enquetePergunta[l].enqueteResposta[m].nomeArquivoGerado, '').to.equal(enquete.responseCreateEnquete.body.enquetePergunta[l].enqueteResposta[m].nomeArquivoGerado)
        }  
    }
    console.log('✓ VALIDAÇÃO CADASTRAR Enquete - finalizado')    
    return "OK"
}

ValidacaoEnquete.prototype.validacaoEditarEnquete = function (enquete) {
    console.log('- VALIDAÇÃO EDITAR Enquete - Iniciado')
    expect(enquete.responseEditEnquete,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    expect(enquete.requestEditEnquete.descricao, 'Valida descrição(título do Enquete)').to.equal(enquete.responseEditEnquete.body.descricao)   
    expect(moment.utc(enquete.requestEditEnquete.dataDe).format('DD/MM/YYYY'), 'Valida data de início da vigência').to.equal(moment.utc(enquete.responseEditEnquete.body.dataDe).format('DD/MM/YYYY'))  
    expect(moment.utc(enquete.requestEditEnquete.dataAte).format('DD/MM/YYYY'), 'Valida data de final da vigência').to.equal(moment.utc(enquete.responseEditEnquete.body.dataAte).format('DD/MM/YYYY'))  
    expect(enquete.requestEditEnquete.ativo, 'Valida status do Enquete').to.equal(enquete.responseEditEnquete.body.ativo)
    for(var i = 0; i < enquete.requestEditEnquete.enqueteFuncao.length; i++) {
        for(var n = 0; n < enquete.requestEditEnquete.enqueteFuncao.length; n++) {
            if(enquete.requestEditEnquete.enqueteFuncao[i] === enquete.responseEditEnquete.body.enqueteFuncao[n]) {
                expect(enquete.requestEditEnquete.enqueteFuncao[i], 'Valida perfis participante do Enquete').to.equal(enquete.responseEditEnquete.body.enqueteFuncao[n])  
                break
            }
            if(n === enquete.requestEditEnquete.enqueteFuncao.length -1) {
                throw Error('Perfil não cadastrado')
            }
        }
    }  
    for(var j = 0; j < enquete.requestEditEnquete.perfisSelecionados.length; j++) {
        for(var o = 0; o < enquete.requestEditEnquete.perfisSelecionados.length; o++) {
            if(enquete.requestEditEnquete.perfisSelecionados[j] === enquete.responseEditEnquete.body.perfisSelecionados[o]) {
                expect(enquete.requestEditEnquete.perfisSelecionados[j], 'Valida subperfis participante do Enquete').to.equal(enquete.responseEditEnquete.body.perfisSelecionados[o]) 
                break
            }
            if(o === enquete.requestEditEnquete.perfisSelecionados.length -1) {
                throw Error('Subperfil não cadastrado')
            }
        }
    }
    for(var l = 0; l < enquete.requestEditEnquete.enquetePergunta.length; l++) {
        expect(enquete.requestEditEnquete.enquetePergunta[l].descricao, '').to.equal(enquete.responseEditEnquete.body.enquetePergunta[l].descricao)
        for(var m = 0; m < enquete.responseEditEnquete.body.enquetePergunta[l].enqueteResposta.length; m++) {
            if(enquete.responseEditEnquete.body.enquetePergunta[l].enqueteResposta.length !== 0) {
                expect(enquete.requestEditEnquete.enquetePergunta[l].enqueteResposta[m].descricao, '').to.equal(enquete.responseEditEnquete.body.enquetePergunta[l].enqueteResposta[m].descricao)
                expect(enquete.requestEditEnquete.enquetePergunta[l].enqueteResposta[m].ativo, '').to.equal(enquete.responseEditEnquete.body.enquetePergunta[l].enqueteResposta[m].ativo)
                expect(enquete.requestEditEnquete.enquetePergunta[l].enqueteResposta[m].link, '').to.equal(enquete.responseEditEnquete.body.enquetePergunta[l].enqueteResposta[m].link)
                expect(enquete.requestEditEnquete.enquetePergunta[l].enqueteResposta[m].nomeArquivoGerado, '').to.equal(enquete.responseEditEnquete.body.enquetePergunta[l].enqueteResposta[m].nomeArquivoGerado)
                break
            }
        }  
    }
    console.log('✓ VALIDAÇÃO EDITAR Enquete - finalizado')    
    return "OK"
}

ValidacaoEnquete.prototype.validacaoNaoEditarEnquete = function (Enquete) {
    console.log('- VALIDAÇÃO NÃO EDITAR Enquete - Iniciado')
    validacaoErroEnquete(Enquete)    
    console.log('✓ VALIDAÇÃO NÃO EDITAR Enquete - finalizado')    
    return "OK"
}

ValidacaoEnquete.prototype.validacaoNaoCadastrarEnquete = function (Enquete) {
    console.log('- VALIDAÇÃO NÃO CADASTRAR Enquete - Iniciado')
    validacaoErroEnquete(Enquete)
    console.log('✓ VALIDAÇÃO NÃO CADASTRAR Enquete - finalizado')    
    return "OK"
}

function validacaoErroEnquete(Enquete) {
    var responseEnquete = Enquete.responseCreateEnquete || Enquete.responseEditEnquete
    expect(responseEnquete,'Deve retornar status 400').to.have.status(config.util.HTTP.BAD_REQUEST) 
    var perfilObrigatorio = 'O campo Perfil é obrigatório.'
    if(responseEnquete.response.body[0].ErrorMessage === perfilObrigatorio) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida que perfil é obrigatório').to.equal(perfilObrigatorio)
    }
    var subperfilObrigatorio = 'O campo Sub Perfil é obrigatório.'
    if(responseEnquete.response.body[0].ErrorMessage === subperfilObrigatorio) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida que subperfil é obrigatório').to.equal(subperfilObrigatorio)
    }
    var tituloObrigatorio = 'O campo Título do Enquete é obrigatório.'
    if(responseEnquete.response.body[0].ErrorMessage === tituloObrigatorio) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida que título é obrigatório').to.equal(tituloObrigatorio)
    }
    var dataInicioObrigatorio = 'O campo Data início é obrigatório.'
    if(responseEnquete.response.body[0].ErrorMessage === dataInicioObrigatorio) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida que data início é obrigatório').to.equal(dataInicioObrigatorio)
    }
    var dataInicioMenorHoje = 'O campo Data início não pode ser menor que a data atual'
    if(responseEnquete.response.body[0].ErrorMessage === dataInicioMenorHoje) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida que data início é menor que hoje').to.equal(dataInicioMenorHoje)
    }
    var dataFimMaiorDataInicio = 'A data do campo Data fim deve ser maior ou igual a data do campo Data início'
    if(responseEnquete.response.body[0].ErrorMessage === dataFimMaiorDataInicio) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida que data fim é maior que data início').to.equal(dataFimMaiorDataInicio)
    }
    var dataFimObrigatorio = 'O campo Data fim é obrigatório.'
    if(responseEnquete.response.body[0].ErrorMessage === dataFimObrigatorio) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida que data fim é obrigatório').to.equal(dataFimObrigatorio)
    }
    var EnqueteAtivoNoPeriodo = 'Já existe Enquete ativo para o perfil selecionado no período'
    if(responseEnquete.response.body[0].ErrorMessage === EnqueteAtivoNoPeriodo) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida Enquete ativo no período').to.equal(EnqueteAtivoNoPeriodo)
    }
    var EnqueteesAtivoNoPeriodo = 'Já existe Enquete ativo para os perfis selecionados no período'
    if(responseEnquete.response.body[0].ErrorMessage === EnqueteesAtivoNoPeriodo) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida Enquete ativo no período').to.equal(EnqueteesAtivoNoPeriodo)
    }
    var perguntaObrigatorio = 'O campo pergunta é obrigatório.'
    if(responseEnquete.response.body[0].ErrorMessage === perguntaObrigatorio) {
        expect(responseEnquete.response.body[0].ErrorMessage, 'Valida pergunta obrigatório').to.equal(perguntaObrigatorio)
    }
    for(var i = 0; i < responseEnquete.response.body.length; i++) {
        var respostaObrigatorio = 'O campo resposta é obrigatório.'
        if(responseEnquete.response.body[i].ErrorMessage === respostaObrigatorio) {
            expect(responseEnquete.response.body[i].ErrorMessage, 'Valida resposta obrigatório').to.equal(respostaObrigatorio)
        }
        var pergunta2resposta = 'A pergunta:Pergunta 1, deve conter no mínimo 2 respostas'
        if(responseEnquete.response.body[i].ErrorMessage === pergunta2resposta) {
            expect(responseEnquete.response.body[i].ErrorMessage, 'Valida pergunta 2 resposta').to.equal(pergunta2resposta)
        }
        var pergunta2resposta2 = 'A pergunta:Pergunta 2, deve conter no mínimo 2 respostas'
        if(responseEnquete.response.body[i].ErrorMessage === pergunta2resposta2) {
            expect(responseEnquete.response.body[i].ErrorMessage, 'Valida pergunta 2 resposta').to.equal(pergunta2resposta2)
        }
        var descricaoRespostaObrigatorio = 'O campo descrição da resposta é obrigatório.'
        if(responseEnquete.response.body[i].ErrorMessage === descricaoRespostaObrigatorio) {
            expect(responseEnquete.response.body[i].ErrorMessage, 'Valida descrição resposta em branco').to.equal(descricaoRespostaObrigatorio)
        }
        var respostaCorreta = 'A pergunta:Pergunta 1, deve conter máximo 1 resposta correta'
        if(responseEnquete.response.body[i].ErrorMessage === respostaCorreta) {
            expect(responseEnquete.response.body[i].ErrorMessage, 'Valida resposta correta').to.equal(respostaCorreta)
        }
    }
    
    return "OK"
}

ValidacaoEnquete.prototype.validacaoConsultarEnquete = function (Enquete) {
    console.log('- VALIDAÇÃO CONSULTAR Enquete - Iniciado')
    expect(Enquete.responseGetEnquete,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    if(Enquete.responseGetEnquete.body.lenght > 0) {
        console.log('Lista de Enquete maior que 0')
    }
    console.log('✓ VALIDAÇÃO CONSULTAR Enquete - finalizado')    
    return "OK"
}

ValidacaoEnquete.prototype.validacaoConsultarIdEnquete = function (Enquete) {
    console.log('- VALIDAÇÃO CONSULTAR ID Enquete - Iniciado')
    expect(Enquete.responseGetEnqueteId,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    expect(Enquete.responseGetEnqueteId.body.lenght, 'Valida que retornou 1 Enquete').to.equal(1)
    console.log('✓ VALIDAÇÃO CONSULTAR ID Enquete - finalizado')    
    return "OK"
}

ValidacaoEnquete.prototype.validacaoEditarEnquete2 = function (Enquete) {
    console.log('- VALIDAÇÃO EDITAR Enquete - Iniciado')
    expect(Enquete.responseEditEnquete,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    console.log('✓ VALIDAÇÃO EDITAR Enquete - finalizado')    
    return "OK"
}

module.exports = ValidacaoEnquete;