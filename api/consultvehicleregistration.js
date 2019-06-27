'use strict';

var ConsultvehicleregistrationService = require('../services/consultvehicleregistrationService')
var AuthService = require('../services/authService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Testes na Api de retorno de quantidade de registros de cadastro de veículos do power BI', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter retorno e acesso a quantidade de registros de cadastro de veículos do power BI', function () {

        var consultvehicleregistrationService = new ConsultvehicleregistrationService(this);

        return consultvehicleregistrationService.getvehiclequery(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.AccessToken).to.exist;
        });
    });

    it('Não deve obter retorno sem autenticação', function () {
        var consultvehicleregistrationService = new ConsultvehicleregistrationService(this);

        return consultvehicleregistrationService.getvehiclequery().then(function (response) {
            expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
        }).catch(function (response) {
        });
    });

    it('Não deve obter retorno com autenticação que não seja de admin', function () {
        var consultvehicleregistrationService = new ConsultvehicleregistrationService(this);
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME,config.PASS, config.CLIENT_ID).then(function (response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.body.access_token).to.not.equal('');
            return consultvehicleregistrationService.getvehiclequery(response.body.access_token).then(function (response) {
                expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
            });//.catch(function (response) {
           // });
        });
    });

});