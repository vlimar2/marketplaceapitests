'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var TellfriendService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

TellfriendService.prototype.createIndication = function (token, indicacao) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/participante/indique';

    var header = this.util.getDefaultHeader2(token);

    //var email = indicacao.email

    return this.util.postUrl(urlservice, indicacao, header, url);
}

TellfriendService.prototype.randomemail = function (token) {
    var rdn = Math.random() * 110;
    Math.floor(rdn);

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    var rdn = Math.floor(getRandomArbitrary(100, 1000000));

    var dominio = "@hotmail.com";

    var indicacao = {
        //"email": [rdn+dominio],
        email: [rdn + dominio],
        origem: "site"
    }
    return indicacao;
}

module.exports = TellfriendService;