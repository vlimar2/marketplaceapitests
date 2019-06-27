'use strict';

var EnqueteService = require('../services/EnqueteService')
var ValidacaoEnquete = require('./validacaoEnquete')
var BodyEditEnqueteFactory = require('../factories/bodyEditEnqueteFactory')
var moment = require('moment')
var data = new Date()
var dataHoje = moment.utc(data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()).format('DD/MM/YYYY')

var ValidaEnquete = function () {
    
}

ValidaEnquete.prototype.cadastrarEnquete = async function (enquete) {
    var criarEnquete = new EnqueteService()
    var validacaoEnquete = new ValidacaoEnquete()
    enquete.responseCreateEnquete = await criarEnquete.createEnquete(enquete)
    await validacaoEnquete.validacaoCadastrarEnquete(enquete)
    //enquete.requestCreateEnquete.ativo = false
    //await inativarEnquete(config.enquete)
}

ValidaEnquete.prototype.naoCadastrarEnquete = async function (enquete) {
    var criarEnquete = new EnqueteService()
    var validacaoEnquete = new ValidacaoEnquete()
    enquete.responseCreateEnquete = await criarEnquete.createEnquete(enquete)
    await validacaoEnquete.validacaoNaoCadastrarEnquete(enquete)
}

ValidaEnquete.prototype.editarEnquete = async function (enquete) {
    var validacaoEnquete = new ValidacaoEnquete()
    var editarEnquete = new EnqueteService()
    enquete.responseEditEnquete = await editarEnquete.editEnquete(enquete)
    await validacaoEnquete.validacaoEditarEnquete(enquete)
}

async function inativarEnquete (enquete) {
    var validacaoEnquete = new ValidacaoEnquete()
    var editarEnquete = new EnqueteService()
    enquete.responseEditEnquete = await editarEnquete.editEnquete(enquete)
    await validacaoEnquete.validacaoEditarEnquete2(enquete)
}

ValidaEnquete.prototype.naoEditarEnquete = async function (enquete) {
    var editarEnquete = new EnqueteService()
    var validacaoEnquete = new ValidacaoEnquete()
    enquete.responseEditEnquete = await editarEnquete.editEnquete(enquete)
    await validacaoEnquete.validacaoNaoEditarEnquete(enquete)
}

ValidaEnquete.prototype.consultarListaEnquete = async function () {
    var validacaoEnquete = new ValidacaoEnquete()
    await consultarEnquete()
    await validacaoEnquete.validacaoConsultarEnquete(config.enquete)
}

ValidaEnquete.prototype.enqueteAtivoVigente = async function (enquete) {
    await consultarEnquete(enquete)
    for(var i = 0; i < config.enquete.responseGetEnquete.body.length; i ++) {
        if(config.enquete.responseGetEnquete.body[i].ativo === true && moment.utc(config.enquete.responseGetEnquete.body[i].dataDe).format('DD/MM/YYYY') <= dataHoje && moment.utc(config.enquete.responseGetEnquete.body[i].dataAte).format('DD/MM/YYYY') >= dataHoje) {
            config.enquete.idEnquete = config.enquete.responseGetEnquete.body[i].EnqueteId
            await consultarEnqueteId(config.enquete)
            break
        }
        if(i === config.enquete.responseGetEnquete.body.length -1) {
            throw Error('NÃO EXISTE Enquete ATIVO E VIGENTE')
        }
    }
}

ValidaEnquete.prototype.EnqueteInativo = async function (enquete) {
    await consultarEnquete(enquete)
    for(var i = 0; i < config.enquete.responseGetEnquete.length; i ++) {
        if(config.enquete.responseGetEnquete.body[i].Ativo === false && config.enquete.responseGetEnquete.body[i].dataDe <= dataHoje && config.enquete.responseGetEnquete.body[i].dataAte >= dataHoje) {
            config.enquete.idEnquete === config.enquete.responseGetEnquete.body[i].$id 
            await consultarEnqueteId(config.enquete)
        }
    }
}

async function consultarEnquete(enquete) {
    var consultarEnquete = new EnqueteService()
    config.enquete.responseGetEnquete = await consultarEnquete.getEnquete(enquete)
}

ValidaEnquete.prototype.consultarIdEnquete = async function () {
    var validacaoEnquete = new ValidacaoEnquete()
    await consultarEnquete()
    config.enquete.idEnquete === config.enquete.responseGetEnquete.body[0].$id 
    await consultarEnqueteId(config.enquete)
    await validacaoEnquete.validacaoConsultarIdEnquete(config.enquete)
}

