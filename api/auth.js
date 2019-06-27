'use strict';

var AuthService = require('../services/authService')
let Database = require('../database/database');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Teste de autenticação', function () {


    it('Deve logar em mercedes através da autenticação por participante', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID)
            .then(function (response) {
                //console.log(response.body)
                expect(response).to.have.status(config.util.HTTP.OK);
                //expect(response.error).to.equal(false);
                expect(response.body.access_token).to.not.equal('');
            })
    });

    it('Não deve logar em mercedes sem senha do participante', function () {

        var authService = new AuthService(this);

        var database = new Database();

        return authService.authParticipant(config.USERNAME, config.PASSEMPTY, config.CLIENT_ID).then(function (response) {
            return database.cancelabloqueio().then(function () {
                expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            })
        })/*.catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });*/
    });

    it('Não deve logar em mercedes sem usuário do participante', function () {
        var authService = new AuthService(this);

        var database = new Database();

        return authService.authParticipant(config.EMPTYUSERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            return database.cancelabloqueio().then(function () {
               expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            })
        })/*.catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });*/
    });

    it('Não deve logar em mercedes sem client ID do participante', function () {
        var authService = new AuthService(this);

        var database = new Database();

        return authService.authParticipant(config.EMPTYUSERNAME, config.PASS, config.EMPTYCLIENT_ID).then(function (response) {
            return database.cancelabloqueio().then(function () {
                expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            })
        })/*.catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });*/
    });

    it('Não deve logar em mercedes com usuário inválido do participante', function () {
        var authService = new AuthService(this);

        var database = new Database();

        return authService.authParticipant(config.WRONGUSERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            return database.cancelabloqueio().then(function () {
                expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            })
        })/*.catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });*/
    });

    it('Não deve logar em mercedes com senha inválida do participante', function () {
        var authService = new AuthService(this);

        var database = new Database();

        return authService.authParticipant(config.USERNAME, config.PASSWRONG, config.CLIENT_ID).then(function (response) {
            return database.cancelabloqueio().then(function () {
                expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            })
        })/*.catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });*/
    });

    it('Não deve logar em mercedes com client ID inválido do participante', function () {
        var authService = new AuthService(this);

        var database = new Database();

        return authService.authParticipant(config.USERNAME, config.PASS, config.WRONGCLIENT_ID).then(function (response) {
            return database.cancelabloqueio().then(function () {
                expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            })
        })/*.catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });*/
    });

});