'use strict';

var RegistrationevolutionService = require('../services/registrationevolutionService')
var AuthService = require('../services/authService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Testes na Api de retorno de evolução cadastral do power BI', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter retorno e acesso a informações de evolução cadastral do power BI', function () {

        var registrationevolutionService = new RegistrationevolutionService(this);

        return registrationevolutionService.getEvolution(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.AccessToken).to.exist;
        });
    });

    it('Não deve obter retorno sem autenticação', function () {
        var registrationevolutionService = new RegistrationevolutionService(this);

        return registrationevolutionService.getEvolution().then(function (response) {
            expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
        }).catch(function (response) {
        });
    });

    it('Não deve obter retorno com autenticação que não seja de admin', function () {
        var registrationevolutionService = new RegistrationevolutionService(this);
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME,config.PASS, config.CLIENT_ID).then(function (response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.body.access_token).to.not.equal('');
            return registrationevolutionService.getEvolution(response.body.access_token).then(function (response) {
                expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
            });//.catch(function (response) {
           // });
        });
    });

});