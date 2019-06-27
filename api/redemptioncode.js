'use strict';

var AuthService = require('../services/authService');
var RedemptioncodeService = require('../services/RedemptioncodeService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de Verificação de código de resgate', function() {

    before('setup', function() {    
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });

    xit('Deve obter código de resgate disponível do participante', function(){
        var redemptioncodeService = new RedemptioncodeService(this);

        var authService = new AuthService(this);

        return redemptioncodeService.getCode(token).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.participanteCodigoResgate, 'Deve conter um código de resgate').not.to.be.empty;
        });
    });

});