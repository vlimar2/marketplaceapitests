'use strict';

var config = require('../config');
var Util = require('../util');
var UrlService = require('./urlService');

var VehicleService = function (that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};

VehicleService.prototype.includeVehicle = function (token, ParticipanteId) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = '/veiculo';
    //var now = new Date();

    var vehicle = {
        ano: "2018",
        arquivo: "https://mercedesclub.blob.core.windows.net/file/documentoVeiculo/31012019_1821295d79d3c1-2fc1-4657-9087-59b0f087c091.png",
        categoriaId: 1,
        chassi: "x4xx4xx4x4x4x4x4x",
        modeloId: 1,
        participanteId: '',
        placa: "SSS-0202"
    };

    var header = this.util.getDefaultHeader2(token);

    vehicle.participanteId = ParticipanteId

    return this.util.postUrl(urlservice, vehicle, header, url);
}

VehicleService.prototype.includeVehicle1 = function (token, ParticipanteId, vehicle) {
    this.util.timeout(config.util.DEFAULT_SECONDS);

    var urlservice = this.urlService.getFullUrlPrincipalApi('');

    var url = 'veiculo';

    var header = this.util.getDefaultHeader2(token);

    return this.util.postUrl(urlservice, vehicle, header, url);
}

module.exports = VehicleService;