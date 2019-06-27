'use strict';

var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
let config = require('../config')

var ValidacaoTruckpad = function () {
    
}

ValidacaoTruckpad.prototype.validacaoCategoriaTruckpad = function (categoriaTruckpad) {
    console.log('- VALIDAÇÃO CATEGORIA TRUCKPAD - Iniciado')
    expect(categoriaTruckpad.responseCategoria,'Deve retornar status 200').to.have.status(config.util.HTTP.OK) 
    expect(categoriaTruckpad.responseCategoria.body.isSirius, 'Deve validar que se o isSirius é true/false').to.equal(categoriaTruckpad.isSirius)   
    console.log('✓ VALIDAÇÃO CATEGORIA TRUCKPAD - finalizado')    
    return "OK"
}

ValidacaoTruckpad.prototype.validacaoCategoriaTruckpadErrada = function (categoriaTruckpad) {
    console.log('- VALIDAÇÃO CATEGORIA TRUCKPAD - Iniciado')
    expect(categoriaTruckpad.responseCategoria,'Deve retornar status 412').to.have.status(config.util.HTTP.PRECONDITION_FAILED)
    if(categoriaTruckpad.body.documentoParticipante !== "") {
        expect(categoriaTruckpad.responseCategoria.response.body, 'Deve validar se o documento participante é inválido').to.equal("O documento informado não é válido.")  
    }
    if(categoriaTruckpad.body.documentoParticipante === "") {
        expect(categoriaTruckpad.responseCategoria.response.body, 'Deve validar se o documento participante é obrigatório').to.equal("O documento do participante é obrigatório.")   
    }
    console.log('✓ VALIDAÇÃO CATEGORIA TRUCKPAD - finalizado')    
    return "OK"
}

module.exports = ValidacaoTruckpad;