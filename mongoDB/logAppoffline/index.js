const mongoose = require('mongoose')
const logtruckerSchema = require('./schema')

module.exports = mongoose.model('truckers', logtruckerSchema, 'truckers')