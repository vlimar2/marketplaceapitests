'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var DealerpointredemptionService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

DealerpointredemptionService.prototype.getPontosresgatados = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/powerbi/reports/dealer/pontosresgatados';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = DealerpointredemptionService