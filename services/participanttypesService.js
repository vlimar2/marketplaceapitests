'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');



var ParticipanttypesService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ParticipanttypesService.prototype.listParticipanttype = function() {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/usuario/funcoes/participante';
    
    //var header = this.util.getHeaderJson1();

    return this.util.getUrl1(urlservice, url);
}

module.exports = ParticipanttypesService;