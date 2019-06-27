'use strict';

var AuthService = require('../services/authService');
var UsermanagementService = require('../services/usermanagementService');
var CreatedealerService = require('../services/createdealerService');
const moment = require("moment");
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');
var date = new Date();
config.createdealerportep.RazaoSocial = config.createdealerportep.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss');
config.createdealerportem.RazaoSocial = config.createdealerportem.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss');
config.createdealerporteg.RazaoSocial = config.createdealerporteg.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss');

describe('Testes na Api de gestão de usuários', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar todos os registros de usuários de admin (porte P)', function () {

        var usermanagementService = new UsermanagementService(this);

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.CNPJ = createdealerService.cnpjdealer();

        var CNPJ = config.createdealerportep.CNPJ;

        //cria cadastro do dealer porte p
        return createdealerService.createdealerP(config.createdealerportep).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer porte P').to.have.status(config.util.HTTP.CREATED);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            return createdealerService.createpassdealerP(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                // expect(response.body.dealer_Id).to.exist;
                //consulta o dealer criado na api usuários
                return usermanagementService.getUser(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (CNPJ === response.body[i].documentoParticipante) {
                            console.log(response.body[i].documentoParticipante)
                            expect(CNPJ, 'Deve retornar dealer criado').to.eq(response.body[i].documentoParticipante);
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

        var usermanagementService = new UsermanagementService(this);

        var createdealerService = new CreatedealerService(this);

        config.createdealerportem.CNPJ = createdealerService.cnpjdealer();

        var CNPJ = config.createdealerportem.CNPJ;

        //cria cadastro do dealer porte M
        return createdealerService.createdealerM(config.createdealerportem).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer porte M').to.have.status(config.util.HTTP.CREATED);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            return createdealerService.createpassdealerM(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                // expect(response.body.dealer_Id).to.exist;
                //consulta o dealer criado na api usuários
                return usermanagementService.getUser(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (CNPJ === response.body[i].documentoParticipante) {
                            console.log(response.body[i].documentoParticipante)
                            expect(CNPJ, 'Deve retornar dealer criado').to.eq(response.body[i].documentoParticipante);
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

        var usermanagementService = new UsermanagementService(this);

        var createdealerService = new CreatedealerService(this);

        config.createdealerporteg.CNPJ = createdealerService.cnpjdealer();

        var CNPJ = config.createdealerporteg.CNPJ;

        //cria cadastro do dealer porte G
        return createdealerService.createdealerG(config.createdealerporteg).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer porte G').to.have.status(config.util.HTTP.CREATED);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            return createdealerService.createpassdealerG(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                // expect(response.body.dealer_Id).to.exist;
                //consulta o dealer criado na api usuários
                return usermanagementService.getUser(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (CNPJ === response.body[i].documentoParticipante) {
                            console.log(response.body[i].documentoParticipante)
                            expect(CNPJ, 'Deve retornar dealer criado').to.eq(response.body[i].documentoParticipante);
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

        var usermanagementService = new UsermanagementService(this);

        return usermanagementService.getUser().then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
        })/*.catch(function (response) {
              expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
          });*/
    });

    it('Não deve retornar lista de dealers com token inválido', function () {

        var usermanagementService = new UsermanagementService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        return usermanagementService.getUser(token).then(function (response) {
            expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
        })/*.catch(function (response) {
              expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
          });*/
    });

    it('Não deve retornar lista de dealers com token de participante', function () {

        var usermanagementService = new UsermanagementService(this);

        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return usermanagementService.getUser(token).then(function (response) {
                expect(response, 'Deve retornar status 401 e não retornar extrato do participante informado').to.have.status(config.util.HTTP.UNAUTHORIZED);
            })/*.catch(function (response) {
                  expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
              });*/
        });
    });
});
