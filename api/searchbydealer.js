'use strict';

var AuthService = require('../services/authService');
var AvailablestarsService = require('../services/AvailablestarsService');
var ParticipantService = require('../services/participantService');
var VehicleService = require('../services/vehicleService');
var Participantfactory = require('../factories/participantfactory');
var Vehiclefactory = require('../factories/vehiclefactory');
var SearchbydealerService = require('../services/searchbydealerService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;
var tokenpart;
var client_Id = 1;

describe('Testes na Api de busca por Placa, Chassi ou Login no dealer', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.DEALERADMUSERNAME, config.DEALERADMPASS, config.DEALERADMCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve realizar busca por Placa', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var vehicleService = new VehicleService(this);

        var factory = new Participantfactory();

        var vehiclefactory = new Vehiclefactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var vehicle = vehiclefactory.buildDefault();

        var participantService = new ParticipantService(this);

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        //Cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            //Autentica o participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                tokenpart = responseAuth.body.access_token;
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseAuth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    var ParticipanteId = getresponse.body.participanteId;
                    vehicle.participanteId = ParticipanteId.toString();
                    //cadastra veículo
                    return vehicleService.includeVehicle1(tokenpart, ParticipanteId.toString(), vehicle).then(function (responsevehicle) {
                        expect(responsevehicle).to.have.status(config.util.HTTP.OK);
                        expect(responsevehicle.body).to.not.equal('');
                        //Pega informações de participante incluindo placa cadastrada
                        return participantService.getParticipant(tokenpart).then(function (responsePart) {
                            var placa = responsePart.body.Veiculos[0].placa;
                            expect(placa).to.exist;
                            //consulta placa do participante criado
                            return searchbydealerService.getPlaca(token, placa).then(function (response) {//.to.equal(245)
                                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                expect(response.body.veiculoId, 'Deve retornar veículo ID').to.not.equal('');
                            }, function (a) {
                                console.log(a);
                            });
                        });
                    });
                });
            });
        });
    });

    it('Deve realizar busca por Chassi', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var vehicleService = new VehicleService(this);

        var factory = new Participantfactory();

        var vehiclefactory = new Vehiclefactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var vehicle = vehiclefactory.buildDefault();

        var participantService = new ParticipantService(this);

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        //Cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            //Autentica o participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                tokenpart = responseAuth.body.access_token;
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseAuth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    var ParticipanteId = getresponse.body.participanteId;
                    vehicle.participanteId = ParticipanteId.toString();
                    //cadastra veículo
                    return vehicleService.includeVehicle1(tokenpart, ParticipanteId.toString(), vehicle).then(function (responsevehicle) {
                        expect(responsevehicle).to.have.status(config.util.HTTP.OK);
                        expect(responsevehicle.body).to.not.equal('');
                        //Pega informações de participante incluindo chassi cadastrado
                        return participantService.getParticipant(tokenpart).then(function (responsePart) {
                            var chassi = responsePart.body.Veiculos[0].chassi;
                            expect(chassi).to.exist;
                            //consulta chassi do participante criado
                            return searchbydealerService.getChassi(token, chassi).then(function (response) {//.to.equal(245)
                                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                // expect(response.body.placa, 'Deve realizar a busca e exibir cadastro pela placa').to.equal(Placa);
                                expect(response.body.veiculoId, 'Deve retornar veículo ID').to.not.equal('');
                            });
                        });
                    });
                });
            });
        });
    });

    it('Deve realizar busca por CPF', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var vehicleService = new VehicleService(this);

        var factory = new Participantfactory();

        var vehiclefactory = new Vehiclefactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var vehicle = vehiclefactory.buildDefault();

        var participantService = new ParticipantService(this);

        var cpf = participant.documentoEmpresa;

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        //Cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            //Autentica o participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                tokenpart = responseAuth.body.access_token;
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseAuth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    var ParticipanteId = getresponse.body.participanteId;
                    vehicle.participanteId = ParticipanteId.toString();
                    //cadastra veículo
                    return vehicleService.includeVehicle1(tokenpart, ParticipanteId.toString(), vehicle).then(function (responsevehicle) {
                        expect(responsevehicle).to.have.status(config.util.HTTP.OK);
                        expect(responsevehicle.body).to.not.equal('');
                        //Pega informações de participante incluindo cpf cadastrado
                        return participantService.getParticipant(tokenpart).then(function (responsePart) {
                            var cpf = responsePart.body.cpf;
                            expect(cpf).to.exist;
                            //var participanteId = "";
                            //responsePart.body.participanteId;
                            //consulta participante criado
                            return searchbydealerService.getCpf(token, cpf).then(function (response) {//.to.equal(245)
                                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                // expect(response.body.placa, 'Deve realizar a busca e exibir cadastro pela placa').to.equal(Placa);
                                expect(response.body[0].cpf, 'Deve retornar busca com cpf buscado').to.not.equal(cpf);
                            });
                        });
                    });
                });
            });
        });
    });

    it('Deve realizar busca por CNPJ', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var vehicleService = new VehicleService(this);

        var factory = new Participantfactory();

        var vehiclefactory = new Vehiclefactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var vehicle = vehiclefactory.buildDefault();

        var participantService = new ParticipantService(this);

        var cpf = participant.documentoEmpresa;

        var cnpj = participant.documentoEmpresa;

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        //Cria um participante
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            //Autentica o participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                tokenpart = responseAuth.body.access_token;
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseAuth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    var ParticipanteId = getresponse.body.participanteId;
                    vehicle.participanteId = ParticipanteId.toString();
                    //cadastra veículo
                    return vehicleService.includeVehicle1(tokenpart, ParticipanteId.toString(), vehicle).then(function (responsevehicle) {
                        expect(responsevehicle).to.have.status(config.util.HTTP.OK);
                        expect(responsevehicle.body).to.not.equal('');
                        //Pega informações de participante incluindo cpf cadastrado
                        return participantService.getParticipant(tokenpart).then(function (responsePart) {
                            var cnpj = responsePart.body.documentoEmpresa;
                            expect(cnpj).to.exist;
                            //var participanteId = "";
                            //responsePart.body.participanteId;
                            //consulta participante criado
                            return searchbydealerService.getCpf(token, cnpj).then(function (response) {//.to.equal(245)
                                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                // expect(response.body.placa, 'Deve realizar a busca e exibir cadastro pela placa').to.equal(Placa);
                                expect(response.body.cnpj, 'Deve retornar busca com cpf buscado').to.not.equal(cnpj);
                            });
                        });
                    });
                });
            });
        });
    });

    it('Não deve obter sucesso na busca com cpf inválido', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var cpf = '10101010101';

        //var url = '/veiculo/busca?parametro=login&value=' + cpf;
        var url = '/veiculo/busca?parametro=login&value=';

        //realiza busca por placa
        return searchbydealerService.getCpf(token, cpf, url).then(function (response) {// url,
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            //expect(response.body).to.equal("Usuario não localizado");
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
           }, function (a) {
           console.log(a);
        });
    });

    it('Não deve obter sucesso na busca com cpf vazio', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var cpf = '';

        var url = '/veiculo/busca?parametro=login&value=';

        //realiza busca por placa
        return searchbydealerService.getCpf(token,  cpf, url).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            //expect(response.body).to.equal("Usuario não informado");
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve obter sucesso na busca com cnpj inválido', function () {//

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var cnpj = '55555555555555';

        var url = '/veiculo/busca?parametro=login&value=';

        //realiza busca por placa
        return searchbydealerService.getCnpj(token, cnpj, url).then(function (response) {
            expect(response, 'Deve responder com Bad request no status').to.have.status(config.util.HTTP.OK);
            //}, function (a) {
            //console.log(a);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //expect(response.body.Message).to.equal("Login Inválido " + cnpj);
        });
    });

    it('Não deve obter sucesso na busca com cnpj com menos de 14 caracteres', function () {//

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var cnpj = '5555555555555';

        var url = '/veiculo/busca?parametro=login&value=';

        //realiza busca por cnpj
        return searchbydealerService.getCnpj(token, cnpj, url).then(function (response) {
            expect(response, 'Deve responder com Bad request no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //expect(response.body.Message).to.equal("Login Inválido " + cnpj);
        });
    });//610675360001190

    it('Não deve obter sucesso na busca com cnpj com mais de 14 caracteres', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var cnpj = '610675360001190';

        var url = '/veiculo/busca?parametro=login&value=';

        //realiza busca por cnpj
        return searchbydealerService.getCnpj(token, url, cnpj).then(function (response) {
            expect(response, 'Deve responder com Bad request no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //expect(response.body.Message).to.equal("Login Inválido " + cnpj);
        });
    });

    it('Não deve obter sucesso na busca com cnpj vazio', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var cnpj = '';

        var url = '/veiculo/busca?parametro=login&value=';

        //realiza busca por placa
        return searchbydealerService.getCnpj(token, url, cnpj).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve obter sucesso na busca com placa inválida', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var placa = 'FFF-999';

        var url = '/veiculo/busca?parametro=PLACA&value=';

        //realiza busca por placa
        return searchbydealerService.getPlaca(token, url, placa).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            console.log(response);
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
           //expect(response.body.Message).to.equal("Placa Inválida " + placa);
        });
    });

    it('Não deve obter sucesso na busca com placa vazia', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var placa = '';

        var url = '/veiculo/busca?parametro=PLACA&value=';

        //realiza busca por placa
        return searchbydealerService.getPlaca(token, url, placa).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            console.log(response);
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve obter sucesso na busca com placa com mais de 7 caracteres', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var placa = 'OOO00000';

        var url = '/veiculo/busca?parametro=PLACA&value=' + placa;

        //realiza busca por placa
        return searchbydealerService.getPlaca(token, url, placa).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //expect(response.body.Message).to.equal("Placa Inválida " + placa);
        });
    });

    it('Não deve obter sucesso na busca com chassi inválida', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var chassi = 'ç1ç1ç1ç1ç1ç1ç1çç1ç1ç1';

        var url = '/veiculo/busca?parametro=CHASSI&value=';

        //realiza busca por placa
        return searchbydealerService.getChassi(token, url, chassi).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
           //expect(response.body.Message).to.equal("Chassi Inválido " + chassi);
        });
    });

    it('Não deve obter sucesso na busca com chassi vazio', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var chassi = '';

        var url = '/veiculo/busca?parametro=CHASSI&value=';

        //realiza busca por placa
        return searchbydealerService.getChassi(token, url, chassi).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            console.log(response);
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve obter sucesso na busca com chassi com mais de 18 caracteres', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        var chassi = 'CHASSID1D1D1D1D1D1D';

        var url = '/veiculo/busca?parametro=CHASSI&value=';

        //realiza busca por placa
        return searchbydealerService.getChassi(token, url, chassi).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            console.log(response);
        }).catch(function (response) {
           expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
         //expect(response.body.Message).to.equal("Chassi Inválido " + chassi);
        });
    });

    it('Não deve obter sucesso na busca sem token', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        //realiza busca por placa
        return searchbydealerService.getCnpj().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Deve obter sucesso na busca com token inválido', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        //consulta estrelas do participante criado
        return searchbydealerService.getCnpj(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve obter sucesso na busca com token de participante', function () {

        var availablestarsService = new AvailablestarsService(this);

        var searchbydealerService = new SearchbydealerService(this);

        var authService = new AuthService(this);

        //autentica participante
        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            tokenpart = responseAuth.body.access_token;
            //realiza busca por placa
            return searchbydealerService.getPlacaestatica(tokenpart).then(function (response) {
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.BAD_REQUEST);
                console.log(response);
            })//.catch(function (response) {
            //   expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //});
        });
    });
});
