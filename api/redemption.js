'use strict';

var AuthService = require('../services/authService');
var RedemptionService = require('../services/redemptionService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de código de resgate', function() {

    before('setup', function() {    
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter código de resgate', function(){
        var redemptionService = new RedemptionService(this);

        var authService = new AuthService(this);

        return redemptionService.getRedemptioncode(token).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.participanteCodigoResgate, 'Deve obter código de resgate').to.not.equal('');
        });
    });

});