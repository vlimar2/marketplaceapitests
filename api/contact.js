'use strict';

var usertoken;

var ContactService = require('../services/contactService')
var ParticipantService = require('../services/ParticipantService')
var Participantfactory = require('../factories/participantfactory')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Testes na Api de Fale Conosco', function() {

    before('setup', function() {        
        var participantService = new ParticipantService(this);
        
        return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(responseuser){                
            var token = JSON.parse(responseuser.text);                
            usertoken = token.ticket.access_token;
        });
        
    });

    it('Deve enviar uma mensagem de fale conosco', function(){
        var factory = new Participantfactory();
        var contactService = new ContactService(this);
        var participant = factory.buildDefault();

        return contactService.postContact(usertoken, participant).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os detalhes da campanha', function(){
        var factory = new Participantfactory();
        var contactService = new ContactService(this);
        var participant = factory.buildDefault();

        return contactService.getCatalogConfig(usertoken, config.CATALOG_ID).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });
});