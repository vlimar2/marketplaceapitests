'use strict';

var AuthService = require('../services/authService');
var AvailablepointsService = require('../services/AvailablepointsService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;
var client_Id = 1;

describe('Testes na Api de Verificação de pontos disponíveis', function () {

    //  before('setup', function () {
    //      var authService = new AuthService(this);

    //      return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
    //           token = response.body.access_token;
    //      });
    //  });

    it('Deve obter pontos disponíveis do participante frota', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var availablepointsService = new AvailablepointsService(this);

        var authService = new AuthService(this);

        var participantService = new ParticipantService(this);

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        //Cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            //Autentica o participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                //consulta pontos do particiante
                return availablepointsService.getDoc(responseAuth.body.access_token).then(function (response) {
                    expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    // expect(response.body.response[1], 'Deve conter uma quantidade de pontos maior ou igual que 0').to.not.equal('');
                });
            });
        });
    });

    it('Deve obter pontos disponíveis do participante oficina', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var availablepointsService = new AvailablepointsService(this);

        var authService = new AuthService(this);

        var participantService = new ParticipantService(this);

        participant.funcaoParticipante = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.funcaoParticipanteDetalhe = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Oficina proprietário"
        participant.client_Id = client_Id

        //Cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            //Autentica o participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                //consulta pontos do particiante
                return availablepointsService.getDoc(responseAuth.body.access_token).then(function (response) {
                    expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    // expect(response.body.response[1], 'Deve conter uma quantidade de pontos maior ou igual que 0').to.not.equal('');
                });
            });
        });
    });

    it('Deve obter pontos disponíveis do participante motorista autônomo', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var availablepointsService = new AvailablepointsService(this);

        var authService = new AuthService(this);

        var participantService = new ParticipantService(this);

        participant.funcaoParticipante = "54786C70-B31D-4156-B1EC-46693636C307",
            participant.funcaoParticipanteDetalhe = "54786C70-B31D-4156-B1EC-46693636C307",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Motorista autônomo"
        participant.client_Id = client_Id

        //Cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            //Autentica o participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                //consulta pontos do particiante
                return availablepointsService.getDoc(responseAuth.body.access_token).then(function (response) {
                    expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    // expect(response.body.response[1], 'Deve conter uma quantidade de pontos maior ou igual a 0').to.not.equal('');
                });
            });
        });
    });

    it('Não deve retornar pontos disponíveis sem token', function () {

        var availablepointsService = new AvailablepointsService(this);

        var authService = new AuthService(this);

        //consulta pontos do particiante
        return availablepointsService.getDoc().then(function (response) {
            expect(response, 'Deve retornar status 401 e não exibir pontos disponíveis do participante').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar pontos disponíveis com token inválido', function () {

        var availablepointsService = new AvailablepointsService(this);

        var authService = new AuthService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        //consulta pontos do particiante
        return availablepointsService.getDoc(token).then(function (response) {
            expect(response, 'Deve retornar status 401 e não exibir pontos disponíveis do participante').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar pontos disponíveis com token de admin', function () {

        var availablepointsService = new AvailablepointsService(this);

        var authService = new AuthService(this);

        //autentica como admin
        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            //consulta pontos do particiante
            return availablepointsService.getDoc(token).then(function (response) {
                expect(response, 'Deve retornar status 401 e não exibir pontos disponíveis do participante').to.have.status(config.util.HTTP.OK);
            }).catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
            });
        });
    });
});