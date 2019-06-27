'use strict';

var AuthService = require('../services/authService');
var ContactussubjectidService = require('../services/contactussubjectidService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de listagem de fale conosco por status', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter status de fale conosco por id', function () {
        var contactussubjectidService = new ContactussubjectidService(this);

        var authService = new AuthService(this);

        return contactussubjectidService.getStatuses(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Não deve obter status de fale conosco por id sem informar ID', function () {
        var contactussubjectidService = new ContactussubjectidService(this);

        var authService = new AuthService(this);

        return contactussubjectidService.getemptyStatuses(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve obter status de fale conosco por id informando ID inválido', function () {
        var contactussubjectidService = new ContactussubjectidService(this);

        var authService = new AuthService(this);

        return contactussubjectidService.getwrongStatuses(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.BAD_REQUEST);
        })//.catch(function (response) {
          //  expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
       // });
    });
});