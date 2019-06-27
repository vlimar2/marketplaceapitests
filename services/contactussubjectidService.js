'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var ContactussubjectidService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ContactussubjectidService.prototype.getStatuses = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);    

    return this.util.getUrl(baseurl, header,'/faleconosco?faleConoscoStatusId=1');
};

ContactussubjectidService.prototype.getemptyStatuses = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);    

    return this.util.getUrl(baseurl, header,'/faleconosco?faleConoscoStatusId=');
};

ContactussubjectidService.prototype.getwrongStatuses = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);    

    return this.util.getUrl(baseurl, header,'/faleconosco?faleConoscoStatusId=9');
};

module.exports = ContactussubjectidService