'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');



var IndicatebuyerService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

IndicatebuyerService.prototype.createbuyerIndication = function (token, Documento, VeiculoId, Email) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    //function getRandomArbitrary(min, max) {
     //   return Math.random() * (max - min) + min;
   // }

    //var rdn = Math.floor(getRandomArbitrary(100, 1000000));

    var url = '/participante/indiqueComprador';

    //var dominio = "@hotmail.com";

    var indicacao = {
        celular: "(11) 90000-0000",
        documento: Documento,
        //email: rdn + dominio,
        email: Email,
        nome: "Indicador de comprador",
        veiculoId: VeiculoId//514
    }

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, indicacao, header, url);

    indicacao.veiculoId = VeiculoId
    indicacao.documento = Documento
    indicacao.email = Email
}

IndicatebuyerService.prototype.createemptybuyerIndication = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/participante/indiqueComprador';

   
    var indicacao = {
        celular: "",
        documento: "",
        email: "",
        nome: "",
        veiculoId: 580
    }

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, indicacao, header, url);

   //indicacao.veiculoId = VeiculoId
    //indicacao.documento = Documento
    //indicacao.celular = Celular
}

IndicatebuyerService.prototype.cnpjindicateproprietario = function () {

    indicatebuyerService.indicacao.documento = this.util.cnpj()

    return indicatebuyerService.indicacao.documento
}

//IndicateparticipantService.prototype.cpfindicatemotautonomo = function () {

 //   config.indicateMotautonomo.cpf = this.util.cpf()

 //   return config.indicateMotautonomo.cnpj

//}

module.exports = IndicatebuyerService;