async function consultarEnqueteId(enquete) {
    var consultarEnquete = new EnqueteService()
    config.enquete.responseGetEnqueteId = await consultarEnquete.getEnqueteId(enquete)
}

ValidaEnquete.prototype.bodyEditarEnqueteAtivoInativo = function () {
    bodyEditarEnquete()
}

ValidaEnquete.prototype.bodyEditarDataFimEnquete = function () {
    bodyEditarEnquete()
    config.enquete.requestEditEnquete.ativo = true
}

//REVER ESTRUTURA DO BODY
 function bodyEditarEnquete() {
    var bodyEditEnquete = new BodyEditEnqueteFactory()
    config.enquete.requestEditEnquete = bodyEditEnquete.build()
    config.enquete.requestEditEnquete.enqueteId = config.enquete.responseGetEnqueteId.body.id
    config.enquete.requestEditEnquete.descricao = config.enquete.responseGetEnqueteId.body.descricao
    config.enquete.requestEditEnquete.dataDe = config.enquete.responseGetEnqueteId.body.dataDe
    config.enquete.requestEditEnquete.dataAte = config.enquete.responseGetEnqueteId.body.dataAte
    config.enquete.requestEditEnquete.ativo = false
    for(var i = 0; i < config.enquete.responseGetEnqueteId.body.enqueteFuncao.length; i++) {
        config.enquete.requestEditEnquete.enqueteFuncao[i] === config.enquete.responseGetEnqueteId.body.enqueteFuncao[i]
    }        
    for(var j = 0; j < config.enquete.responseGetenqueteId.body.enquetePerfis.length; j++) {
        config.enquete.requestEditEnquete.perfisSelecionados[j] === config.enquete.responseGetEnqueteId.body.enquetePerfis[j] 
    }
    config.enquete.requestEditEnquete.enqueteId = config.enquete.responseGetEnqueteId.body.enqueteId
    for(var k = 0; k < config.enquete.responseGetEnqueteId.body.enquetePergunta.length; k++) {
        config.enquete.requestEditEnquete.enquetePergunta[k].$id === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].$id
        config.enquete.requestEditEnquete.enquetePergunta[k].enquetePerguntaId === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].id
        config.enquete.requestEditEnquete.enquetePergunta[k].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].descricao
        config.enquete.requestEditEnquete.enquetePergunta[k].enqueteId === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteId
        config.enquete.requestEditEnquete.enquetePergunta[k].enquete.$ref === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enquete.$ref
        config.enquete.requestEditEnquete.enquetePergunta[k].dataCriacao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].dataCriacao
        config.enquete.requestEditEnquete.enquetePergunta[k].dataAlteracao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].dataAlteracao
        config.enquete.requestEditEnquete.enquetePergunta[k].userCriacao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].userCriacao
        config.enquete.requestEditEnquete.enquetePergunta[k].userAlteracao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].userAlteracao
        config.enquete.requestEditEnquete.enquetePergunta[k].ativo === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].ativo
        config.enquete.requestEditEnquete.enquetePergunta[k].ordem === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].ordem
        config.enquete.requestEditEnquete.enquetePergunta[k].tipoPerguntaId === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].tipoPerguntaId
        config.enquete.requestEditEnquete.enquetePergunta[k].TipoPergunta === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].TipoPergunta
        config.enquete.requestEditEnquete.enquetePergunta[k].campoAdicional === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].campoAdicional
        config.enquete.requestEditEnquete.enquetePergunta[k].campoAdicionalDescricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].campoAdicionalDescricao
        config.enquete.requestEditEnquete.enquetePergunta[k].limiteQdeResposta === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].limiteQdeResposta
        config.enquete.requestEditEnquete.enquetePergunta[k].imagemResposta === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].imagemResposta  
        for(var l = 0; l < config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta.length; l++) {
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].enqueteRespostaId === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].enqueteRespostaId
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].descricao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].enquetePerguntaId === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].enquetePerguntaId
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].dataCriacao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].dataCriacao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].dataAlteracao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].dataAlteracao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].userCriacao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].userCriacao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].userAlteracao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].userAlteracao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].ativo === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].ativo
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].nomeArquivoGerado === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].nomeArquivoGerado
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].link === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].link
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].descricao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].descricao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].descricao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].descricao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].descricao
            config.enquete.requestEditEnquete.enquetePergunta[k].enqueteResposta[l].descricao === config.enquete.responseGetEnqueteId.body.enquetePergunta[k].enqueteResposta[l].descricao
        }
    }
}

module.exports = ValidaEnquete;