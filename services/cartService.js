'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var CartService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};


CartService.prototype.getCart = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);    
    return this.util.getUrl(baseurl, header,'/v1/carts/me');
};

CartService.prototype.AddCart = function(token, product) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.postUrl(baseurl, product, header,'/v1/carts/me/items');
};

CartService.prototype.removeCart = function(token, sku) {
    this.util.timeout(config.util.HIGH_SECONDS);
    var baseUrl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.deleteUrl(baseUrl, '', header, '/v1/carts/me/items/' + sku);
};

CartService.prototype.updateCart = function(token, product) {
    this.util.timeout(config.util.HIGH_SECONDS);
    var baseUrl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.putUrl(baseUrl, product, header, '/v1/carts/me/items');
};

CartService.prototype.AddShippingAddress = function(token, address) {
    this.util.timeout(config.util.HIGH_SECONDS);
    var baseUrl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.postUrl(baseUrl, address, header, '/v1/carts/me/shippingAddress');
};

CartService.prototype.getFreight = function(token, zipcode){
    this.util.timeout(config.util.HIGH_SECONDS);
    var baseUrl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseUrl, header, '/v1/carts/me/freight?zipCode='+zipcode);
};

CartService.prototype.getZipCode = function(token, zipcode){
    this.util.timeout(config.util.HIGH_SECONDS);
    var baseUrl = this.urlService.getFullUrlPrincipalApi();
    var header = this.util.getHeaderJson(token);

    return this.util.getUrl(baseUrl, header, '/v1/zipCodes/'+zipcode);
};

CartService.prototype.clearCart = function(token) {
    
    return new Promise ((resolve, reject)=>{    
        this.util.timeout(config.util.DEFAULT_SECONDS);
        var baseurl = this.urlService.getFullUrlPrincipalApi();
        var header = this.util.getHeaderJson(token);
        var that = this;
        var ret='';

        return this.util.getUrl(baseurl, header,'/v1/carts/me').then(function(response){
            if(response.status==200 && response.body.items.length > 0)
            {
                
                return response.body.items.reduce(function(sequence, product){
                    
                    return sequence.then(function() {    
                        console.log('Excluindo '+ product.productSkuId);
                         return that.util.deleteUrl(baseurl, '', header, '/v1/carts/me/items/'+product.productSkuId);
                    }).then(function(response) {
                        if(ret=''|| response.status!=200){
                            response.status=200;
                            ret = response;
                        }
                    }).catch(function(err) {
                        ret = {"status":500};
                        resolve(ret);
                    });

                }, Promise.resolve()).then(function(){
                    resolve(ret);
                });
                
            }
            else
            {
                resolve(response);
            }
        });

    });
};

module.exports = CartService