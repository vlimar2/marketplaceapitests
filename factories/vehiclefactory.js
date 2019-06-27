'use strict';

var Vehiclefactory = function(){

};
Vehiclefactory.prototype.build = function()

{
    var vehicle = {                   
        ano:  null,  
        arquivo : null,
        categoriaId : null,
        chassi : null,
        modeloId : null, 
        participanteId : null,   
        placa : null                 
    };
    return vehicle;
}

Vehiclefactory.prototype.buildDefault = function(){
    var vehicle = this.build();

    var now = new Date();
    var currentdate = new Date();
    var placa = "XXX" /*+ '-'*/ + (now.getSeconds() + 1) + now.getMinutes();
    var chassi = "CHAS" + new Date().getTime().toString();
              
    vehicle.ano =  '2019';
    vehicle.arquivo = 'https://mercedesclub.blob.core.windows.net/file/documentoVeiculo/31012019_1821295d79d3c1-2fc1-4657-9087-59b0f087c091.png' 
    vehicle.categoriaId = 1;
    vehicle.chassi = chassi;
    vehicle.modeloId = 1; 
    vehicle.participanteId = null; 
    vehicle.placa = placa
    return vehicle;
};

module.exports = Vehiclefactory;