'use strict';

var AuthService = require('../services/authService');
var VerifydocService = require('../services/VerifydocService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de Verificação de documento existente', function() {

    before('setup', function() {    
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter documento', function(){
        var verifydocService = new VerifydocService(this);

        var authService = new AuthService(this);

        return verifydocService.getDoc(token).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal(true);
        });
    });
   
});