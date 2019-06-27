'use strict';

var TruckpadService = require('../services/truckpadService')
var ValidacaoTruckpad = require('../validation/validacaoTruckpad')

var validacaoCategoria = new ValidacaoTruckpad()

var Validatruckpad = function () {
    
}

Validatruckpad.prototype.validaCategoria = async function (informacoesCategoria) {
    await categoria(informacoesCategoria)
    await validacaoCategoria.validacaoCategoriaTruckpad(informacoesCategoria)
}

Validatruckpad.prototype.validaCategoriaErrada = async function (informacoesCategoria) {
    await categoria(informacoesCategoria)
    await validacaoCategoria.validacaoCategoriaTruckpadErrada(informacoesCategoria)
}

async function categoria(informacoesCategoria) {
    var categoria = new TruckpadService(this)
    informacoesCategoria.responseCategoria = await categoria.truckpadCategory(informacoesCategoria) 
}

module.exports = Validatruckpad;