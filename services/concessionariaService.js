'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var ConcessionariaService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ConcessionariaService.prototype.getConcessionarias = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/powerbi/reports/admin/concessionarias';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = ConcessionariaService