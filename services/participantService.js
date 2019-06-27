'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var ParticipantService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ParticipantService.prototype.createParticipant = async function (participant) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/participante';

        var header = this.util.getHeaderJson1();

        var response = await this.util.postUrl(urlservice, participant, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

ParticipantService.prototype.getParticipant = async function (token) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/participante';

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.getUrl(urlservice, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

ParticipantService.prototype.getPart = async function (tokenpart) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/participante';

        var header = this.util.getDefaultHeader2(tokenpart);

        var response = await this.util.getUrl(urlservice, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

ParticipantService.prototype.cpfParticipant = function () {

    var cpf = this.util.cpf()

    return cpf
}

module.exports = ParticipantService;