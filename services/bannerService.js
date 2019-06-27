'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var BannerService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

BannerService.prototype.createBanner = function(token, filePath1, fileName1, filePath2, fileName2) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var now = new Date();
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var De;
    var Ate;

    De = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z';
    Ate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() +1 ) + 'T00:00:00.000Z';

    var url = '/banner/createBanner?Ate=' + Ate + '&BannerTipo=0&De=' + De  + '&IsAtivo=true&IsOnline=false&Ordem=1&Titulo=teste+automatizadoReview';
            
    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrlformdata(urlservice, null, header, url, filePath1, fileName1, filePath2, fileName2);
}

BannerService.prototype.createBannerSecloggedMautonomo = function(token, filePath1, fileName1, filePath2, fileName2) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var now = new Date();
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var De;
    var Ate;

    De = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z';
    Ate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() +1 ) + 'T00:00:00.000Z';

    var url = 'banner/createBanner?Ate=' + Ate + '&BannerTipo=1&De=' + De  + '&IsAtivo=false&IsOnline=true&Ordem=1&Perfil=Motorista+Aut%C3%B4nomo&Subperfil=54786C70-B31D-4156-B1EC-46693636C307&Titulo=teste+automatizadoReview&perfisSelecionados=54786C70-B31D-4156-B1EC-46693636C307'  ;
    
    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrlformdata(urlservice, null, header, url, filePath1, fileName1, filePath2, fileName2);
}

BannerService.prototype.createBannerPrincloggedMautonomo = function(token, filePath1, fileName1, filePath2, fileName2) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var now = new Date();
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var De;
    var Ate;

    De = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z';
    Ate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() +1 ) + 'T00:00:00.000Z';

    var url = 'banner/createBanner?Ate=' + Ate + '&BannerTipo=Principal&De=' + De  + '&IsAtivo=false&IsOnline=true&Ordem=1&Perfil=Motorista+Aut%C3%B4nomo&Subperfil=54786C70-B31D-4156-B1EC-46693636C307&Titulo=teste+automatizadoReview&perfisSelecionados=54786C70-B31D-4156-B1EC-46693636C307'  ;
    
    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrlformdata(urlservice, null, header, url, filePath1, fileName1, filePath2, fileName2);
}

BannerService.prototype.createBannerPoploggedMautonomo = function(token, filePath1, fileName1, filePath2, fileName2) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var now = new Date();
    //var dt = new Date();
    //dt.setDate(dt.getDate() + 1);
    
    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var De;
    var Ate;

    De = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T00:00:00.000Z';
    Ate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() +1 ) + 'T00:00:00.000Z';//now.setDate(now.getDate() + 1)
    //new Date(Date.now()+((24 * 3600)*1000));//now.getDate()

    var url = 'banner/createBanner?Ate=' + Ate + '&BannerTipo=2&De=' + De  + '&Descricao=Automacao&IsAtivo=false&IsOnline=true&Ordem=1&Perfil=Motorista+Aut%C3%B4nomo&Subperfil=54786C70-B31D-4156-B1EC-46693636C307&Titulo=teste+automatizadoReview&perfisSelecionados=54786C70-B31D-4156-B1EC-46693636C307'  ;
    
    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrlformdata(urlservice, null, header, url, filePath1, fileName1, filePath2, fileName2);
}

BannerService.prototype.getBanner = async function (token) {
    try {

        this.util.timeout(config.util.DEFAULT_SECONDS);

        var urlservice = this.urlService.getFullUrlPrincipalApi('');

        var url = '/banner/';

        var header = this.util.getDefaultHeader2(token);

        var response = await this.util.getUrl(urlservice, header, url);
        return response
    } catch (erro) {
        return erro
    }
}

module.exports = BannerService