'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var RelatoriosAdminService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

RelatoriosAdminService.prototype.getAll = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/relatoriosadmin/all';
    
    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = RelatoriosAdminService
