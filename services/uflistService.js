'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var UflistService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

UflistService.prototype.getUflist = function() {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();   

    return this.util.getUrl1(baseurl, '/Endereco/uf');
};

module.exports = UflistService