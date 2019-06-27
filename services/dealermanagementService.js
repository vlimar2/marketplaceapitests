'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var DealermanagementService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

DealermanagementService.prototype.getDealer = async function (token) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '//dealer';

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.getUrl(urlservice, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

module.exports = DealermanagementService;


