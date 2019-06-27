'use strict';

var RaffleService = require('../services/raffleService');
var AuthService = require('../services/authService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
let Database = require('../database/database');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var token;
var client_Id = 1;
//var participanteId


describe('Testes na Api de retorno dados de sorteio', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    xit('Deve obter retorno e acesso a informações de participantes Motorista autônomo do sorteio', function () {

        // Insertcupom = new Database(this)

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        //var cupom = await Insertcupom.queryUpdatecupominsertion();

        participant.funcaoParticipante = "54786C70-B31D-4156-B1EC-46693636C307",
            participant.funcaoParticipanteDetalhe = "54786C70-B31D-4156-B1EC-46693636C307",
            participant.documentoParticipante = new Date().getTime().toString(),
            //participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Motorista autônomo 1"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante que possui o cupom').to.eq(response.body[i].DocumentoParticipante);
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
                        });
                    });
                });
            });
        });
    });

    xit('Deve obter retorno e acesso a informações de participantes Frota proprietário do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.funcaoParticipanteDetalhe = "5945342B-CCE1-4EB8-97EE-9355A2D09337",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Frota representante legal do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "ED46B925-DC54-43E9-A3DC-8EEFBEA3577C",
            participant.funcaoParticipanteDetalhe = "ED46B925-DC54-43E9-A3DC-8EEFBEA3577C",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Frota almoxarifado do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.funcaoParticipanteDetalhe = "81FE735C-D2B4-4706-A33E-77DB67830B57",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Frota Gestor de frota do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "778261CE-A850-4F39-95CB-F0BD630AE6BC",
            participant.funcaoParticipanteDetalhe = "778261CE-A850-4F39-95CB-F0BD630AE6BC",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Frota Gestor de manutenção do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "A25F81B5-6385-49FD-8DF0-8A2C6315490A",
            participant.funcaoParticipanteDetalhe = "A25F81B5-6385-49FD-8DF0-8A2C6315490A",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Frota motorista do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "99261002-2617-4C67-824B-CC6F234D7E18",
            participant.funcaoParticipanteDetalhe = "99261002-2617-4C67-824B-CC6F234D7E18",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Frota outros do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "5E3AF20B-5545-4F0A-8D8F-D218E21B67CE",
            participant.funcaoParticipanteDetalhe = "5E3AF20B-5545-4F0A-8D8F-D218E21B67CE",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Oficina proprietário do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.funcaoParticipanteDetalhe = "54F7D870-BE1A-46AC-BAAA-2073C524E718",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Oficina representante legal do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "DE5D8249-93BC-4046-A03B-A78D67C4E915",
            participant.funcaoParticipanteDetalhe = "DE5D8249-93BC-4046-A03B-A78D67C4E915",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Oficina comprador do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "31FA37DE-1C15-4C68-B068-66B361F5A731",
            participant.funcaoParticipanteDetalhe = "31FA37DE-1C15-4C68-B068-66B361F5A731",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Oficina gerente do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "31FA37DE-1C15-4C68-B068-66B361F5A731",
            participant.funcaoParticipanteDetalhe = "31FA37DE-1C15-4C68-B068-66B361F5A731",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Oficina mecânico do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "7F10233D-F450-4224-9A95-EC5EC9FAA99D",
            participant.funcaoParticipanteDetalhe = "7F10233D-F450-4224-9A95-EC5EC9FAA99D",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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

    xit('Deve obter retorno e acesso a informações de participantes Oficina outros do sorteio', function () {

        var factory = new Participantfactory();

        var currentdate = new Date();

        var participant = factory.buildDefault();

        var raffleService = new RaffleService(this);

        var participantService = new ParticipantService(this);

        var database = new Database();

        participant.funcaoParticipante = "01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0",
            participant.funcaoParticipanteDetalhe = "01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0",
            participant.documentoParticipante = new Date().getTime().toString(),
            participant.documentoEmpresa = new Date().getTime().toString(),
            participant.nome = "Frota proprietário"
        participant.client_Id = client_Id

        var authService = new AuthService(this);

        //cria cadastro do participante com termo de aceite no sorteio aceito
        return participantService.createParticipant(participant).then(function (responseCreate) {
            expect(responseCreate, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(responseCreate.body).to.exist;
            //Deve logar com usuário criado
            return authService.authParticipant(participant.documentoParticipante, participant.senha, participant.client_Id).then(function (responseauth) {
                expect(responseauth).to.have.status(config.util.HTTP.OK);
                expect(responseauth.body.access_token).to.not.equal('');
                //recebe participante ID de cadastro do participante criado
                return participantService.getParticipant(responseauth.body.access_token).then(function (getresponse) {
                    expect(getresponse, 'Deve retornar status 200 ao retornar participante criado').to.have.status(config.util.HTTP.OK);
                    expect(getresponse.body.participanteId).to.exist;
                    //adiciona cupom ao participante criado
                    //participanteId = getresponse.body.participanteId;
                    return database.adicionaCupom(getresponse.body.participanteId).then(function () {
                        return database.consultaCupom(getresponse.body.participanteId).then(function () {
                            return database.aceiteRegulamento(getresponse.body.participanteId).then(function () {
                                return database.relatorioSorteio().then(function () {
                                    return database.acompanhamentoSorteio().then(function () {
                                        //var informacoesParticipantes = await consulta.adicionaCupom(config.participante)
                                        //var informacoesParticipantes = consulta.adicionaCupom(participanteId)
                                        //console.log(informacoesParticipantes);
                                        //consulta o participante criado na api de sorteio
                                        return raffleService.getraffle(token).then(function (response) {
                                            expect(response, 'Deve retornar status 200 ao retornar participante criado anteriormente').to.have.status(config.util.HTTP.OK);
                                            for (var i = response.body.length - 1; i >= 0; i--) {
                                                //console.log(response.body[i].razaoSocial)
                                                if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
                                                    console.log(response.body[i].DocumentoParticipante)
                                                    expect(participant.documentoParticipante, 'Deve retornar participante criado').to.eq(response.body[i].DocumentoParticipante);
                                                    break
                                                } else {
                                                    if (i === 0) {
                                                        throw Error('Participante criado não localizado');
                                                    }
                                                }
                                            }
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




