'use strict';

//var sleep = require('system-sleep');

var DatabaseConnection = function () {

};
// TRANSFORMATION
const Sequelize = require('sequelize');
var dbName = config.database[config.environment].dbName == undefined ? '' : config.database[config.environment].dbName;
const sequelize = new Sequelize(dbName, config.database[config.environment].login, config.database[config.environment].passowrd, {
    host: config.database[config.environment].host,
    dialect: 'mssql',
    dialectOptions: {
        requestTimeout: 500000,
        encrypt: true
    },
    port: config.database[config.environment].port,
    logging: false
})

DatabaseConnection.prototype.executeQuery = async function (query) {
    
    for (var i = 1; i <= 50; i++) {
        //console.log("Tentativa " + i)
        //console.log(sequelize)
        let resultQuery = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        if (resultQuery.length !== 0) {
            return resultQuery;
        }
      //  sleep(3000);
    }
  //  throw Error('NÃO FINALIZOU CONSULTA')
}

DatabaseConnection.prototype.executeDelete = async function (Delete) {
    
    for (var i = 1; i <= 50; i++) {
        // console.log("Tentativa " + i)
        let resultUpdate = await sequelize.query(update, { type: sequelize.QueryTypes.DELETE})
        if (resultDelete.length !== 0) {
            return resultDelete;
        }
       // sleep(3000);
    }
    throw Error('NÃO DELETOU O QUIZ')
}

/*DatabaseConnection.prototype.sequelize = sequelize

 DatabaseConnection.prototype.queryparticipante = async function (query) {
    var respostaConsulta = await consulta(query)
    return respostaConsulta
 }

async function consulta(query) {
    for (var i = 1; i <= 50; i++) {
        //console.log("Tentativa " + i)
        let resultQuery = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        return resultQuery;
    }
    throw Error('NÃO FINALIZOU CONSULTA')
}*/

DatabaseConnection.prototype.executeInsert = async function (update) {
    
    for (var i = 1; i <= 50; i++) {
        // console.log("Tentativa " + i)
        let resultUpdate = await sequelize.query(update, { type: sequelize.QueryTypes.UPDATE })
        if (resultUpdate.length !== 0) {
            return resultUpdate;
        }
       // sleep(3000);
    }
    throw Error('NÃO ALTEROU A DATA DE EXPIRAÇÃO')
}

module.exports = DatabaseConnection;