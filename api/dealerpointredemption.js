'use strict';

var DealerpointredemptionService = require('../services/dealerpointredemptionService')
var AuthService = require('../services/authService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Testes na Api de retorno de pontos resgatados do power BI', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.DEALERADMUSERNAME, config.DEALERADMPASS, config.DEALERADMCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter retorno e acesso a informações ao power BI', function () {

        var dealerpointredemptionService = new DealerpointredemptionService(this);

        return dealerpointredemptionService.getPontosresgatados(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.AccessToken).to.exist;
        });
    });

    it('Não deve obter retorno sem autenticação', function () {
        var dealerpointredemptionService = new DealerpointredemptionService(this);

        return dealerpointredemptionService.getPontosresgatados().then(function (response) {
            expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
        }).catch(function (response) {
        });
    });

    it('Não deve obter retorno com autenticação que não seja de admin', function () {
        var dealerpointredemptionService = new DealerpointredemptionService(this);
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.body.access_token).to.not.equal('');
            return dealerpointredemptionService.getPontosresgatados(response.body.access_token).then(function (response) {
                expect(response, 'Deve impedir o acesso a informações do power BI').to.have.status(config.util.HTTP.UNAUTHORIZED);
            });//.catch(function (response) {
            // });
        });
    });
});