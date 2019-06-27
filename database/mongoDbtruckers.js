'use strict';

var MongoDB = require('../database/mongoDBconnection')
var LogAppoffline = require('../mongoDB/logAppoffline/index')

var MongoDbtruckers = function () {

}

//mongoDbtruckers==funcionario
//mongoDbtruckers1==empresa

MongoDbtruckers.prototype.mongoDbtruckers = async function(cpf) {
    var conectar = new MongoDB()
    await conectar.connect()
    var resposta = await LogAppoffline.findByPartcipante(cpf)
    return resposta
}

MongoDbtruckers.prototype.mongoDbtruckers1 = async function(cnpj) {
    var conectar = new MongoDB()
    await conectar.connect()
    var resposta = await LogAppoffline.findByPartcipante(cnpj)
    return resposta
}

module.exports = MongoDbtruckers