'use strict';

var AuthAdminService = require('../services/authAdminService');
var config = require('../config');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Teste de autenticação Admin Marketplace', function() {

    before('setup', function() {});

    it('Deve logar no marketplace Admin através da autenticação por participante Admin', function() {
        var authAdminService = new AuthAdminService(this);
        console.log('config :' + config);
        return authAdminService.authClient(config.util.TOKEN_ADMIN_HEADER)
        .then(function(response) {
            console.log(response.body);
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.error).to.equal(false);
            expect(response.body.access_token).to.not.equal(''); 
        });
    });

    xit('Deve logar no marketplace através da autenticação por participante', function() {
        var authService = new AuthService(this);
        return authService.authParticipant(config.CAMPAIGN_ID, config.credentials.participantId)
        .then(function(response){
        console.log(response.body)
        expect(response).to.have.status(config.util.HTTP.OK);
        expect(response.error).to.equal(false);
        expect(response.body.access_token).to.not.equal('');
        })
    });
});