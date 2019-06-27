'use strict';

var AuthService = require('../services/authService');
var DealermanagementService = require('../services/DealermanagementService');
var CreatedealerService = require('../services/createdealerService');
const moment = require("moment");
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');
var date = new Date();
//config.createdealerportep.RazaoSocial = config.createdealerportep.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss');
//config.createdealerportem.RazaoSocial = config.createdealerportem.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss');
//config.createdealerporteg.RazaoSocial = config.createdealerporteg.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss');

describe('Testes na Api de gestão de dealers', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar todos os registros de usuários de admin (porte P)', function () {

        //var authService = new AuthService(this);

        var dealermanagementService = new DealermanagementService(this);

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.CNPJ = createdealerService.cnpjdealer();

        var CNPJ = config.createdealerportep.CNPJ;

        //config.createdealerportep.CNPJ;

        //cria cadastro do dealer
        return createdealerService.createdealerP(token, config.createdealerportep).then(function (responseCreate) {
            console.log(config.createdealerportep);
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer').to.have.status(config.util.HTTP.CREATED);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            return createdealerService.createpassdealerP(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                //autentica dealer
                //consulta o dealer criado na api usuários
                return dealermanagementService.getDealer(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (CNPJ === response.body[i].CNPJ) {
                            console.log(response.body[i].CNPJ)
                            expect(CNPJ, 'Deve retornar dealer criado').to.eq(response.body[i].CNPJ);
                            break
                        } else {
                            if (i === 0) {
                                throw Error('Participante sem cupom');
                            }
                        }
                    }
                });
            });
        });
    });

    it('Deve retornar todos os registros de usuários de admin (porte M)', function () {

        var dealermanagementService = new DealermanagementService(this);

        var createdealerService = new CreatedealerService(this);

        config.createdealerportem.CNPJ = createdealerService.cnpjdealer();

        var CNPJ = config.createdealerportem.CNPJ;

        //cria cadastro do dealer
        return createdealerService.createdealerM(config.createdealerportem).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer').to.have.status(config.util.HTTP.CREATED);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            return createdealerService.createpassdealerM(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                // expect(response.body.dealer_Id).to.exist;
                //consulta o dealer criado na api usuários
                return dealermanagementService.getDealer(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (CNPJ === response.body[i].CNPJ) {
                            console.log(response.body[i].CNPJ)
                            expect(CNPJ, 'Deve retornar dealer criado').to.eq(response.body[i].CNPJ);
                            break
                        } else {
                            if (i === 0) {
                                throw Error('Participante sem cupom');
                            }
                        }
                    }
                });
            });
        });
    });

    it('Deve retornar todos os registros de usuários de admin (porte G)', function () {

        var dealermanagementService = new DealermanagementService(this);

        var createdealerService = new CreatedealerService(this);

        config.createdealerporteg.CNPJ = createdealerService.cnpjdealer();

        var CNPJ = config.createdealerporteg.CNPJ;

        //cria cadastro do dealer
        return createdealerService.createdealerG(config.createdealerporteg).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer').to.have.status(config.util.HTTP.CREATED);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            return createdealerService.createpassdealerG(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                // expect(response.body.dealer_Id).to.exist;
                //consulta o dealer criado na api usuários
                return dealermanagementService.getDealer(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (CNPJ === response.body[i].CNPJ) {
                            console.log(response.body[i].CNPJ)
                            expect(CNPJ, 'Deve retornar dealer criado').to.eq(response.body[i].CNPJ);
                            break
                        } else {
                            if (i === 0) {
                                throw Error('Participante sem cupom');
                            }
                        }
                    }
                });
            });
        });
    });

    it('Não deve retornar lista de dealers sem token', function () {

        var dealermanagementService = new DealermanagementService(this);

        return dealermanagementService.getDealer().then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
        })/*.catch(function (response) {
              expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
          });*/
    });

    it('Não deve retornar lista de dealers com token inválido', function () {

        var dealermanagementService = new DealermanagementService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        return dealermanagementService.getDealer(token).then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
        })/*.catch(function (response) {
              expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
          });*/
    });

    it('Não deve retornar lista de dealer com token de participante', function () {

        var dealermanagementService = new DealermanagementService(this);

        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return dealermanagementService.getDealer(token).then(function (response) {
                expect(response, 'Deve retornar status 401 e não retornar lista de dealer informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
            })/*.catch(function (response) {
                  expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
              });*/
        });
    });
});
