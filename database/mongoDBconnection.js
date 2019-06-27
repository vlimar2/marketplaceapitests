'use strict';

const mongoose = require('mongoose')
const bluebird = require('bluebird')

const mongoConnectionString = config.database.mangoDB[config.environment].connectionString

  var MongoDBconnection = function () {
    
  }

MongoDBconnection.prototype.connect = async function() {
  mongoose.Promise = bluebird
  if (!mongoose.connection.readyState) {
    mongoose.Promise = global.Promise
    return mongoose.connect(mongoConnectionString).then(() => {//,{useMongoClient: true}
      console.log('MongoDB connected')
    })
  } else {
    console.log('MongoDB connected')  
    return Promise.resolve()
  }
}

module.exports = MongoDBconnection