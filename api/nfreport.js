'use strict';

var AuthService = require('../services/authService');
var NfreportService = require('../services/nfreportService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');

describe('Testes na Api de relatório de Notas fiscais', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar relatório de notas fiscais', function () {

        var nfreportService = new NfreportService(this);

        return nfreportService.generatereportnf(token).then(function (response) {
            expect(response, 'Deve retornar status 200 ao gerar relatório de notas fiscais').to.have.status(config.util.HTTP.OK);
            // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
            // console.log(response.headers.content-disposition);
        });

    });

    it('Não deve retornar relatório de notas fiscais sem token', function () {

        var nfreportService = new NfreportService(this);

        return nfreportService.generatereportnf().then(function (response) {
            expect(response, 'Deve retornar status 401 ao negar relatório de notas fiscais').to.have.status(config.util.HTTP.OK);
            // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
            // console.log(response.headers.content-disposition);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });

    });

    it('Não deve retornar relatório de notas fiscais com token inválido', function () {

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V"

        var nfreportService = new NfreportService(this);

        return nfreportService.generatereportnf(token).then(function (response) {
            expect(response, 'Deve retornar status 401 ao negar relatório de notas fiscais').to.have.status(config.util.HTTP.OK);
            // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
            // console.log(response.headers.content-disposition);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });

    });
});