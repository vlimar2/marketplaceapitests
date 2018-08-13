'use strict';

var usertoken;

var AuthAdminService = require('../services/authAdminService');
var MarkupService = require('../services/markupService');
var ParticipantService = require('../services/ParticipantService');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('Testes na Api de Markup', function() {
    before('setup', function() {        
        var authAdminService = new AuthAdminService(this);
        return authAdminService.authClient(config.util.TOKEN_ADMIN_HEADER)
        .then(function(response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.error).to.equal(false);
            expect(response.body.access_token).to.not.equal('');
            usertoken = response.body.access_token;
        });
    });

    it('Deve obter Margens pela Url', function(){
        console.log(usertoken);
        var markupService = new MarkupService(this);
        return markupService.getMarkupbyUrl(usertoken)
        .then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.error).to.equal(false);
            console.log(response);
        });
    });

    xit('Deve obter margens da campanha', function(){
        var MarkupService = new MarkupService(this);
        
        var params = {
            "campaignId":config.CAMPAIGN_ID,
            "catalogId":config.CATALOG_ID
        }        

        return markupService.getMargins(usertoken, params).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve retornar um array com as margens').to.be.a('Array');            
            expect(response.body.length, 'Deve retornar ao menos uma margem').to.be.above(0);            
        console.log (response.body[0].id)
        });
    });

});