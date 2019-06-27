'use strict';

var AuthService = require('../services/authService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var Util = require('../util');
var chai = require('chai')
let Database = require('../database/database')
var assert = chai.assert
var expect = chai.expect
var client_Id = 1
var tokenpart
//let Database = require('../database/database');

this.util = new Util();

describe('Testes na Api de criação de participante', function () {


    it('Deve criar um participante com perfil Frota proprietário', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            console.log( participant.documentoParticipante);
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                tokenpart = response.body.access_token;
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Frota representante legal', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "ED46B925-DC54-43E9-A3DC-8EEFBEA3577C",
            participant.funcaoParticipanteDetalhe = "ED46B925-DC54-43E9-A3DC-8EEFBEA3577C",
            participant.documentoParticipante = new Date().getTime().toString() + 1,
            //participant.documentoParticipante = "",
            participant.documentoEmpresa = new Date().getTime().toString() + 1,
            participant.nome = "Frota representante legal"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            console.log(participant.documentoEmpresa);
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Frota almoxarifado', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota almoxarifado"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Frota comprador', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota comprador"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Frota Gestor de frota', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "778261CE-A850-4F39-95CB-F0BD630AE6BC",
            participant.funcaoParticipanteDetalhe = "778261CE-A850-4F39-95CB-F0BD630AE6BC",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota Gestor de frota"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Frota Gestor de manutenção', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "A25F81B5-6385-49FD-8DF0-8A2C6315490A",
            participant.funcaoParticipanteDetalhe = "A25F81B5-6385-49FD-8DF0-8A2C6315490A",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota Gestor de manutenção"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Frota motorista', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "99261002-2617-4C67-824B-CC6F234D7E18",
            participant.funcaoParticipanteDetalhe = "99261002-2617-4C67-824B-CC6F234D7E18",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota motorista"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Frota outros', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "5E3AF20B-5545-4F0A-8D8F-D218E21B67CE",
            participant.funcaoParticipanteDetalhe = "5E3AF20B-5545-4F0A-8D8F-D218E21B67CE",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Frota outros"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Oficina proprietário', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.funcaoParticipanteDetalhe = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Oficina proprietário"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Oficina representante legal', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "DE5D8249-93BC-4046-A03B-A78D67C4E915",
            participant.funcaoParticipanteDetalhe = "DE5D8249-93BC-4046-A03B-A78D67C4E915",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Oficina representante legal"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Oficina comprador', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "31FA37DE-1C15-4C68-B068-66B361F5A731",
            participant.funcaoParticipanteDetalhe = "31FA37DE-1C15-4C68-B068-66B361F5A731",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Oficina comprador"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Oficina gerente', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "594C417D-3F20-452F-BA0E-AA1A44038E21",
            participant.funcaoParticipanteDetalhe = "594C417D-3F20-452F-BA0E-AA1A44038E21",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Oficina gerente"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Oficina mecânico', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "7F10233D-F450-4224-9A95-EC5EC9FAA99D",
            participant.funcaoParticipanteDetalhe = "7F10233D-F450-4224-9A95-EC5EC9FAA99D",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Oficina mecânico"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Oficina outros', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0",
            participant.funcaoParticipanteDetalhe = "01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Oficina outros"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve criar um participante com perfil Motorista autônomo', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "54786C70-B31D-4156-B1EC-46693636C307",
            participant.funcaoParticipanteDetalhe = "54786C70-B31D-4156-B1EC-46693636C307",
            participant.documentoParticipante = new Date().getTime().toString() +1,
            participant.documentoEmpresa = new Date().getTime().toString() +1,
            participant.nome = "Motorista autônomo"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
            //autentica participante
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (response) {
                expect(response).to.have.status(config.util.HTTP.OK);
                expect(response.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(tokenpart).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //verifica se a origem do cadastro é Portal Participante
                    return database.validaorigem(getresponse.body.participanteId).then(function (responsequery) {
                        expect(responsequery[0].origem).to.equal("Portal Participante");
                    });
                });
            });
        });
    });

    it('Deve cadastrar participante informando cpf com mascara', async function () {
        var participantService = new ParticipantService(this);
        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var database = new Database();

        participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57", //perfil Frota almoxarifado
            participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.documentoParticipante = await participantService.cpfParticipant()
            participant.nome = "Frota almoxarifado"
        //participant.client_Id = client_Id

        

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
        });
    });

    it('Deve cadastrar participante informando cpf sem mascara', async function () {
        var participantService = new ParticipantService(this);
        var factory = new Participantfactory();

        var participant = factory.buildDefault();

        participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57", //perfil Frota almoxarifado
            participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.documentoParticipante = await participantService.cpfParticipant()
            participant.documentoParticipante = participant.documentoParticipante.replace('.', "");
            participant.documentoParticipante = participant.documentoParticipante.replace('.', "");
            participant.documentoParticipante = participant.documentoParticipante.replace('-', "");
            participant.nome = "Frota almoxarifado"       

        //cria um participante frota proprietário
        return participantService.createParticipant(participant).then(function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
        });
    });



});