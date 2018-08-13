'use strict';

var AuthService = require('../services/authService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Teste de autenticação', function() {

    before('setup', function() {
        
    });

    it('Deve logar no marketplace através da autenticação por aplicação cliente', function() {
        var authService = new AuthService(this);
        console.log('config :' + config);
        return authService.authClient(config.CAMPAIGN_ID)
        .then(function(response) {
            
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.error).to.equal(false);
            expect(response.body.access_token).to.not.equal('');
            
        });
    
    });

    it('Deve deslogar o usuário', function() {
        var authService = new AuthService(this);
        return authService.authClient(config.CAMPAIGN_ID).then(function(response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            return authService.logoutParticipant(JSON.parse(response.text)).then(function(responsebody){
                expect(responsebody).to.have.status(config.util.HTTP.OK);
            });
        });
    });


    it('Deve logar no marketplace através da autenticação por participante', function() {
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