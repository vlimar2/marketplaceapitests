'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');



var RegisterbydealeradminService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

RegisterbydealeradminService.prototype.createParticipante = function(token, participant1) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/participante/dealer';
    
    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, participant1, header, url);
}

module.exports = RegisterbydealeradminService;