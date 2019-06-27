'use strict';

var ListaNoticiaService = require('../app/services/listaNoticiaService.js')
var AuthService = require('../services/authService')
let Database = require('../database/database');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Listar noticias deslogado', function () {

    before('setup', function () {
      
            var authService = new AuthService(this);

            return authService.authParticipantClientCredentials(config.CLIENTIDSECRET, config.CLIENTSECRET, config.CLIENTIDSECRET).then(function (response) {
            token = response.body.access_token;
        });
    });
  
    it('Deve apresentar as noticias delogada',function () {
        var authService = new ListaNoticiaService(this);
        var index = 0;
        var ammount = 5;
        return authService.listNotification(token, index, ammount)
            .then(function (response) {
                console.log(response.body);
                expect(response).to.have.status(config.util.HTTP.OK);
            }, function(err){
                console.log(err);
            })
    });
    
});
