'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var IndicatelistService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

IndicatelistService.prototype.getindicates = function (token) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/participante/indicacoes?page=1&quantity=10';

    return this.util.getUrl(baseurl, header, url);

};

module.exports = IndicatelistService;