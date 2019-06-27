'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');



var EditparticipantService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

EditparticipantService.prototype.editParticipant = function(newparticipant, token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/participante/editar';
    
    var header = this.util.getDefaultHeader2(token);

    //console.log(header);

    return this.util.putUrl(urlservice, newparticipant, header, url);
}

module.exports = EditparticipantService;