'use strict';

var AuthService = require('../services/authService');
var ReplycontactusService = require('../services/replycontactusService');
var ContactusloggedService = require('../services/contactusloggedService');
var Contactfactory = require('../factories/contactfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var client_Id = 1

describe('Testes na Api de resposta de fale conosco', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve criar um fale conosco e administrador deve respondê-lo', function () {

        var replycontactusService = new ReplycontactusService(this);

        var authService = new AuthService(this);

        var factory = new Contactfactory();

        var contact = factory.buildDefault();

        var contactusloggedService = new ContactusloggedService(this);

        //loga como participante
        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.body.access_token).to.not.equal('');
            //cria um fale conosco
            return contactusloggedService.getContactus(token, contact).then(function (responseContact) {
                expect(responseContact, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
                expect(responseContact.body.FaleConoscoId).to.exist;
                //verificar se está na lista de chamados abertos (status 1)
                return replycontactusService.listopenContactUs(token).then(function (responseListcontacts) {
                    expect(responseListcontacts, 'Deve retornar status 200 ao listar contatos realizados pelo fale conosco').to.have.status(config.util.HTTP.OK);
                    for (var i = response.body.length - 1; i >= 0; i--) {
                        //console.log(response.body[i].razaoSocial)
                        if (responseContact.body.FaleConoscoId === responseContact.body[i].id) {
                            console.log(response.body[i].id)
                            expect(responseContact.body.FaleConoscoId, 'Deve retornar fale conosco criado').to.eq(responseContact.body[i].id);
                            break
                        } else {
                            if (i === 0) {
                                throw Error('Fale conosco criado não localizado');
                            }
                        }
                    }
                    //responde fale conosco
                    return replycontactusService.replycontact(token, responseContact.body.FaleConoscoId).then(function (responseReply) {
                        expect(responseReply, 'Deve retornar status 200 ao responder fale conosco criado').to.have.status(config.util.HTTP.OK);
                        //finaliza fale conosco
                        return replycontactusService.finishcontact(token, responseContact.body.FaleConoscoId).then(function (responseFinish) {
                            expect(responseFinish, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
                            expect(responseFinish.body).to.equal("Fale Conosco Finalizado");
                            //verificar se está na lista de chamados abertos (status 2)
                            return replycontactusService.listcloseContactUs(token).then(function (responseListclosecontacts) {
                                expect(responseListclosecontacts, 'Deve retornar status 200 ao listar contatos realizados pelo fale conosco').to.have.status(config.util.HTTP.OK);
                                for (var i = response.body.length - 1; i >= 0; i--) {
                                    //console.log(response.body[i].razaoSocial)
                                    if (responseContact.body.FaleConoscoId === response.body[i].id) {
                                        console.log(response.body[i].id)
                                        expect(responseContact.body.FaleConoscoId, 'Deve retornar fale conosco fechado').to.eq(responseContact.body[i].id);
                                        break
                                    } else {
                                        if (i === 0) {
                                            throw Error('Fale conosco fechado não localizado');
                                        }
                                    }
                                }
                            });
                        });
                    })
                });
            });
        });
    });

    it('Não deve responder um fale conosco sem token', function () {

        var replycontactusService = new ReplycontactusService(this);

        var authService = new AuthService(this);

        //responde fale conosco
        return replycontactusService.replycontact().then(function (responseReply) {
            expect(responseReply, 'Deve retornar status 401 ao tentar responder fale conosco criado').to.have.status(config.util.HTTP.UNAUTHORIZED);
        })/*.catch(function (responseReply) {
            expect(responseReply).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });*/
    });

    it('Não deve responder um fale conosco com token inválido', function () {

        var replycontactusService = new ReplycontactusService(this);

        var authService = new AuthService(this);

        token = "P0a-5oIt_sRyfDIupOOk3d2GvQK2kYmPE7AdXj8tM6eK9kOVOWo44wWMO5cUFS8PBZEXRJl_-N44iqo_i6mCS_GGW43U";

        //responde fale conosco
        return replycontactusService.replycontact().then(function (responseReply) {
            expect(responseReply, 'Deve retornar status 401 ao tentar responder fale conosco criado').to.have.status(config.util.HTTP.UNAUTHORIZED);
        })/*.catch(function (responseReply) {
                    expect(responseReply).to.have.status(config.util.HTTP.UNAUTHORIZED);
                });*/
    });

    it('Não deve responder um fale conosco com token de participante', function () {

        var replycontactusService = new ReplycontactusService(this);

        var authService = new AuthService(this);

        //loga como participante
        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function (response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.body.access_token).to.not.equal('');
            //responde fale conosco
            return replycontactusService.replycontact(token).then(function (responseReply) {
                expect(responseReply, 'Deve retornar status 200 ao responder fale conosco criado').to.have.status(config.util.HTTP.OK);
            });
        });
    });
});

   //finaliza fale conosco
          /*  return replycontactusService.finishcontact(responseContact.body.FaleConoscoId).then(function (responseFinish) {
                expect(responseFinish, 'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
                expect(responseFinish.body).to.equal("Fale Conosco Finalizado");
                //lista fale conosco
                return replycontactusService.listContactUs(token).then(function (responseListcontacts) {
                     expect(responseListcontacts, 'Deve retornar status 200 ao listar contatos realizados pelo fale conosco').to.have.status(config.util.HTTP.OK);
                 });
            });*/