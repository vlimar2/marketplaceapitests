'use strict';

var AuthService = require('../services/authService');
var BlacklistService = require('../services/blacklistService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var EnquetequestionService = require('../services/enquetequestionService');
var EnqueteanswerService = require('../services/enqueteanswerService');
var EnqueteService = require('../services/enqueteService');
var AvailablestarsService = require('../services/AvailablestarsService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var fs = require('fs');
var client_Id = 1
var Util = require('../util');
//config.createdealerportep.RazaoSocial = config.createdealerportep.RazaoSocial + moment.utc(date.getTime()).format('YYYYMMDDHHmmss')

describe('Testes na Api de geração de blacklist', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve incluir na blacklist participante teste e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

        var factory = new Participantfactory();

        var util = new Util();        

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        var cnpj = util.cnpj();

        //frota almoxarifado
        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = "",
            participant.documentoEmpresa = cnpj,           
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        var DocumentoEmpresa = participant.documentoEmpresa;

        //Usuário teste
        var blacklistId = 1;

        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            console.log(responseCreate.body);
            return authService.authParticipant(participant.documentoEmpresa, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                console.log("Usuário autenticado");
                return blacklistService.generateblist(token, blacklistId, DocumentoEmpresa).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
                    //expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
                });
            });
        });
    });

    it('Deve incluir na blacklist participante teste em lote e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

        var currentdate = new Date();

        var authService = new AuthService(this);

        var filePath = "C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Nova pasta\\nova sprint 2\\PBI88490\\ModeloParticipanteBlackList1.xlsx";
        var fileName = "ModeloParticipanteBlackList1.xlsx";//

        return blacklistService.generateblistporLote(token, filePath, fileName).then(function (response) {
            expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
        });
    });

    xit('Deve verificar se participante já existente na blacklist tipo teste não recebe pontos', function () {

        var blacklistService = new BlacklistService(this);

        var authService = new AuthService(this);

        var participantService = new ParticipantService(this);

        var enqueteService = new EnqueteService(this);

        var enquetequestionService = new EnquetequestionService(this);

        var enqueteanswerService = new EnqueteanswerService(this);

        var availablestarsService = new AvailablestarsService(this);

        var database = new Database(this);

        //Usuário de sistema
        var blacklistId = 4;

        return authService.authParticipant(config.USERNAMEBLACKLISTTESTE, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            expect(responseAuth).to.have.status(config.util.HTTP.OK);
            expect(responseAuth.body.access_token).to.not.equal('');
            var tokenpart = responseAuth.body.access_token;
            console.log("Usuário autenticado");
            //consulta participante
            return participantService.getPart(tokenpart).then(function (getres) {
                expect(getres, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                expect(getres.body.documentoParticipante).to.exist;
                var participante = getres.body.documentoParticipante
                //check status processamento batch
                return database.checkstatusprocbatch().then(function () {
                    //transacoes a serem pontuadas
                    return database.pointstransactions(participante).then(function () {
                        //atualizando transacoes para validar blacklist
                        return database.updateblacklist(participante).then(function () {
                            //tras todas as transacoes de um documento pronto para validacao
                            return database.bringtransactionsdoc(participante).then(function () {
                                //executa as validacoes se é apto a pontuar
                                return database.execscoreenable().then(function () {
                                    //tras todas as transacoes onde estao prontos a pontuar (pronto para gerar arquivo): status = 11 (não deve retornar documento da blacklist)
                                    return database.bringalltrans(participante).then(function () {
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('Deve incluir na blacklist participante concessionário e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

        var factory = new Participantfactory();

        var util = new Util(); 
        
        var cnpj = util.cnpj();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var authService = new AuthService(this);

        //frota proprietário
        participant.funcaoParticipante = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.funcaoParticipanteDetalhe = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.documentoParticipante = "",
            participant.documentoEmpresa = cnpj,
            participant.nome = "Frota comprador"
        participant.client_Id = client_Id

        var participantService = new ParticipantService(this);

        var DocumentoEmpresa = participant.documentoEmpresa;

        //Usuário concessionário
        var blacklistId = 2;

        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            console.log(responseCreate.body);
            return authService.authParticipant(participant.documentoEmpresa, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                console.log("Usuário autenticado");
                return blacklistService.generateblist(token, blacklistId, DocumentoEmpresa).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
                    //expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
                });
            });
        });
    });

    it('Deve incluir na blacklist participante concessionário em lote e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

        //var factory = new Participantfactory();

        //var currentdate = new Date();

        //var participant = factory.buildDefault();

        //var authService = new AuthService(this);

        var filePath = "C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Nova pasta\\nova sprint 2\\PBI88490\\ModeloParticipanteBlackList2.xlsx";//C:\Users\rafael.lima\Desktop\Evidências\Mercedes\Imagens
        var fileName = "ModeloParticipanteBlackList2.xlsx";//


        //participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
        //    participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
        //    participant.documentoParticipante = new Date().getTime().toString(),
        //   participant.documentoEmpresa = new Date().getTime().toString(),
        //    participant.nome = "Frota comprador"
        //participant.client_Id = client_Id

        //var participantService = new ParticipantService(this);

        //var DocumentoParticipante = participant.documentoParticipante;

        //Usuário concessionário
        //var blacklistId = 2;

        //return participantService.createParticipant(participant).then(function (responseCreate) {
        //   expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
        //   expect(responseCreate.body).to.equal("Usuario criado com sucesso");
        //   console.log(responseCreate.body);
        //   return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
        //       expect(responseAuth).to.have.status(config.util.HTTP.OK);
        //       expect(responseAuth.body.access_token).to.not.equal('');
        //       console.log("Usuário autenticado");
        return blacklistService.generateblistporLote(token, filePath, fileName).then(function (response) {
            expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
            //expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
        });
        //});
        //});
    });

    it('Deve incluir na blacklist participante fraude e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

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

        //Usuário fraude
        var blacklistId = 3;

        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            console.log(responseCreate.body);
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                console.log("Usuário autenticado");
                return blacklistService.generateblist(token, blacklistId, DocumentoParticipante).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
                    expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
                    //return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                    //    expect(responseAuth).to.have.status(config.util.HTTP.OK);
                    // }).catch(function (response) {
                    // expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
                    // });
                });
            });
        });
    });

    it('Deve incluir na blacklist participante teste fraude em lote e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

        //var factory = new Participantfactory();

        //var currentdate = new Date();

        //var participant = factory.buildDefault();

        //var authService = new AuthService(this);

        var filePath = "C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Nova pasta\\nova sprint 2\\PBI88490\\ModeloParticipanteBlackList3.xlsx";
        var fileName = "ModeloParticipanteBlackList3.xlsx";//


        //participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
        //  participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
        //  participant.documentoParticipante = new Date().getTime().toString(),
        // participant.documentoEmpresa = new Date().getTime().toString(),
        // participant.nome = "Frota comprador"
        //participant.client_Id = client_Id

        //var participantService = new ParticipantService(this);

        //var DocumentoParticipante = participant.documentoParticipante;

        //Usuário fraude
        //var blacklistId = 3;

        //return participantService.createParticipant(participant).then(function (responseCreate) {
        //  expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
        //   expect(responseCreate.body).to.equal("Usuario criado com sucesso");
        //  console.log(responseCreate.body);
        //   return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
        //     expect(responseAuth).to.have.status(config.util.HTTP.OK);
        //     expect(responseAuth.body.access_token).to.not.equal('');
        //    console.log("Usuário autenticado");
        return blacklistService.generateblistporLote(token, filePath, fileName).then(function (response) {
            expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
            //expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
        });
        //});
        //});
    });

    it('Deve incluir na blacklist participante demonstração e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

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

        //Usuário demonstração
        var blacklistId = 4;

        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.equal("Usuario criado com sucesso");
            console.log(responseCreate.body);
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
                expect(responseAuth).to.have.status(config.util.HTTP.OK);
                expect(responseAuth.body.access_token).to.not.equal('');
                console.log("Usuário autenticado");
                return blacklistService.generateblist(token, blacklistId, DocumentoParticipante).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
                    //expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
                });
            });
        });
    });

    it('Deve incluir na blacklist participante teste demonstração em lote e verificar seu registro', function () {

        var blacklistService = new BlacklistService(this);

        //var factory = new Participantfactory();

        //var currentdate = new Date();

        //var participant = factory.buildDefault();

        //var authService = new AuthService(this);

        var filePath = "C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Nova pasta\\nova sprint 2\\PBI88490\\ModeloParticipanteBlackList4.xlsx";
        var fileName = "ModeloParticipanteBlackList4.xlsx";//

        //participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
        //   participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
        //   participant.documentoParticipante = new Date().getTime().toString(),
        //   participant.documentoEmpresa = new Date().getTime().toString(),
        //    participant.nome = "Frota comprador"
        //participant.client_Id = client_Id

        //var participantService = new ParticipantService(this);

        //var DocumentoParticipante = participant.documentoParticipante;

        //Usuário demonstração
        //var blacklistId = 4;

        //return participantService.createParticipant(participant).then(function (responseCreate) {
        //   expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
        //  expect(responseCreate.body).to.equal("Usuario criado com sucesso");
        //   console.log(responseCreate.body);
        //   return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseAuth) {
        //       expect(responseAuth).to.have.status(config.util.HTTP.OK);
        //      expect(responseAuth.body.access_token).to.not.equal('');
        //      console.log("Usuário autenticado");
        return blacklistService.generateblistporLote(token, filePath, fileName).then(function (response) {
            expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
            //expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
        });
        //  });
        //});
    });

    it('Deve verificar se participante já existente na blacklist tipo demonstração não recebe estrelas', function () {

        var blacklistService = new BlacklistService(this);

        var authService = new AuthService(this);

        var participantService = new ParticipantService(this);

        var enqueteService = new EnqueteService(this);

        var enquetequestionService = new EnquetequestionService(this);

        var enqueteanswerService = new EnqueteanswerService(this);

        var availablestarsService = new AvailablestarsService(this);

        //Usuário de sistema
        var blacklistId = 4;

        return authService.authParticipant(config.USERNAMEBLACKLISTSIS, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            expect(responseAuth).to.have.status(config.util.HTTP.OK);
            expect(responseAuth.body.access_token).to.not.equal('');
            var tokenpart = responseAuth.body.access_token;
            console.log("Usuário autenticado");
            //return blacklistService.generateblist(token, blacklistId, config.USERNAMEBLACKLISTSIS).then(function (response) {
            //  expect(response, 'Deve retornar status 200 ao incluir participante na blacklist').to.have.status(config.util.HTTP.OK);
            //expect(DocumentoParticipante, 'Deve retornar participante adicionado na blacklist').to.eq(response.body.documentoParticipante);
            //cria uma enquente
            return enqueteService.createEnqueteMot(token, 'true').then(function (responseEnquete) {
                expect(responseEnquete, 'Deve retornar status 200 ao criar Enquete').to.have.status(config.util.HTTP.OK);
                expect(responseEnquete.body.enqueteId).to.exist;
                //cria a pergunta da enquete
                return enquetequestionService.createPerguntaenquete(token, responseEnquete.body.enqueteId).then(function (responsePergunta) {
                    expect(responsePergunta, 'Deve retornar status 200 ao criar pergunta para a Enquete').to.have.status(config.util.HTTP.OK);
                    //consulta todas as as perguntas da enquete
                    return enquetequestionService.searchallPerguntaenquente(token, responseEnquete.body.enqueteId).then(function (responseListallpergunta) {
                        expect(responseListallpergunta, 'Deve retornar status 200 ao realizar busca para pergunta para a Enquete').to.have.status(config.util.HTTP.OK);
                        //expect(responseQuiz.body.perguntaId).to.exist;
                        //consulta a pergunta específica da enquete
                        return enquetequestionService.searchPerguntaenquete(token, responseListallpergunta.body[0].perguntaId).then(function (responseListapergunta) {
                            expect(responseListapergunta, 'Deve retornar status 200 ao realizar busca para pergunta para a Enquete').to.have.status(config.util.HTTP.OK);
                            //cria a resposta da pergunta da enquete
                            return enqueteanswerService.createRespostaenquete(token, responseListapergunta.body.perguntaId).then(function (responseResposta) {
                                expect(responseResposta, 'Deve retornar status 200 ao criar resposta para a Enquete').to.have.status(config.util.HTTP.OK);
                                //consulta a resposta da enquete
                                return enqueteanswerService.searchRespostpertuntaenquete(token, responseListapergunta.body.perguntaId).then(function (responseListaresposta) {
                                    expect(responseListaresposta, 'Deve retornar status 200 ao realizar busca para resposta da Enquete').to.have.status(config.util.HTTP.OK);
                                    //consulta participante
                                    return participantService.getPart(tokenpart).then(function (getres) {
                                        expect(getres, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                                        expect(getres.body.participanteId).to.exist;
                                        var participante = getres.body.participanteId
                                        //acessa a enquete previamente criado
                                        return enqueteService.enqueteByfuncaopart(tokenpart).then(function (responseEnquetebyfuncao) {
                                            expect(responseEnquetebyfuncao, 'Deve retornar status 200 ao visualizar Enquete').to.have.status(config.util.HTTP.OK);
                                            expect(responseEnquetebyfuncao.body[0].Resposta[0].perguntaId).to.exist;
                                            expect(responseEnquetebyfuncao.body[0].Resposta[0].enqueteRespostaId).to.exist;
                                            expect(responseEnquetebyfuncao.body[0].enqueteId).to.exist;
                                            var resposta = responseEnquetebyfuncao.body[0].Resposta[0].enqueteRespostaId
                                            var pergunta = responseEnquetebyfuncao.body[0].Resposta[0].perguntaId
                                            var enquete = responseEnquetebyfuncao.body[0].enqueteId
                                            //responde o quiz criado
                                            return enqueteService.answerEnquete(tokenpart, participante, pergunta, resposta, enquete).then(function (resAnswerenquete) {
                                                expect(resAnswerenquete, 'Deve retornar status 200 ao visualizar quiz').to.have.status(config.util.HTTP.OK);
                                                //verifica se 50 estrelas foram adicionadas para o participante
                                                return availablestarsService.getStars(tokenpart).then(function (response) {//.to.equal(245)
                                                    expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                                    expect(response.body.response[0], 'A quantidade de estrelas deve ser 25').to.equal(75);
                                                    //inativa uma enquente
                                                    return enqueteService.createEnqueteMot(token, 'false').then(function (responseEnquete) {
                                                        expect(responseEnquete, 'Deve retornar status 200 ao criar Enquete').to.have.status(config.util.HTTP.OK);
                                                        expect(responseEnquete.body.enqueteId).to.exist;
                                                        //var valAtual = response.body.response[0];
                                                        //var myObj = { val: valAtual }
                                                        //   , addTwo = function () { myObj.val += 50; };

                                                        //expect(addTwo).to.increase(myObj, 'val').by(50); // Recommended
                                                        // expect(addTwo).to.increase(myObj, 'val'); // N
                                                        //deleta a enquete
                                                        // return enqueteService.deleteenquete(token, responseEnquete.body.enqueteId).then(function (responseDelete) {
                                                        //     expect(responseDelete, 'Deve retornar status 200 ao deletar Enquete').to.have.status(config.util.HTTP.OK);
                                                        //    expect(responseDelete.body).to.equal("Enquete deletado com sucesso.");
                                                        //  });
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
            })
            //});
        });
    });

    it('Não deve incluir participante na blacklist sem token', function () {

        var blacklistService = new BlacklistService(this);

        return blacklistService.generateblist().then(function (response) {
            expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve retornar busca de participante com token inválido', function () {

        var blacklistService = new BlacklistService(this);

        var authService = new AuthService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V"

        return blacklistService.generateblist(token).then(function (response) {
            expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Não deve retornar busca de participante com token de participante', function () {

        var blacklistService = new BlacklistService(this);

        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return blacklistService.generateblist(token).then(function (response) {
                expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
            }).catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
            });
        });
    });

    it('Não deve retornar busca de participante com login (documento) inválido', function () {

        var blacklistService = new BlacklistService(this);

        var authService = new AuthService(this);

        var DocumentoParticipante = "00000000000";

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (responseAuth) {
            token = responseAuth.body.access_token;
            return blacklistService.generateblist(token, DocumentoParticipante).then(function (response) {
                expect(response, 'Deve retornar status 401 ao gerar lista de participantes').to.have.status(config.util.HTTP.OK);
            }).catch(function (response) {
                expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            });
        });
    });
});

