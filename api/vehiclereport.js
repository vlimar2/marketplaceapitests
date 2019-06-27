'use strict';

var AuthService = require('../services/authService');
var VehiclereportService = require('../services/vehiclereportService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');

describe('Testes na Api de relatório de veículos', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar relatório de veículos', function () {

        var vehiclereportService = new VehiclereportService(this);

        //cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            console.log(responseCreate.body);
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                console.log("Usuário autenticado");
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //cadastra veículo
                    return vehicleService.includeVehicle(token, getresponse.body.participanteId).then(function (responsevehicle) {
                        expect(responsevehicle).to.exist;
                        //gera relatório de veículo incluindo o cadastrado anteriormente
                        return vehiclereportService.generatereportvehicle(token).then(function (response) {
                            expect(response, 'Deve retornar status 200 ao gerar relatório de veículos').to.have.status(config.util.HTTP.OK);
                            // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
                            // console.log(response.headers.content-disposition);
                        });
                    });
                });
            });
        });
    });

    it('Não deve retornar relatório de veículos sem token', function () {

        var vehiclereportService = new VehiclereportService(this);

        return vehiclereportService.generatereportvehicle().then(function (response) {
            expect(response, 'Deve retornar status 401 ao negar relatório de veículos').to.have.status(config.util.HTTP.OK);
            // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
            // console.log(response.headers.content-disposition);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar relatório de veículos com token inválido', function () {

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V"

        var vehiclereportService = new VehiclereportService(this);

        return vehiclereportService.generatereportvehicle(token).then(function (response) {
            expect(response, 'Deve retornar status 401 ao negar relatório de veículos').to.have.status(config.util.HTTP.OK);
            // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
            // console.log(response.headers.content-disposition);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar relatório de veículos logado como participante', function () {

        var vehiclereportService = new VehiclereportService(this);

        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return vehiclereportService.generatereportvehicle(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
                expect(response, 'Deve retornar status 401 e não gerar relatório de veículos').to.have.status(config.util.HTTP.UNAUTHORIZED);
            })/*.catch(function (response) {
                      expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
                  });*/

        });
    });

    /*  it('Não deve retornar relatório de veículos sem token', function () {
      
              var vehiclereportService = new VehiclereportService(this);
      
              return vehiclereportService.generatereportvehicle().then(function (response) {
                  expect(response, 'Deve retornar status 401 ao negar relatório de veículos').to.have.status(config.util.HTTP.OK);
                  // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
                  // console.log(response.headers.content-disposition);
              }).catch(function (response) {
                  expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
              });
      
          });
      
          it('Não deve retornar relatório de veículos com token inválido', function () {
      
              token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V"
      
              var vehiclereportService = new VehiclereportService(this);
      
              return vehiclereportService.generatereportvehicle(token).then(function (response) {
                  expect(response, 'Deve retornar status 401 ao negar relatório de veículos').to.have.status(config.util.HTTP.OK);
                  // expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
                  // console.log(response.headers.content-disposition);
              }).catch(function (response) {
                  expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
              });
      
          });*/
});