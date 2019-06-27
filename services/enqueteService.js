'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var EnqueteService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

EnqueteService.prototype.createEnquete = async function(enquete) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/enquete/full';

        var header = this.util.getDefaultHeader4(enquete.token);

        var responseCreateEnquete = await this.util.postUrl(urlservice, enquete.requestCreateEnquete, header, url);

        return responseCreateEnquete

    } catch(erro) {
        return erro
    }
}

EnqueteService.prototype.editEnquete = async function(enquete) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/enquete/full/' + enquete.requestEditEnquete.enqueteId;
    
        var header = this.util.getDefaultHeader4(enquete.token);
    
        var responseEditEnquete = await this.util.putUrl(urlservice, enquete.requestEditEnquete, header, url);
    
        return responseEditEnquete

    } catch(erro) {
        return erro
    }
}

EnqueteService.prototype.getEnquete = async function(Enquete) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/enquete'
    
        var header = this.util.getDefaultHeader2(Enquete.token);
    
        var responseGetEnquete = await this.util.getUrl(urlservice, header, url);
    
        return responseGetEnquete
    } catch(erro) {
        return erro
    }
}

EnqueteService.prototype.getEnqueteId = async function(Enquete) {
    try{
        var urlservice = await this.urlService.getFullUrlPrincipalApi2('');

        var url = '/enquete/' + Enquete.idEnquete
    
        var header = this.util.getDefaultHeader2(Enquete.token);
    
        var responseGetEnqueteId = await this.util.getUrl(urlservice, header, url);
    
        return responseGetEnqueteId
    } catch(erro) {
        return erro
    }
}

//--------------------------------------------------------------------------------------------------------------------------
EnqueteService.prototype.createEnqueteFro = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete';
    var now = new Date();

    var enquete = {
        ativo: true,
        dataAlteracao: null,
        dataAte: "2022-12-31T02:00:00.000Z",
        dataDe: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z',
        descricao: "Enquete automatizada",
        enqueteFuncao: ["FROTA"]
    };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, enquete, header, url);///enquete/enqueteRespostaParticipante
}

EnqueteService.prototype.createEnqueteOfi = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete';
    var now = new Date();

    var enquete = {
        ativo: true,
        dataAlteracao: null,
        dataAte: "2022-12-31T02:00:00.000Z",
        dataDe: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z',
        descricao: "Enquete automatizada",
        enqueteFuncao: ["OFICINA"]
    };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, enquete, header, url);
}

EnqueteService.prototype.answerEnquete = function (token, ParticipanteId, PerguntaId, RespostaId, EnqueteId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete/enqueteRespostaParticipante';
    var now = new Date();

    var enqueteanswer = {
        participanteId: ParticipanteId,
        respostaDescricao: [
            {
                perguntaId: PerguntaId,
                descricao: "Enquete automatizada",
                respostaId: RespostaId
            }
        ], enqueteId: EnqueteId
    }

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, enqueteanswer, header, url);
}

EnqueteService.prototype.createEnqueteMot = function (token, Ativo) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete';
    var now = new Date();

    var enquete = {
        ativo: '',
        dataAlteracao: null,
        dataAte: "2022-12-31T02:00:00.000Z",
        dataDe: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z',
        descricao: "Enquete automatizada",
        enqueteFuncao: ["MOTORISTA AUTÔNOMO"]
    };

    enquete.ativo = Ativo

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, enquete, header, url);
}

EnqueteService.prototype.enqueteByfuncao = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete/EnquetePerfilByFuncao';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

EnqueteService.prototype.enqueteByfuncaopart = function (tokenpart) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete/EnquetePerfilByFuncao';

    var header = this.util.getDefaultHeader2(tokenpart);

    return this.util.getUrl(urlservice, header, url);
}

EnqueteService.prototype.deleteenquete = function (token, EnqueteId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/enquete/' + EnqueteId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.deleteUrl1(urlservice, header, url);
}

/*EnqueteService.prototype.inativaenquete = function(token, EnqueteId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/Enquete/Inativar/'+ EnqueteId;

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}*/

module.exports = EnqueteService
