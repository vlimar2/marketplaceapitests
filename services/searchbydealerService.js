'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var SearchbydealerService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

SearchbydealerService.prototype.getPlaca = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    //var url = '/veiculo/busca?parametro=PLACA&value=' + placa;

    var url = 'veiculo/busca?parametro=PLACA&value=';
    
    return this.util.getUrl(baseurl, header, url + placa);

    //return this.util.getUrl(baseurl, header, url);

};

SearchbydealerService.prototype.getPlacaestatica = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=PLACA&value=OOO-0000';

    return this.util.getUrl(baseurl, header, url);

};

/*SearchbydealerService.prototype.getwrongPlaca = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=PLACA&value=FFF-999';

    return this.util.getUrl(baseurl, header, url);
};*/

/*SearchbydealerService.prototype.getemptyPlaca = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=PLACA&value=';

    return this.util.getUrl(baseurl, header, url);
};*/

SearchbydealerService.prototype.getChassi = function (token, chassi) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = 'veiculo/busca?parametro=CHASSI&value=';
    
    return this.util.getUrl(baseurl, header, url + chassi);

    //return this.util.getUrl(baseurl, header, '/veiculo/busca?parametro=CHASSI&value=' + chassi);
};

/*SearchbydealerService.prototype.getwrongChassi = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=CHASSI&value=ç1ç1ç1ç1ç1ç1ç1çç1ç1ç1';

    return this.util.getUrl(baseurl, header, url);
};*/

/*SearchbydealerService.prototype.getemptyChassi = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=CHASSI&value=';

    return this.util.getUrl(baseurl, header, url);
};*/

SearchbydealerService.prototype.getCpf = function (token, cpf) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    //return this.util.getUrl(baseurl, header, '/veiculo/busca?parametro=login&value=' + cpf);

    var url = '/veiculo/busca?parametro=login&value=';
    
    return this.util.getUrl(baseurl, header, url + cpf);
};

/*SearchbydealerService.prototype.getwrongCpf = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=login&value=101010101017';

    return this.util.getUrl(baseurl, header, url);
};*/

/*SearchbydealerService.prototype.getemptyCpf = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=login&value=';

    return this.util.getUrl(baseurl, header, url);
};*/

SearchbydealerService.prototype.getCnpj = function (token, cnpj) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    //return this.util.getUrl(baseurl, header, '/veiculo/busca?parametro=login&value=' + cnpj);

    var url = 'veiculo/busca?parametro=login&value=';

    return this.util.getUrl(baseurl, header, url + cnpj);
};

/*SearchbydealerService.prototype.getwrongCnpj = function (token, placa) {

    this.util.timeout(config.util.DEFAULT_SECONDS);

    var baseurl = this.urlService.getFullUrlPrincipalApi();

    var header = this.util.getDefaultHeader2(token);

    var url = '/veiculo/busca?parametro=login&value=55555555';

    return this.util.getUrl(baseurl, header, url);
};*/

/*SearchbydealerService.prototype.getemptyCnpj= function (token, placa) {
    
        this.util.timeout(config.util.DEFAULT_SECONDS);
    
        var baseurl = this.urlService.getFullUrlPrincipalApi();
    
        var header = this.util.getDefaultHeader2(token);
    
        var url = '/veiculo/busca?parametro=login&value=';
    
        return this.util.getUrl(baseurl, header, url);
};*/

module.exports = SearchbydealerService;