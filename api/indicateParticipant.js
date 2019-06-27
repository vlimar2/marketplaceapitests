'use strict';

var AuthService = require('../services/authService');
var IndicateparticipantService = require('../services/indicateparticipantService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
//var i

//for (i = 0; i < 1; i++) { 

    describe('Testes na Api de Indicação de participante a partir de dealer porte P', function () {
        
            before('setup', function () {
                var authService = new AuthService(this);
        
                return authService.authParticipantdealer(config.DEALERSALESPUSERNAME, config.DEALERSALESPPASS, config.DEALERSALESCLIENT_ID).then(function (response) {
                    token = response.body.access_token;
                });
            });
        
            it('Deve realizar uma indicação de proprietário de frota', function () {
        
                var indicateparticipantService = new IndicateparticipantService(this);
        
                var factory = new Participantfactory();
                
                var participant = factory.buildDefault();
                
                var authService = new AuthService(this);
        
                var participantService = new ParticipantService(this);
        
                participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
                participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
                participant.documentoParticipante = new Date().getTime().toString(),
                participant.documentoEmpresa = indicateparticipantService.cnpjindicateproprietario()
                participant.nome = "Frota proprietário"
                var client_Id = 1
            
                //cria uma indicação de cliente proprietário de frota
                return indicateparticipantService.createindicateproprietario(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao indicar participante').to.have.status(config.util.HTTP.OK);
                    expect(response.body).to.equal("Indicação realizada com sucesso!");
                    //cria um participante proprietário de frota a partir da indicação
                    return participantService.createParticipant(participant).then(function (responseCreate) {
                        expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                        expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                        //Autentica o participante
                        //return authService.authParticipant(participant.documentoParticipante, participant.senha, client_Id).then(function (response) {
                           // expect(response).to.have.status(config.util.HTTP.OK);
                          //  expect(response.body.access_token).to.not.equal('');
                        //});    
                    });
                });
            });
        
            it('Deve realizar uma indicação de motorista autônomo', function () {
                
                var indicateparticipantService = new IndicateparticipantService(this);
        
                var factory = new Participantfactory();
                
                var participant = factory.buildDefault();
                
                var authService = new AuthService(this);
        
                var participantService = new ParticipantService(this);
        
                participant.funcaoParticipante = "54786C70-B31D-4156-B1EC-46693636C307",
                participant.funcaoParticipanteDetalhe = "54786C70-B31D-4156-B1EC-46693636C307",
                participant.documentoParticipante = new Date().getTime().toString(),
                participant.documentoEmpresa = indicateparticipantService.cpfindicatemotautonomo(),
                participant.nome = "Motorista autônomo"
                participant.client_Id = 1
                
                //cria uma indicação de cliente motorista autonomo
                return indicateparticipantService.createindicatemotoristaautonomo(token).then(function (response, indicate) {
                    expect(response, 'Deve retornar status 200 ao indicar participante').to.have.status(config.util.HTTP.OK);
                    expect(response.body).to.equal("Indicação realizada com sucesso!");
                    return participantService.createParticipant(participant).then(function (responseCreate) {
                        expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                        expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                        //Autentica o participante
                        //return authService.authParticipant(participant.documentoParticipante, participant.senha, client_Id).then(function (response) {
                           // expect(response).to.have.status(config.util.HTTP.OK);
                          //  expect(response.body.access_token).to.not.equal('');
                        //});    
                    });      
                });
            });
        
    }); 
//}

