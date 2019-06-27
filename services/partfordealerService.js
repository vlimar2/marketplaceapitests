'use strict';

var Util = require('../util')
var UrlService =  require('../services/urlService')

var PartfordealerService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

PartfordealerService.prototype.getParticipant = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();    
    
    var header = this.util.getDefaultHeader2(token);
    
    return this.util.getUrl(baseurl, header,'/participante/buscadealer/750');
};

module.exports = PartfordealerService;