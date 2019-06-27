'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var StartextractService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

StartextractService.prototype.getextract = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/pontos/extratoestrelas/36886536885?dias=120';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = StartextractService