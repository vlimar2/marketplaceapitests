'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var ForgotpassService = function(that) {
   this.util = new Util(that);
   this.urlService = new UrlService(that);
};

ForgotpassService.prototype.getnewpass = function() {
    this.util.timeout(config.util.DEFAULT_SECONDS);
   
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var body = {
    "documento" : "85307065019",
    "email" : "cursoqaltm@gmail.com"
    };

    var url = '/usuario/esqueceuSenha';

    var header = this.util.getHeaderJson1();
    //console.log(urlservice);
    //console.log(header);
    return this.util.postUrl(urlservice, body, header, url);
}

module.exports = ForgotpassService;