'use strict';

var AuthService = require('../services/authService');
var ContactusloggedService = require('../services/contactusloggedService');
var Contactfactory = require('../factories/contactfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de fale conosco usuário logado', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve enviar uma mensagem de fale conosco com usuário logado', function () {
        var authService = new AuthService(this);

        var factory = new Contactfactory();

        var contact = factory.buildDefault();

        var contactusloggedService = new ContactusloggedService(this);

        return contactusloggedService.getContactus(token, contact).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Não deve enviar uma mensagem de fale conosco sem mensagem', function () {
        var authService = new AuthService(this);

        var factory = new Contactfactory();

        var contact = factory.buildDefault();

        var contactusloggedService = new ContactusloggedService(this);

        contact.mensagem = ''; 

        return contactusloggedService.getContactus(token, contact).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.BAD_REQUEST);
        })//.catch(function (response) {
          //  expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
       // });
    });

    it('Não deve enviar uma mensagem de fale conosco sem assunto', function () {
        var authService = new AuthService(this);

        var factory = new Contactfactory();

        var contact = factory.buildDefault();

        var contactusloggedService = new ContactusloggedService(this);

        contact.assuntoId = "";

        return contactusloggedService.getContactus(token, contact).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve enviar uma mensagem de fale conosco sem token', function () {
        var authService = new AuthService(this);

        var factory = new Contactfactory();

        var contact = factory.buildDefault();

        var contactusloggedService = new ContactusloggedService(this);

        return contactusloggedService.getContactus(contact).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    xit('Não deve enviar uma mensagem de fale conosco com token inválido', function () {
        var authService = new AuthService(this);

        var factory = new Contactfactory();

        var contact = factory.buildDefault();

        var contactusloggedService = new ContactusloggedService(this);

        tokenerr = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        return contactusloggedService.getContactus(tokenerr, contact).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    xit('Não deve enviar uma mensagem de fale conosco com token de admin', function () {

        var contactusloggedService = new ContactusloggedService(this);

        var authService = new AuthService(this);

        var tokenadm;

        //autentica participante
        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (responseAuth) {
            tokenadm = responseAuth.body.access_token;
            //realiza busca por placa
            return contactusloggedService.getContactus(tokenerr, contact).then(function (response) {
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.BAD_REQUEST);
                console.log(response);
            })//.catch(function (response) {
            //   expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //});
        });
    });
});