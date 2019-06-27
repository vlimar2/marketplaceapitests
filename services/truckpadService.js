'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var TruckpadService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

TruckpadService.prototype.truckpadCategory = async function(category) {
    console.log("- POST CATEGORIA - Iniciada")

    try {
        var urlservice = this.urlService.getFullUrlPrincipalApi('')

        var url = 'truckpad/participante/categoria'
    
        var header = this.util.getAuthHeader()
    
        var response = await this.util.postUrl(urlservice, category.body, header, url);
    
        console.log("✓ POST CATEGORIA - Finalizado")

        return response
    } catch(err) {

        console.log("✓ POST CATEGORIA - Finalizado")

        return err
    }    
}

module.exports = TruckpadService