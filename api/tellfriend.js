'use strict';

var AuthService = require('../services/authService');
var TellfriendService = require('../services/tellfriendService');
var Participantfactory = require('../factories/participantfactory');
var IndicatelistService = require('../services/indicatelistService');
var ParticipantService = require('../services/participantService');
var AvailablestarsService = require('../services/AvailablestarsService');
var Util = require('../util');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var tokenpart
var client_Id = 1
var participanteId

describe('Testes na Api de indicação de amigo', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve indicar amigo', function () {

        var tellfriendService = new TellfriendService(this);

        var participantService = new ParticipantService(this);

        var indicatelistService = new IndicatelistService(this);

        var factory = new Participantfactory();

        var availablestarsService = new AvailablestarsService(this);

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var indicacao = tellfriendService.randomemail();

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),//indicatebuyerService.cnpjindicateproprietario()
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id
        participant.email = indicacao.email[0];

        var ParticipanteId

        return tellfriendService.createIndication(token, indicacao).then(function (response) {
            expect(response, 'Deve retornar status 200 ao indicar amigo').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Indicação completada");
            //verifica status da indicação como enviado
            return indicatelistService.getindicates(token).then(function (responseindicateList) {
                expect(responseindicateList, 'Retornar status 200 ao verificar indicação na lista').to.have.status(config.util.HTTP.OK);
                expect(responseindicateList.body.Results[0].status).to.equal("Enviado");
                expect(responseindicateList.body.Results[0].tipo).to.equal("amigo");
                console.log("Verifica o status da indicação na lista do indicador para enviado");
                //cria um participante
                return participantService.createParticipant(participant, indicacao.email).then(function (responseCreate) {
                    expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                    expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                    console.log(responseCreate.body);
                    //autentica participante
                    return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                        expect(responseAuth).to.have.status(config.util.HTTP.OK);
                        expect(responseAuth.body.access_token).to.not.equal('');
                        var tokenpart = responseAuth.body.access_token;
                        console.log("Usuário autenticado");
                        //verifica status da indicação como enviado
                        return indicatelistService.getindicates(token).then(function (responseindicateList) {
                            expect(responseindicateList, 'Retornar status 200 ao verificar indicação na lista').to.have.status(config.util.HTTP.OK);
                            expect(responseindicateList.body.Results[0].status).to.equal("Pontuado");
                            expect(responseindicateList.body.Results[0].tipo).to.equal("amigo");
                            console.log("Verifica o status da indicação na lista do indicador para pontuado");
                            return availablestarsService.getStars(token).then(function (response) {//.to.equal(245)
                                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                expect(response.body.response[0], 'A quantidade de estrelas deve ser: Valor atual mais 50').to.be.above(25);
                                var valAtual = response.body.response[0];
                                var myObj = { val: valAtual }
                                    , addTwo = function () { myObj.val += 50; };

                                expect(addTwo).to.increase(myObj, 'val').by(50); // Recommended
                                expect(addTwo).to.increase(myObj, 'val'); // N
                                //expect(response.body.response[0], 'A quantidade de estrelas deve ser: Valor atual mais 50').to.be.above();
                            });
                        });
                    });
                });
            });
        });
    });

    it('Não deve receber estrelas se indicação não finalizar cadastro', function () {

        var tellfriendService = new TellfriendService(this);

        var indicatelistService = new IndicatelistService(this);

        var availablestarsService = new AvailablestarsService(this);

        var authService = new AuthService(this);

        var indicacao = tellfriendService.randomemail();

        return availablestarsService.getStars(token).then(function (Firstresponse) {//.to.equal(245)
            expect(Firstresponse, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(Firstresponse.body.response[0], 'A quantidade de estrelas deve ser maior que 25').to.be.above(25);
            var saldoestrelasantes = Firstresponse.body.response[0];
            return tellfriendService.createIndication(token, indicacao).then(function (response) {
                expect(response, 'Deve retornar status 200 ao indicar amigo').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Indicação completada");
                //verifica status da indicação como enviado
                return indicatelistService.getindicates(token).then(function (responseindicateList) {
                    expect(responseindicateList, 'Retornar status 200 ao verificar indicação na lista').to.have.status(config.util.HTTP.OK);
                    expect(responseindicateList.body.Results[0].status).to.equal("Enviado");
                    expect(responseindicateList.body.Results[0].tipo).to.equal("amigo");
                    console.log("Verifica o status da indicação na lista do indicador para enviado");
                    //verifica se foi acrescido o valor de 50 estrelas
                    return availablestarsService.getStars(token).then(function (response) {//.to.equal(245)
                        expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                        expect(response.body.response[0], 'A quantidade de estrelas deve ser: Valor atual mais 50').to.be.above(25);
                        var saldoestrelasdepois = response.body.response[0];
                        expect(saldoestrelasantes, 'Deve manter a quantidade de estrelas anterior a indicação').to.eq(saldoestrelasdepois);
                        //expect(response.body.response[0], 'A quantidade de estrelas deve ser: Valor atual mais 50').to.be.above();
                    });
                });
            });
        });
    });

    it('Não deve indicar amigo com email inválido', function () {

        var tellfriendService = new TellfriendService(this);

        var indicacao = tellfriendService.randomemail();

        indicacao.email[0] = ["xxx"];

        return tellfriendService.createIndication(token, indicacao).then(function (response) {
            expect(response, 'Deve retornar status 400 e não indicar amigo').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        })
    });

    it('Não deve indicar amigo com campo email vazio', function () {

        var tellfriendService = new TellfriendService(this);

        var indicacao = tellfriendService.randomemail();

        indicacao.email = [""];

        return tellfriendService.createIndication(token, indicacao).then(function (response) {
            expect(response, 'Deve retornar status 400 e não indicar amigo').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //expect(response.body.Message).to.equal("Campo obrigatório");
        })
    });

    it('Não deve indicar amigo com o mesmo email repetido', function () {

        var tellfriendService = new TellfriendService(this);

        var indicacao = tellfriendService.randomemail();

        indicacao.email = ["cursoqaltm1@gmail.com"];

        return tellfriendService.createIndication(token, indicacao).then(function (response) {
            expect(response, 'Deve retornar status 400 e não indicar amigo').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //expect(response.body.Message).to.equal("O email cursoqaltm1@gmail.com já foi indicado");
        })
    });
});