'use strict';

var SaldoCompletoService = require('../app/services/saldoCompletoService')
var AuthService = require('../services/authService')
let Database = require('../database/database');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Saldo Completo Saldo Pontos e Saldo Estrelas- Perfil', function () {

    before('setup', function () {
        //var authService = new AuthService(this);

       // return authService.authParticipantClientCredentials(config.CLIENTIDSECRET, config.CLIENTSECRET, config.CLIENTIDSECRET)
       //    .then(function (response) {
        //        token = response.body.access_token;
        //    }) 
            var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });
  
    it('Deve apresentar o saldo completo do usuário',function () {
        var authService = new SaldoCompletoService(this);
        
        return authService.listAll(token)
            .then(function (response) {
                //console.log(response.body)
                expect(response).to.have.status(config.util.HTTP.OK);
            }, function(err){
                console.log(err);
            })
    });
    
});
