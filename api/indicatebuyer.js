'use strict';

var AuthService = require('../services/authService');
var IndicatebuyerService = require('../services/indicatebuyerService');
var VehiclereportService = require('../services/vehiclereportService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var Vehiclefactory = require('../factories/vehiclefactory');
var IndicatelistService = require('../services/indicatelistService');
var VehicleService = require('../services/vehicleService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var tokenpart
var client_Id = 1
var participanteId

describe('Testes na Api de indicação de comprador', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve indicar comprador', function () {

        var indicatebuyerService = new IndicatebuyerService(this);

        var participantService = new ParticipantService(this);

        var indicatelistService = new IndicatelistService(this);//VehicleService

        var vehicleService = new VehicleService(this);

        var factory = new Participantfactory();

        var vfactory = new Vehiclefactory();

        var vehicle = vfactory.buildDefault();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),//indicatebuyerService.cnpjindicateproprietario()
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var ParticipanteId

        //recebe participante ID do participante que irá indicar chassi
        return participantService.getParticipant(token).then(function (getresponse) {
            expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
            expect(getresponse.body.participanteId).to.exist;
            vehicle.participanteId = getresponse.body.participanteId
            //cadastra veículo
            return vehicleService.includeVehicle1(token, ParticipanteId, vehicle).then(function (responsevehicle) {
                expect(responsevehicle).to.exist;
                expect(responsevehicle.body).to.exist;
                var VeiculoId = responsevehicle.body;
                //cria um participante
                return participantService.createParticipant(participant).then(function (responseCreate) {
                    expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                    expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                    console.log(responseCreate.body);
                    //autentica participante
                    return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                        expect(responseAuth).to.have.status(config.util.HTTP.OK);
                        expect(responseAuth.body.access_token).to.not.equal('');
                        var tokenpart = responseAuth.body.access_token;
                        console.log("Usuário autenticado");
                        //recebe dados do participante que irá indicar chassi
                        return participantService.getParticipant(tokenpart).then(function (getres) {
                            expect(getres, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                            expect(getres.body.participanteId).to.exist;
                            expect(getres.body.documentoParticipante).to.exist;
                            expect(getres.body.email).to.exist;
                            expect(getres.body.nome).to.exist;
                            console.log("Recebendo dados de chassi");
                            var Documento = getres.body.documentoParticipante
                            var Email = getres.body.email
                            //indica veículo para participante criado
                            return indicatebuyerService.createbuyerIndication(token, Documento, VeiculoId, Email).then(function (responseindicate) {
                                //VeiculoId = responsevehicle.body
                                expect(responseindicate, 'Deve retornar status 200 ao retornar indicação de comprador criada').to.have.status(config.util.HTTP.OK);
                                expect(responseindicate.body).to.equal("Indicação completada");
                                expect(responseindicate.body).to.exist;
                                console.log("Indicando chassi");
                                //expect(responsevehicle.body === responseindicate.body.veiculoId);
                                //expect(responseindicate.body).to.equal(VeiculoId);
                                //verifica se indicação está na lista de indicações
                                return indicatelistService.getindicates(token).then(function (responseindicateList) {
                                    expect(responseindicateList, 'Retornar status 200 ao verificar indicação na lista').to.have.status(config.util.HTTP.OK);
                                    //expect(responseindicateList.body.Results[0].data, 'Data deve ser igual a data corrente').to.exist;
                                    expect(responseindicateList.body.Results[0].status).to.equal("Enviado");
                                    expect(responseindicateList.body.Results[0].tipo).to.equal("comprador");
                                    console.log("Verifica o status da indicação na lista do indicador para enviado");
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    it('Deve indicar comprador e comprador deve finalizar o cadastro do veículo', function () {

         //o fluxo de auditoria de indicação foi abolido e ainda não temos uma definição de como será feito o processo, por isso os testes em sua ultima fase //que
         //deveria ter o status confirmado , tem o status enviado

        var indicatebuyerService = new IndicatebuyerService(this);

        var participantService = new ParticipantService(this);

        var indicatelistService = new IndicatelistService(this);//VehicleService

        var vehicleService = new VehicleService(this);

        var factory = new Participantfactory();

        var vfactory = new Vehiclefactory();

        var vehicle = vfactory.buildDefault();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),//indicatebuyerService.cnpjindicateproprietario()
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var ParticipanteId

        //recebe participante ID do participante que irá indicar chassi
        return participantService.getParticipant(token).then(function (getresponse) {
            expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
            expect(getresponse.body.participanteId).to.exist;
            vehicle.participanteId = getresponse.body.participanteId
            //cadastra veículo
            return vehicleService.includeVehicle1(token, ParticipanteId, vehicle).then(function (responsevehicle) {
                expect(responsevehicle).to.exist;
                expect(responsevehicle.body).to.exist;
                var VeiculoId = responsevehicle.body;
                //var veiculo = vehicleService.body.vehicle;
                //cria um participante
                return participantService.createParticipant(participant).then(function (responseCreate) {
                    expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                    expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                    console.log(responseCreate.body);
                    //autentica participante
                    return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                        expect(responseAuth).to.have.status(config.util.HTTP.OK);
                        expect(responseAuth.body.access_token).to.not.equal('');
                        var tokenpart = responseAuth.body.access_token;
                        console.log("Usuário autenticado");
                        //recebe dados do participante que irá indicar chassi
                        return participantService.getParticipant(tokenpart).then(function (getres) {
                            expect(getres, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                            expect(getres.body.participanteId).to.exist;
                            expect(getres.body.documentoParticipante).to.exist;
                            expect(getres.body.email).to.exist;
                            expect(getres.body.nome).to.exist;
                            var Email = getres.body.email
                            var Documento = getres.body.documentoParticipante
                            console.log("Recebendo dados de chassi");
                            //indica veículo para participante criado
                            return indicatebuyerService.createbuyerIndication(token, Documento, VeiculoId, Email).then(function (responseindicate) {
                                //VeiculoId = responsevehicle.body
                                expect(responseindicate, 'Deve retornar status 200 ao retornar indicação de comprador criada').to.have.status(config.util.HTTP.OK);
                                expect(responseindicate.body).to.equal("Indicação completada");
                                expect(responseindicate.body).to.exist;
                                console.log("Indicando chassi");
                                //expect(responsevehicle.body === responseindicate.body.veiculoId);
                                //expect(responseindicate.body).to.equal(VeiculoId);
                                //verifica se indicação está na lista de indicações
                                return indicatelistService.getindicates(token).then(function (responseindicateList) {
                                    expect(responseindicateList, 'Retornar status 200 ao verificar indicação na lista').to.have.status(config.util.HTTP.OK);
                                    //expect(responseindicateList.body.Results[0].data, 'Data deve ser igual a data corrente').to.exist;
                                    expect(responseindicateList.body.Results[0].status).to.equal("Enviado");
                                    expect(responseindicateList.body.Results[0].tipo).to.equal("comprador");
                                    console.log("Verificando dados na lista de indicações");
                                    //recebe dados do indicado
                                    return participantService.getParticipant(tokenpart).then(function (getindicatedresponse) {
                                        expect(getindicatedresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                                        expect(getindicatedresponse.body.participanteId).to.exist;
                                        //expect(getindicatedresponse.body.).to.exist;
                                        //indicado cadastra veiculo do indicador
                                        return vehicleService.includeVehicle1(tokenpart, Documento, vehicle).then(function (resindicatedvehicle) {
                                            expect(resindicatedvehicle).to.exist;
                                            expect(resindicatedvehicle.body).to.exist;
                                            var VeiculoId = responsevehicle.body;
                                            console.log("Cadastra veículo sugerido pelo indicador");
                                            //status de indicação de quem indicou deve ser alterado para confirmado
                                            return indicatelistService.getindicates(token).then(function (responseindicateList) {
                                                expect(responseindicateList, 'Retornar status 200 ao verificar indicação na lista').to.have.status(config.util.HTTP.OK);
                                                //expect(responseindicateList.body.Results[0].data, 'Data deve ser igual a data corrente').to.exist;
                                                expect(responseindicateList.body.Results[0].status).to.equal("Confirmado");
                                                expect(responseindicateList.body.Results[0].tipo).to.equal("comprador");
                                                console.log("Verifica o status da indicação na lista do indicador muda para confirmado");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('Não deve indicar comprador com todos os campo vazios, exceto veículo', function () {

        var indicatebuyerService = new IndicatebuyerService(this);

        var indicatelistService = new IndicatelistService(this);//VehicleService

        var authService = new AuthService(this);

        var Celular = 0;

        var indicacao;

        //indica veículo para participante criado
        return indicatebuyerService.createemptybuyerIndication(token).then(function (responseindicate) {
            //VeiculoId = responsevehicle.body
            expect(responseindicate, 'Deve retornar status 400 e não realizar indicação de comprador').to.have.status(config.util.HTTP.BAD_REQUEST);
        })/*.catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });*/
    });

    it('Não deve indicar comprador sem token', function () {

        var indicatebuyerService = new IndicatebuyerService(this);

        var indicatelistService = new IndicatelistService(this);//VehicleService

        var authService = new AuthService(this);

        var Celular = 0;

        var indicacao;

        //indica veículo para participante criado
        return indicatebuyerService.createemptybuyerIndication().then(function (responseindicate) {
            //VeiculoId = responsevehicle.body
            expect(responseindicate, 'Deve retornar status 400 e não realizar indicação de comprador').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve indicar comprador com token de admin', function () {

        var indicatebuyerService = new IndicatebuyerService(this);

        var indicatelistService = new IndicatelistService(this);//VehicleService

        var authService = new AuthService(this);

        //loga como admin
        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.body.access_token).to.not.equal('');
            var tokenadm = response.body.access_token;
            //indica veículo para participante criado
            return indicatebuyerService.createemptybuyerIndication(tokenadm).then(function (responseindicate) {
                //VeiculoId = responsevehicle.body
                expect(responseindicate, 'Deve retornar status 400 e não realizar indicação de comprador').to.have.status(config.util.HTTP.UNAUTHORIZED);
            })/*.catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
            });*/
        });
    });
});




