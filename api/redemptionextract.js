'use strict';

var AuthService = require('../services/authService');
var RedemptionextractService = require('../services/redemptionextractService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');

describe('Testes na Api de extrato de resgates', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar extrato de resgates', function () {

        var redemptionextractService = new RedemptionextractService(this);

        return redemptionextractService.getextract(token).then(function (response) {
            expect(response, 'Deve retornar status 200 ao retornar extrato do participante informado').to.have.status(config.util.HTTP.OK);
            expect(response.body.response[0].redemptionID, 'Deve retornar informações do extrato de pontos').not.to.equal('');
        });
    });

    it('Não deve retornar extrato de resgate sem token', function () {

        var redemptionextractService = new RedemptionextractService(this);

        return redemptionextractService.getextract().then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar extrato de resgate com token inválido', function () {

        var redemptionextractService = new RedemptionextractService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        return redemptionextractService.getextract(token).then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar extrato de resgte com token de participante', function () {

        var redemptionextractService = new RedemptionextractService(this);

        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return redemptionextractService.getextract(token).then(function (response) {
                expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
            })/*.catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
            });*/
        });
    });
});
