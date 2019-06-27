const mongoose = require('mongoose')

const LogAPPSchema =  mongoose.Schema({
  CPF: { type: String, required: true },
}, { _id: true, timestamps: false })


LogAPPSchema.statics = require('./statics')

module.exports = LogAPPSchema