'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var ReplycontactusService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ReplycontactusService.prototype.replycontact = async function (token, faleConoscoId, resposta) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/faleconosco/'+ faleConoscoId +'/interacao';

        var resposta = {
            mensagem: "Respondendo fale conosco"
          };

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.postUrl(urlservice, resposta, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

ReplycontactusService.prototype.finishcontact = async function (token, faleConoscoId) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/faleconosco/'+ faleConoscoId +'/finalizar';

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.postUrl2(urlservice, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

ReplycontactusService.prototype.listopenContactUs = async function (token) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/faleconosco?faleConoscoStatusId=1';

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.getUrl(urlservice, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

ReplycontactusService.prototype.listcloseContactUs = async function (token) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/faleconosco?faleConoscoStatusId=2';

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.getUrl(urlservice, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

module.exports = ReplycontactusService;