//var i;
//for (i = 0; i < 400; i++) { 
    describe('Testes na Api de Indicação de participante a partir de dealer porte M', function () {
        
            before('setup', function () {
                var authService = new AuthService(this);
        
                return authService.authParticipantdealer(config.DEALERSALESMUSERNAME, config.DEALERSALESMPASS, config.DEALERSALESCLIENT_ID).then(function (response) {
                    token = response.body.access_token;
        
                });
            });
        
            it('Deve realizar uma indicação de proprietário de frota', function () {
        
                var indicateparticipantService = new IndicateparticipantService(this);
        
                var factory = new Participantfactory();
                
                var participant = factory.buildDefault();
                
                var authService = new AuthService(this);
        
                var participantService = new ParticipantService(this);
        
                participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
                participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
                participant.documentoParticipante = new Date().getTime().toString(),
                participant.documentoEmpresa = indicateparticipantService.cnpjindicateproprietario()
                participant.nome = "Frota proprietário"
                var client_Id = 1
            
                //cria uma indicação de cliente proprietário de frota
                return indicateparticipantService.createindicateproprietario(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao indicar participante').to.have.status(config.util.HTTP.OK);
                    expect(response.body).to.equal("Indicação realizada com sucesso!");
                    //cria um participante proprietário de frota a partir da indicação
                    return participantService.createParticipant(participant).then(function (responseCreate) {
                        expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                        expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                        //Autentica o participante
                        //return authService.authParticipant(participant.documentoParticipante, participant.senha, client_Id).then(function (response) {
                           // expect(response).to.have.status(config.util.HTTP.OK);
                          //  expect(response.body.access_token).to.not.equal('');
                        //});    
                    });
                });
            });
        
            it('Deve realizar uma indicação de motorista autônomo', function () {
                
                var indicateparticipantService = new IndicateparticipantService(this);
        
                var factory = new Participantfactory();
                
                var participant = factory.buildDefault();
                
                var authService = new AuthService(this);
        
                var participantService = new ParticipantService(this);
        
                participant.funcaoParticipante = "54786C70-B31D-4156-B1EC-46693636C307",
                participant.funcaoParticipanteDetalhe = "54786C70-B31D-4156-B1EC-46693636C307",
                participant.documentoParticipante = new Date().getTime().toString(),
                participant.documentoEmpresa = indicateparticipantService.cpfindicatemotautonomo(),
                participant.nome = "Motorista autônomo"
                participant.client_Id = 1
                
                //cria uma indicação de cliente motorista autonomo
                return indicateparticipantService.createindicatemotoristaautonomo(token).then(function (response, indicate) {
                    expect(response, 'Deve retornar status 200 ao indicar participante').to.have.status(config.util.HTTP.OK);
                    expect(response.body).to.equal("Indicação realizada com sucesso!");
                    return participantService.createParticipant(participant).then(function (responseCreate) {
                        expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                        expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                        //Autentica o participante
                        //return authService.authParticipant(participant.documentoParticipante, participant.senha, client_Id).then(function (response) {
                           // expect(response).to.have.status(config.util.HTTP.OK);
                          //  expect(response.body.access_token).to.not.equal('');
                        //});    
                    });      
                });
            });
        
    }); 
//}

//var i;
//for (i = 0; i < 170; i++) { 
    describe('Testes na Api de Indicação de participante a partir de dealer porte G', function () {
        
            before('setup', function () {
                var authService = new AuthService(this);
        
                return authService.authParticipantdealer(config.DEALERSALESGUSERNAME, config.DEALERSALESGPASS, config.DEALERSALESCLIENT_ID).then(function (response) {
                    token = response.body.access_token;
        
                    //console.log(token);
                });
            });
        
            it('Deve realizar uma indicação de proprietário de frota', function () {
        
                var indicateparticipantService = new IndicateparticipantService(this);
        
                var factory = new Participantfactory();
                
                var participant = factory.buildDefault();
                
                var authService = new AuthService(this);
        
                var participantService = new ParticipantService(this);
        
                participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
                participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
                participant.documentoParticipante = new Date().getTime().toString(),
                participant.documentoEmpresa = indicateparticipantService.cnpjindicateproprietario()
                participant.nome = "Frota proprietário"
                var client_Id = 1
            
                //cria uma indicação de cliente proprietário de frota
                return indicateparticipantService.createindicateproprietario(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao indicar participante').to.have.status(config.util.HTTP.OK);
                    expect(response.body).to.equal("Indicação realizada com sucesso!");
                    //cria um participante proprietário de frota a partir da indicação
                    return participantService.createParticipant(participant).then(function (responseCreate) {
                        expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                        expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                        //Autentica o participante
                        //return authService.authParticipant(participant.documentoParticipante, participant.senha, client_Id).then(function (response) {
                           // expect(response).to.have.status(config.util.HTTP.OK);
                          //  expect(response.body.access_token).to.not.equal('');
                        //});    
                    });
                });
            });
        
            it('Deve realizar uma indicação de motorista autônomo', function () {
                
                var indicateparticipantService = new IndicateparticipantService(this);
        
                var factory = new Participantfactory();
                
                var participant = factory.buildDefault();
                
                var authService = new AuthService(this);
        
                var participantService = new ParticipantService(this);
        
                participant.funcaoParticipante = "54786C70-B31D-4156-B1EC-46693636C307",
                participant.funcaoParticipanteDetalhe = "54786C70-B31D-4156-B1EC-46693636C307",
                participant.documentoParticipante = new Date().getTime().toString(),
                participant.documentoEmpresa = indicateparticipantService.cpfindicatemotautonomo(),
                participant.nome = "Motorista autônomo"
                participant.client_Id = 1
                
                //cria uma indicação de cliente motorista autonomo
                return indicateparticipantService.createindicatemotoristaautonomo(token).then(function (response, indicate) {
                    expect(response, 'Deve retornar status 200 ao indicar participante').to.have.status(config.util.HTTP.OK);
                    expect(response.body).to.equal("Indicação realizada com sucesso!");
                    return participantService.createParticipant(participant).then(function (responseCreate) {
                        expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
                        expect(responseCreate.body).to.equal("Usuario criado com sucesso");
                        //Autentica o participante
                        //return authService.authParticipant(participant.documentoParticipante, participant.senha, client_Id).then(function (response) {
                           // expect(response).to.have.status(config.util.HTTP.OK);
                          //  expect(response.body.access_token).to.not.equal('');
                        //});    
                    });      
                });
            });
        
    }); 
//}

 
