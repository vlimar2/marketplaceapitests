'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var ProductService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

ProductService.prototype.getProductDetail = function(token, sku, availability) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.getUrl(baseurl, header,'/v1/products/skus/'+ sku + '/product?availability=' + availability);
};

ProductService.prototype.getAvailability = function(token, sku) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    return this.util.getUrl(baseurl, header,'/v1/products/skus/'+ sku + '/product?availability=true');
};

ProductService.prototype.getShowCase = function(token, catalogid, identifier, type, offset) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    //https://apiman-marketplace-api.webpremios.com.br//v1/showcases?CatalogId=40210&identifier=&type=1&offset=0
    return this.util.getUrl(baseurl, header,'/v1/showcases?CatalogId='+catalogid+'&identifier='+identifier+'&type='+type+'&offset='+offset);
};

ProductService.prototype.getShopShowCase = function(token, shop) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    //https://apiman-marketplace-api.webpremios.com.br//v1/showcases?CatalogId=40210&identifier=&type=1&offset=0
    return this.util.getUrl(baseurl, header,'/v1/showcases?identifier='+ shop +'&type=3&offset=0');
};

ProductService.prototype.getShowCasePage = function(token, shop) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);
    //https://apiman-marketplace-api.webpremios.com.br//v1/showcases?CatalogId=40210&identifier=&type=1&offset=0
    return this.util.getUrl(baseurl, header,'/v1/showcases?identifier='+ shop +'&type=3&offset=0&itemsperpage=20');
};

ProductService.prototype.getSearch = function(token, term, limit, priceMax, offset, sort) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.getUrl(baseurl, header,'/v1/products?sort='+sort+'&term='+term+'&priceMax='+priceMax+'&offset='+offset+'&limit='+limit);
};

module.exports = ProductService