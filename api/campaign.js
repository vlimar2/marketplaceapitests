'use strict';

var usertoken;

var CampaignService = require('../services/campaignService')
var ParticipantService = require('../services/ParticipantService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Testes na Api de Campanha', function() {

    before('setup', function() {        
        var participantService = new ParticipantService(this);
        
        return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(responseuser){                
            var token = JSON.parse(responseuser.text);                
            usertoken = token.ticket.access_token;
        });
        
    });

    it('Deve obter campanha pela Url', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCampaignbyUrl(config.credentials.url).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.id, 'Deve obter o id de campanha que corresponde a url').to.be.eql(config.CAMPAIGN_ID);
        });
    });

    it('Deve obter as campanhas pelo CPF', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCampaignsByCPF(usertoken, config.credentials.participantdocument).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve obter o id de campanha que corresponde a url').to.be.a('Array');
        });
    });

    it('Deve obter as campanhas pelo CNPJ', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCampaignsByCNPJ(usertoken, config.credentials.pjdocument).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve obter o id de campanha que corresponde a url').to.be.a('Array');
        });
    });

    it('Deve obter regulamentos da campanha', function(){
        var campaignService = new CampaignService(this);
        
        var params = {
            "campaignId":config.CAMPAIGN_ID,
            "catalogId":config.CATALOG_ID
        }        

        return campaignService.getRegulations(usertoken, params).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve retornar um array com os regulamentos').to.be.a('Array');            
            expect(response.body.length, 'Deve retornar ao menos um regulamento').to.be.above(0);            
        console.log (response.body[0].id)
        });
    });

    it('Deve obter as campanhas', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCampaigns(usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.length, 'Deve retornar Array com campanhas').to.be.above(0);
        });
    });

    it('Deve obter apenas o Id e Nome das campanhas', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCampaigns(usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.length, 'Deve retornar Array com campanhas').to.be.above(0);
        });
    });
    
    it('Deve obter os catálogos da campanha', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCampaignCatalog(usertoken, config.CAMPAIGN_ID).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os detalhes do catálogo', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCatalog(usertoken, config.CATALOG_ID).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os parâmetros do catálogo', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCatalogParameter(usertoken, config.CATALOG_ID).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os tipos de perfis do catálogo', function(){
        var campaignService = new CampaignService(this);

        return campaignService.getCatalogProfile(usertoken, config.CATALOG_ID).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

});