'use strict';

var AuthService = require('../services/authService');
var CreatedealerService = require('../services/createdealerService');
var chai = require('chai')
const moment = require("moment")
var assert = chai.assert
var expect = chai.expect
var token
var date = new Date()
config.createdealerportep.RazaoSocial = config.createdealerportep.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss')
config.createdealerportem.RazaoSocial = config.createdealerportem.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss')
config.createdealerporteg.RazaoSocial = config.createdealerporteg.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss')
//var i

//for (i = 0; i < 1; i++) { 

describe('Testes na Api de cadastro de dealer consulta de pagamentos pendentes', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipantdealer(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve editar o cadastro do dealer', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 na edição do dealer').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve editar o cadastro do dealer informando CNPJ com mascara', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.CNPJ = "04.043.949/0001-20"
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 na edição do dealer').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Não deve editar o cadastro do Dealer informando CEP com mais de 8 caracteres', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.CEP = '69902-260'
        return createdealerService.editDealer(config.editarDealer).then(function (responseEdit) {
            expect(responseEdit, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
            expect(responseEdit.response.body.Message, 'Deve retornar mensgaem de erro').to.eql("O campo CEP não deve conter mais do que 8 caractéres.");
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar CNPJ', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.CNPJ = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Razão Social', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.RazaoSocial = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Inscrição Estadual', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.IE = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Segmento', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Segmento = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Porte', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Porte = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Conta', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Conta = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Data do aceite', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.dtAceiteContrato = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar CEP', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.CEP = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Estado', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.UF = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Cidade', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Cidade = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Bairro', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Bairro = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Endereço', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Endereco = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Longitude', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Longitude = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar Latitude', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = token;
        config.editarDealer.body.Longitude = ''
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 na edição do dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve editar o cadastro do Dealer sem informar token', function () {

        var createdealerService = new CreatedealerService(this);

        config.editarDealer.token = '';
        return createdealerService.editDealer(config.editarDealer).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 401 na edição do dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Deve cadastrar e consultar pagamentos pendentes de um dealer porte P', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.CNPJ = createdealerService.cnpjdealer()

        var CNPJ = config.createdealerportep.CNPJ;

        var authService = new AuthService(this);

        //cria cadastro do dealer
        console.log('CADASTRANDO DEALER - Iniciado')
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 201 ao criar o dealer').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body.Dealer_Id).to.exist;
            console.log('CADASTRANDO DEALER - Finalizado')
            //Cria senha para o dealer cadastrado
            /*console.log('CADASTRANDO SENHA - Iniciado')
            return createdealerService.createpassdealerP(token, CNPJ, responseCreate.body.Dealer_Id).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                // expect(response.body.dealer_Id).to.exist;
                console.log('CADASTRANDO SENHA - Finalizado')*/
                console.log('CONSULTANDO DEALER - Iniciado')
                //consulta o dealer criado na api de pagamentos pendentes 
                return createdealerService.getdealer(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (config.createdealerportep.RazaoSocial === response.body[i].razaoSocial) {
                            console.log(response.body[i].razaoSocial)
                            expect(config.createdealerportep.RazaoSocial, 'Deve retornar dealer criado').to.eq(response.body[i].razaoSocial);
                            break
                        }
                    }
                    console.log('CONSULTANDO DEALER - Finalizado')
                });
            //});
        });
    });

    it('Deve cadastrar e consultar pagamentos pendentes de um dealer porte M', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportem.CNPJ = createdealerService.cnpjdealer()

        var CNPJ = config.createdealerportem.CNPJ;

        var authService = new AuthService(this);

        //cria cadastro do dealer
        return createdealerService.createdealerM(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            /*return createdealerService.createpassdealerM(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");*/
                // expect(response.body.dealer_Id).to.exist;
                //consulta o dealer criado na api de pagamentos pendentes 
                return createdealerService.getdealer(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (config.createdealerportem.RazaoSocial === response.body[i].razaoSocial) {
                            console.log(response.body[i].razaoSocial)
                            expect(config.createdealerportem.RazaoSocial, 'Deve retornar dealer criado').to.eq(response.body[i].razaoSocial);
                            break
                        }
                    }
                });
            //});
        });
    });

    it('Deve cadastrar e consultar pagamentos pendentes de um dealer porte G', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerporteg.CNPJ = createdealerService.cnpjdealer()

        var CNPJ = config.createdealerporteg.CNPJ;

        var authService = new AuthService(this);

        //cria cadastro do dealer
        return createdealerService.createdealerG(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o dealer').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body.Dealer_Id).to.exist;
            //Cria senha para o dealer cadastrado
            /*return createdealerService.createpassdealerG(token, CNPJ).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");*/
                // expect(response.body.dealer_Id).to.exist;
                //consulta o dealer criado na api de pagamentos pendentes 
                return createdealerService.getdealer(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (config.createdealerporteg.RazaoSocial === response.body[i].razaoSocial) {
                            console.log(response.body[i].razaoSocial)
                            expect(config.createdealerporteg.RazaoSocial, 'Deve retornar dealer criado').to.eq(response.body[i].razaoSocial);
                            break
                        }
                    }
                });
            //});
        });
    });

    it('Deve cadastrar dealer informando CNPJ com mascara', function () {

        var createdealerService = new CreatedealerService(this);
        config.createdealerportep.Denominacao = "Teste " + createdealerService.cnpjdealer()
        config.createdealerportep.CNPJ = "04.043.949/0001-20"

        //cria cadastro do dealer
        console.log('CADASTRANDO DEALER - Iniciado')
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 201 ao criar o dealer').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body.Dealer_Id).to.exist;
            console.log('CADASTRANDO DEALER - Finalizado')
            //Cria senha para o dealer cadastrado
            /*console.log('CADASTRANDO SENHA - Iniciado')
            return createdealerService.createpassdealerP(token, CNPJ, responseCreate.body.Dealer_Id).then(function (response) {
                expect(response, 'Deve retornar status 200 ao criar senha para o dealer').to.have.status(config.util.HTTP.OK);
                expect(response.body).to.equal("Usuario criado com sucesso");
                // expect(response.body.dealer_Id).to.exist;
                console.log('CADASTRANDO SENHA - Finalizado')*/
                console.log('CONSULTANDO DEALER - Iniciado')
                //consulta o dealer criado na api de pagamentos pendentes 
                return createdealerService.getdealer(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao retornar dealer criado anteriormente').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (config.createdealerportep.RazaoSocial === response.body[i].razaoSocial) {
                            console.log(response.body[i].razaoSocial)
                            expect(config.createdealerportep.RazaoSocial, 'Deve retornar dealer criado').to.eq(response.body[i].razaoSocial);
                            break
                        }
                    }
                    console.log('CONSULTANDO DEALER - Finalizado')
                });
            //});
        });
    });

    it('Não deve permitir registro de dealer sem informar CNPJ', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.CNPJ = ""
        config.createdealerportep.Denominacao = "Sem CNPJ"

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });

    });

    it('Não deve permitir registro de dealer sem informar Denominação', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Denominacao = "";

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });

    });

    it('Não deve permitir registro de dealer sem informar Inscrição Estadual', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.IE = "";

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });

    });

    it('Não deve permitir registro de dealer sem informar Porte', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Porte = "";

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });

    });

    it('Não deve permitir registro de dealer sem informar Conta', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Conta = "";

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });

    });

    it('Não deve permitir registro de dealer sem informar Data de aceite', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.dtAceiteContrato = "";

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });

    });

    it('Não deve permitir registro de dealer sem informar Endereço', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Endereco = "";

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve permitir registro de dealer sem informar Latitude e Longitude', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Latitude = "";
        config.createdealerportep.Longitude = "";

        //cria cadastro do dealer
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.BAD_REQUEST);
        });

    });

    it('Não deve permitir registro de dealer com autenticação que não seja admin', function () {

        var createdealerService = new CreatedealerService(this);

        var authService = new AuthService(this);

        //Realiza login como participante
        return authService.authParticipantdealer(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            token = response.body.access_token;
            //cria cadastro do dealer
            return createdealerService.createdealerP(token).then(function (responseCreate) {
                expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
            });
        });
    });

    it('Não deve permitir registro de dealer sem informar Razão Social', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.RazaoSocial = ''
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve permitir registro de dealer sem informar Segmento', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Segmento = ''
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve permitir registro de dealer sem informar CEP', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.CEP = ''
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve permitir registro de dealer sem informar Estado', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.UF = ''
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve permitir registro de dealer sem informar Cidade', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Cidade = ''
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve permitir registro de dealer sem informar Bairro', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Bairro = ''
        return createdealerService.createdealerP(token).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 400 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve permitir registro de dealer sem informar token', function () {

        var createdealerService = new CreatedealerService(this);

        config.createdealerportep.Bairro = ''
        var tokenVazio = ''
        return createdealerService.createdealerP(tokenVazio).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 401 ao impedir de criar o dealer').to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Deve consultar pagamentos pendentes de um dealer porte P', function () {

        var createdealerService = new CreatedealerService(this);
        
        console.log('CONSULTANDO DEALER - Iniciado')
        //consulta o dealer criado na api de pagamentos pendentes
        return createdealerService.getdealer(token).then(function (response) {
            expect(response, 'Deve retornar status 200 na consulta do dealer').to.have.status(config.util.HTTP.OK);
            console.log('CONSULTANDO DEALER - Finalizado'.blue)
        });
    });
});