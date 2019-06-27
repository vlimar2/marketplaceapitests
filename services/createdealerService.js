'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var CreatedealerService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

CreatedealerService.prototype.createdealerP = async function (token) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/dealer';
        //const cnpj = this.util.cnpj();

        var header = this.util.getDefaultHeader2(token);

        //config.indicateProprietario.cnpj = cnpj
        var response = await this.util.postUrl(urlservice, config.createdealerportep, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

CreatedealerService.prototype.createpassdealerP = async function (token, documentoParticipante, dealerId) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/participante/usuario';

        var dealerpass = {
            confirmacaoSenha: "123456789",
            dealerId: null,
            documentoParticipante: "",
            email: "cursoqaltm1@gmail.com",
            funcaoDescricao: "Auditoria",
            funcaoParticipante: "54786C70-B31D-4156-B1EC-46693636C309",
            nome: "Rafael teste P",
            //nome: new Date().getTime().toString(),
            senha: "123456789",
            telefone: "11900000000",
        };

        var header = this.util.getDefaultHeader2(token);

        dealerpass.documentoparticipante = documentoParticipante
        dealerpass.dealerId = dealerId

        var response = await this.util.postUrl(urlservice, dealerpass, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

CreatedealerService.prototype.createdealerM = async function (token, CNPJ) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/dealer';
        //const cnpj = this.util.cnpj();

        var header = this.util.getDefaultHeader2(token);

        //config.indicateProprietario.cnpj = cnpj
        var response = await this.util.postUrl(urlservice, config.createdealerportem, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

CreatedealerService.prototype.createpassdealerM = async function (token, documentoParticipante) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '//participante/usuario';

        var dealerpass = {
            confirmacaoSenha: "123456789",
            dealerId: null,
            documentoParticipante: "",
            email: "cursoqaltm1@gmail.com",
            funcaoDescricao: "Auditoria",
            funcaoParticipante: "54786C70-B31D-4156-B1EC-46693636C309",
            nome: "Rafael teste M",
            //nome: new Date().getTime().toString(),
            senha: "123456789",
            telefone: "11900000000",
        };

        var header = this.util.getDefaultHeader2(token);

        dealerpass.documentoparticipante = documentoParticipante

        var response = await this.util.postUrl(urlservice, dealerpass, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

CreatedealerService.prototype.createdealerG = async function (token, CNPJ) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/dealer';
        //const cnpj = this.util.cnpj();

        var header = this.util.getDefaultHeader2(token);

        //config.indicateProprietario.cnpj = cnpj
        var response = await this.util.postUrl(urlservice, config.createdealerporteg, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

CreatedealerService.prototype.createpassdealerG = async function (token, documentoParticipante) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '//participante/usuario';

        var dealerpass = {
            confirmacaoSenha: "123456789",
            dealerId: null,
            documentoParticipante: "",
            email: "cursoqaltm1@gmail.com",
            funcaoDescricao: "Auditoria",
            funcaoParticipante: "54786C70-B31D-4156-B1EC-46693636C309",
            nome: "Rafael teste G",
            //nome: new Date().getTime().toString(),
            senha: "123456789",
            telefone: "11900000000",
        };

        var header = this.util.getDefaultHeader2(token);

        dealerpass.documentoparticipante = documentoParticipante

        var response = await this.util.postUrl(urlservice, dealerpass, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

CreatedealerService.prototype.getdealer = function (token) {
    try {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/concessionaria';

    var header = this.util.getDefaultHeader2(token);

    var response = this.util.getUrl(urlservice, header, url);

    return response

    }catch(erro){
return erro
    }
}

CreatedealerService.prototype.editDealer = async function (editar) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = 'dealer/' + editar.id;
        //const cnpj = this.util.cnpj();

        var header = this.util.getDefaultHeader2(editar.token);

        //config.indicateProprietario.cnpj = cnpj
        var response = await this.util.putUrl(urlservice, config.editarDealer.body, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

CreatedealerService.prototype.cnpjdealer = function () {

    config.createdealerportep.CNPJ = this.util.cnpj()

    return config.createdealerportep.CNPJ
}

module.exports = CreatedealerService;

/*Agencia: "01011133"
Bairro: "Alphaville Industrial"
CEP: "06454000"
CNPJ: "31440054000100"
Conta: "01010010"
ContaCorrente: "01011166"
Conta_Matriz: "01001010"
Denominacao: "rafael teste"
DigitoAgencia: "1"
DigitoContaCorrente: "1"
Endereco: "Alameda Rio Negro"
IE: "0101010010"
Latitude: "010101001"
Longitude: "0101001"
Porte: "P"
RazaoSocial: "rafael teste"
Segmento: "IT"
Status: "Matriz"
UF: "SP"
dtAceiteContrato: "2019-02-25T03:00:00.000Z" */