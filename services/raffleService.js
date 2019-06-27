'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var RaffleService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

RaffleService.prototype.getraffle = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/sorteio/sorteio/';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = RaffleService