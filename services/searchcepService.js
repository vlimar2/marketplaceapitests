'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var SearchcepService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

SearchcepService.prototype.getCep = function() {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();   

    return this.util.getUrl1(baseurl, '/Endereco/cep/06454000');
};

module.exports = SearchcepService