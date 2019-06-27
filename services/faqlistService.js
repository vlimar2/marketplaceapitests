'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');



var FaqlistService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

FaqlistService.prototype.listfaq = function() {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/faq';

    return this.util.getUrl1(urlservice, url);
}

module.exports = FaqlistService;