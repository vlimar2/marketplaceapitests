'use strict';

var ForgotpassService = require('../services/forgotpassService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect


describe('Testes na Api de Esqueci Minha Senha', function() {
   it('Deve obter uma nova senha', function() {
      
       var forgotpassService = new ForgotpassService(this);
       return forgotpassService.getnewpass().then(function(response) {
           expect(response,'Deve retornar status 200 ao resetar a senha').to.have.status(config.util.HTTP.OK);
           
       });
   });
});