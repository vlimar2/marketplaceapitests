'use strict';

var AuthService = require('../services/authService');
var ParticipantlistService = require('../services/participantlistService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');
var client_Id = 1

describe('Testes na Api de lista de participantes', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    /*it('Deve retornar lista de participantes', function () {

        var participantlistService = new ParticipantlistService(this);

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota comprador"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            console.log(responseCreate.body);
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                console.log("Usuário autenticado");
                return participantlistService.generatelist(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (participant.documentoParticipante === response.body[i].documentoParticipante) {
                            console.log(response.body[i].documentoParticipante)
                            expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].documentoParticipante);
                            break
                        } else {
                            if (i === 0) {
                                throw Error('Participante criado não localizado');
                            }
                        }
                    }
                });
            });
        });
    });*/

    it('Deve retornar participante solicitado na busca', function () {

        var participantlistService = new ParticipantlistService(this);

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota comprador"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        var DocumentoParticipante = participant.documentoParticipante;

        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            console.log(responseCreate.body);
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                console.log("Usuário autenticado");
                return participantlistService.generatelist(token, DocumentoParticipante).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
                    expect(DocumentoParticipante, 'Deve retornar participante criado').to.eq(response.body.documentoParticipante);
                });
            });
        });
    });

    it('Não deve retornar busca de participante sem token', function () {

        var participantlistService = new ParticipantlistService(this);

        return participantlistService.generatelist().then(function (response) {
            expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar busca de participante com token inválido', function () {

        var participantlistService = new ParticipantlistService(this);

        var authService = new AuthService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V"

        return participantlistService.generatelist(token).then(function (response) {
            expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.BAD_REQUEST);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve retornar busca de participante com token de participante', function () {

        var participantlistService = new ParticipantlistService(this);

        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return participantlistService.generatelist(token).then(function (response) {
                expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
            }).catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
            });
        });
    });

    it('Não deve retornar busca de participante com login (documento) inválido', function () {

        var participantlistService = new ParticipantlistService(this);

        var authService = new AuthService(this);

        var DocumentoParticipante = "00000000000";

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return participantlistService.generatelist(token, DocumentoParticipante).then(function (response) {
                expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
            }).catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            });
        });
    });
});
