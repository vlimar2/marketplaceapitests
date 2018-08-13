'use strict';

var ParticipantService = require('../services/ParticipantService')
var StoreService = require('../services/storeService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

var usertoken;

describe('Testes na Api de Lojas', function() {

    before('setup', function() {        
        var participantService = new ParticipantService(this);
        
        return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(responseuser){                
            var token = JSON.parse(responseuser.text);                
            usertoken = token.ticket.access_token;
        });        
    });

    xit('Deve obter as lojas da campanha', function(){
        var storeService = new StoreService(this);

        return storeService.getServices(usertoken,config.CATALOG_ID).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.stores, 'Deve retornar Array com lojas').to.be.a('Array');            
        });
    });

    it('Deve obter as lojas por catálogo', function(){
        var storeService = new StoreService(this);

        return storeService.getStores(usertoken, config.CATALOG_ID).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os dados da loja', function(){
        var storeService = new StoreService(this);

        return storeService.getVendorDesc(usertoken, 'zattini').then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });


});