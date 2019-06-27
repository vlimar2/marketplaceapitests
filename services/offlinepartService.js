'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var OfflinepartService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

OfflinepartService.prototype.createParticipant = async function (/*participant,*/body) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        //var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var urlservice = 'https://apimanhml.webpremios.com.br/mercedes-club-integracao';

       /* var body= {
            CPF: "79188196089",
            bairro: "",
            birth: "01/01/1982",
            cellphone: "11900000000",
            cep: "",
            corporateName: "",
            creationDate: "2019-05-06T13:50:52.920Z",
            email: "cursoqaltm@gmail.com",
            eventName: "teste automatizado",
            localidade: "Alvarães",
            name: "Frota Gestor manutenção",
            profile: "Frota",
            subprofile: "Gestor Manutenção",
            truckerBrand: "",
            truckerModel: "",
            typeOfCompany: "oficinaIndependente",
            uf: "AM"
        }*/

        var url = '/trucker';

        var header = this.util.getHeaderJson1();

        var response = await this.util.postUrl(urlservice, body/*participant,*/, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

OfflinepartService.prototype.cpfParticipant = function () {

    //var cpf = this.util.cpf()

    config

    return cpf
}

OfflinepartService.prototype.cnpjParticipant = function () {
    
        config.indicateProprietario.cnpj = this.util.cnpj()
    
        return config.indicateProprietario.cnpj
}

module.exports = OfflinepartService;