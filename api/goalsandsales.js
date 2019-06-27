'use strict';

var GoalsandsalesService = require('../services/goalsandsalesService')
var AuthService = require('../services/authService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Testes na Api de retorno de quantidade de registros de metas x vendas do power BI', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter retorno e acesso a quantidade de registros de metas x vendas do power BI', function () {

        var goalsandsalesService = new GoalsandsalesService(this);

        return goalsandsalesService.getsalesandservice(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.AccessToken).to.exist;
        });
    });

    it('Não deve obter retorno sem autenticação', function () {
        var goalsandsalesService = new GoalsandsalesService(this);

        return goalsandsalesService.getsalesandservice().then(function (response) {
            expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
        }).catch(function (response) {
        });
    });

    it('Não deve obter retorno com autenticação que não seja de admin', function () {
        var goalsandsalesService = new GoalsandsalesService(this);
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME,config.PASS, config.CLIENT_ID).then(function (response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.body.access_token).to.not.equal('');
            return goalsandsalesService.getsalesandservice(response.body.access_token).then(function (response) {
                expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
            });//.catch(function (response) {
           // });
        });
    });

});