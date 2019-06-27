'use strict';

var config = require('../../config');
var Util = require('../../util');
var UrlService = require('../../services/urlService');

var ListaNoticiaService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ListaNoticiaService.prototype.listNotification = function(token, index, ammount) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/News/getallbyfilters?index=' + index + '&ammount=' + ammount + '&categoryId=&title='; 

    var header = this.util.getDefaultHeader2(token);//Colocar o token da API 

    return this.util.getUrl(urlservice, header, url);
}

module.exports = ListaNoticiaService
