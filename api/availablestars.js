'use strict';

var AuthService = require('../services/authService');
var AvailablestarsService = require('../services/AvailablestarsService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;
var client_Id = 1;

describe('Testes na Api de Verificação de estrelas disponíveis', function () {

    //  before('setup', function() {    
    //     var authService = new AuthService(this);

    //      return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function(response) {
    //         token = response.body.access_token;
    //    });
    //  });

    it('Deve obter estrelas disponíveis do participante frota', function () {

        var availablestarsService = new AvailablestarsService(this);

        var authService = new AuthService(this);

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

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
                //consulta estrelas do participante criado
                return availablestarsService.getStars(responseAuth.body.access_token).then(function (response) {//.to.equal(245)
                    expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    expect(response.body.response[0], 'Deve conter uma quantidade de estrelas').to.be.least(25);
                });
            });
        });
    });

    it('Deve obter estrelas disponíveis do participante oficina', function () {

        var availablestarsService = new AvailablestarsService(this);

        var authService = new AuthService(this);

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var participantService = new ParticipantService(this);

        participant.funcaoParticipante = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.funcaoParticipanteDetalhe = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
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
                //consulta estrelas do participante criado
                return availablestarsService.getStars(responseAuth.body.access_token).then(function (response) {//.to.equal(245)
                    expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    expect(response.body.response[0], 'Deve conter uma quantidade de estrelas').to.be.least(25);
                });
            });
        });
    });

    it('Deve obter estrelas disponíveis do participante motorista autônomo', function () {

        var availablestarsService = new AvailablestarsService(this);

        var authService = new AuthService(this);

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var participantService = new ParticipantService(this);

        participant.funcaoParticipante = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.funcaoParticipanteDetalhe = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
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
                //consulta estrelas do participante criado
                return availablestarsService.getStars(responseAuth.body.access_token).then(function (response) {//.to.equal(245)
                    expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    expect(response.body.response[0], 'Deve conter uma quantidade de estrelas').to.be.least(25);
                });
            });
        });
    });

    it('Deve obter estrelas disponíveis sem token', function () {

        var availablestarsService = new AvailablestarsService(this);

        //consulta estrelas do participante criado
        return availablestarsService.getStars().then(function (response) {//.to.equal(245)
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            //   expect(response.body.response[0], 'Deve conter uma quantidade de estrelas').to.be.above(25);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Deve obter estrelas disponíveis com token inválido', function () {

        var availablestarsService = new AvailablestarsService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        //consulta estrelas do participante criado
        return availablestarsService.getStars(token).then(function (response) {//.to.equal(245)
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            //   expect(response.body.response[0], 'Deve conter uma quantidade de estrelas').to.be.above(25);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });
});