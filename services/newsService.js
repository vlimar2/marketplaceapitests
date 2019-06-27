'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var NewsService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

NewsService.prototype.createNews = function (token, CategoryId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/news';
    //var now = new Date();

    var news = {
        Title: "TitleTest",
        Subtitle: "Subtitle teste",
        Content: "Content teste",
        Document: "Document teste",
        Media: "Media teste",
        IsActive: "",
        IsAuthenticated: 1,
        IsDraft: "",
        CategoryId: ""
    };

    var header = this.util.getDefaultHeader2(token);

    news.categoryId = CategoryId

    return this.util.postUrl(urlservice, news, header, url);
}

NewsService.prototype.createNewsemptycategory = async function (token, categoryId, obj) {
    try {
        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/news';
        //var now = new Date();


        var news = {
            Title: "Title teste",
            Subtitle: "",
            Content: "Content teste",
            Document: "Document teste",
            Media: "Media teste",
            IsActive: 1,
            IsAuthenticated: 1,
            IsDraft: 0,
            CategoryId: categoryId
        };

        if (obj !== undefined)
            news = Object.assign(news, obj);

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.postUrl(urlservice, news, header, url);
        return response

    }
    catch (erro) {
        return erro
    }

}


NewsService.prototype.searchNews = function (token, Id) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/news/' + Id;

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

NewsService.prototype.searchallNews = function (token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/news/';

    var header = this.util.getDefaultHeader2(token);

    return this.util.getUrl(urlservice, header, url);
}

NewsService.prototype.updateNews = function (token, Id, CategoryId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/news';
    //var now = new Date();

    var news = {
        Id: "",
        Title: "Subtitle teste atualizado",
        Subtitle: "Subtitle teste atualizado",
        Content: "Content teste atualizado",
        Document: "Document teste atualizado",
        Media: "Media teste atualizado",
        IsActive: 1,
        IsAuthenticated: 1,
        IsDraft: 0,
        CategoryId: ""
    };

    var header = this.util.getDefaultHeader2(token);

    news.id = Id
    news.categoryId = CategoryId

    return this.util.putUrl(urlservice, news, header, url);
}

module.exports = NewsService