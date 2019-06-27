'use strict';

var AuthdealeradminService = require('../services/authdealeradminService')
let Database = require('../database/database');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Teste de autenticação no dealer admin', function () {


    it('Deve logar em mercedes dealer através da autenticação por dealer admin', function () {

        var authdealeradminService = new AuthdealeradminService(this);

        return authdealeradminService.authDealeradm(config.DEALERADMUSERNAME, config.DEALERADMPASS, config.DEALERADMCLIENT_ID)
            .then(function (response) {
                //console.log(response.body)
                expect(response).to.have.status(config.util.HTTP.OK);
                //expect(response.error).to.equal(false);
                expect(response.body.access_token).to.not.equal('');
            })
    });

    it('Não deve logar em mercedes dealer sem senha do participante', function () {

        var authdealeradminService = new AuthdealeradminService(this);

        var database = new Database();

        return authdealeradminService.authDealeradm(config.DEALERADMUSERNAME, config.PASSEMPTY, config.DEALERADMCLIENT_ID).then(function (response) {
            return database.cancelabloqueiodealeradm().then(function () {
                expect(response).to.have.status(config.util.HTTP.OK);
            })
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve logar em mercedes sem usuário do participante', function () {

        var authdealeradminService = new AuthdealeradminService(this);

        var database = new Database();

        return authdealeradminService.authDealeradm(config.EMPTYUSERNAME, config.DEALERADMPASS, config.DEALERADMCLIENT_ID).then(function (response) {
            return database.cancelabloqueiodealeradm().then(function () {
                expect(response).to.have.status(config.util.HTTP.OK);
            })
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve logar em mercedes sem client ID do participante', function () {

        var authdealeradminService = new AuthdealeradminService(this);

        var database = new Database();

        return authdealeradminService.authDealeradm(config.DEALERADMUSERNAME, config.DEALERADMPASS, config.EMPTYCLIENT_ID).then(function (response) {
            return database.cancelabloqueiodealeradm().then(function () {
                expect(response).to.have.status(config.util.HTTP.OK);
            })
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve logar em mercedes com usuário inválido do participante', function () {

        var authdealeradminService = new AuthdealeradminService(this);

        var database = new Database();

        return authdealeradminService.authDealeradm(config.WRONGUSERNAME, config.DEALERADMPASS, config.DEALERADMCLIENT_ID).then(function (response) {
            return database.cancelabloqueiodealeradm().then(function () {
                expect(response).to.have.status(config.util.HTTP.OK);
            })
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve logar em mercedes com senha inválida do participante', function () {

        var authdealeradminService = new AuthdealeradminService(this);

        var database = new Database();

        return authdealeradminService.authDealeradm(config.DEALERADMUSERNAME, config.PASSWRONG, config.DEALERADMCLIENT_ID).then(function (response) {
            return database.cancelabloqueiodealeradm().then(function () {
                expect(response).to.have.status(config.util.HTTP.OK);
            })
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve logar em mercedes com client ID inválido do participante', function () {

        var authdealeradminService = new AuthdealeradminService(this);

        var database = new Database();

        return authdealeradminService.authDealeradm(config.DEALERADMUSERNAME, config.DEALERADMPASS, config.CLIENT_ID).then(function (response) {
            return database.cancelabloqueiodealeradm().then(function () {
                expect(response).to.have.status(config.util.HTTP.OK);
            })
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

});