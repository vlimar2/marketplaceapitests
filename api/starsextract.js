'use strict';

var AuthService = require('../services/authService');
var StarsextractService = require('../services/starsextractService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');

describe('Testes na Api de extrato de estrelas', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar extrato de estrelas', function () {

        var starsextractService = new StarsextractService(this);

        return starsextractService.getextract(token).then(function (response) {
            expect(response, 'Deve retornar status 200 ao retornar extrato do participante informado').to.have.status(config.util.HTTP.OK);
            expect(response.body.response[0].transactionID, 'Deve retornar informações do extrato de estrelas').not.to.equal('');
        });
    });

    it('Não deve retornar extrato de estrelas sem token', function () {

        var starsextractService = new StarsextractService(this);

        return starsextractService.getextract().then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar extrato de estrelas com token inválido', function () {

        var starsextractService = new StarsextractService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        return starsextractService.getextract(token).then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar extrato de estrelas com token de participante', function () {

        var starsextractService = new StarsextractService(this);

        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return starsextractService.getextract(token).then(function (response) {
                expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
            })/*.catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
            });*/
        });
    });
});
