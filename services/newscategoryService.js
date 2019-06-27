'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var NewscategoryService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

NewscategoryService.prototype.createCategory1 = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/categories';

    var currentdate = new Date();

    var category = {
        CategoryType: "1",
        IsActive: true,
        //Title: "Teste categoria tipo Corporativo",
        Title: new Date().getTime().toString()
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, category, header, url);
}

NewscategoryService.prototype.createCategory2 = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/categories';

    var currentdate = new Date();

    var category = {
        CategoryType: "2",
        IsActive: true,
        //Title: "Teste categoria tipo Serviços",
        Title: new Date().getTime().toString()
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, category, header, url);
}

NewscategoryService.prototype.createCategory3 = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/categories';

    var currentdate = new Date();

    var category = {
        CategoryType: "3",
        IsActive: true,
        //Title: "Teste categoria tipo Vans",
        Title: new Date().getTime().toString()
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, category, header, url);
}

NewscategoryService.prototype.createCategory4 = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/categories';

    var currentdate = new Date();

    var category = {
        CategoryType: "4",
        IsActive: true,
        //Title: "Teste categoria tipo Ônibus",
        Title: new Date().getTime().toString()
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, category, header, url);
}

NewscategoryService.prototype.createCategory5 = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/categories';

    var currentdate = new Date();

    var category = {
        CategoryType: "5",
        IsActive: true,
        //Title: "Teste categoria tipo Caminhões",
        Title: new Date().getTime().toString()
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, category, header, url);
}

NewscategoryService.prototype.createCategory6 = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/categories';

    var currentdate = new Date();

    var category = {
        CategoryType: "6",
        IsActive: true,
        //Title: "Teste Outros",
        Title: new Date().getTime().toString()
      };

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, category, header, url);
}

NewscategoryService.prototype.getNewscategory = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/categories';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

module.exports = NewscategoryService