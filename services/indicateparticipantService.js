'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var IndicateparticipantService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

IndicateparticipantService.prototype.createindicateproprietario = async function (token) {
    try {
        
        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/campanhaIncentivo/indiqueAmigosProprietario';

        var header = this.util.getDefaultHeader2(token);


        var response = await this.util.postUrl(urlservice, config.indicateProprietario, header, url);
        return response
    } catch(erro) {
        return erro
    }
}

IndicateparticipantService.prototype.createindicatemotoristaautonomo = async function (token) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/campanhaIncentivo/indiqueAmigosMotoristaAutonomo';

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.postUrl(urlservice, config.indicateMotautonomo, header, url);
        return response
        } catch(erro) {
            return erro
        }
}

IndicateparticipantService.prototype.cnpjindicateproprietario = function () {

    config.indicateProprietario.cnpj = this.util.cnpj()

    return config.indicateProprietario.cnpj
}

IndicateparticipantService.prototype.cpfindicatemotautonomo = function () {
    
     config.indicateMotautonomo.cpf = this.util.cpf()
    
    return config.indicateMotautonomo.cnpj
    
}

module.exports = IndicateparticipantService;