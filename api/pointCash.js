'use strict';

var PointCashService = require('../services/pointCashService')
var CartService = require('../services/CartService')
var ParticipantService = require('../services/ParticipantService')
var Addressfactory = require('../factories/addressfactory')


var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

var token;
var usertoken;

describe('Testes na Api de Pontos + Cash', function() {

    before('setup', function() {        
        var participantService = new ParticipantService(this);
            
        
        return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(responseuser){                
            var token = JSON.parse(responseuser.text);                
            usertoken = token.ticket.access_token;
        });        
    });

    it('Validar que o carrinho está vazio', function(){
        var pointCashService = new PointCashService(this);
        return pointCashService.getPointCash(config.card_info.cardBrandId, config.card_info.cardExpirationMonthDate, config.card_info.cardExpirationYearDate, config.card_info.cardNumber, config.card_info.catalogId, config.card_info.nameOfCardHolder, config.card_info.parcels, config.card_info.pointsCash, config.card_info.securityCode, usertoken).then(function(response){
            expect(response.response.body.messages[0].description).to.be.eql('Operadora do cartão se encontra indisponível, por favor tente novamente mais tarde.');        
            }).catch(function(response){
                expect(response.response.body.messages[0].description).to.be.eql('Problemas internos.: O carrinho está vazio.');     
        });;
    });

 
        
    it('Deve impedir de obter os dados de um cartão com token inválido', function(){
        var pointCashService = new PointCashService(this);
        return pointCashService.getPointCash(config.card_info.cardBrandId, config.card_info.cardExpirationMonthDate, config.card_info.cardExpirationYearDate, config.card_info.cardNumber, config.card_info.catalogId, config.card_info.nameOfCardHolder, config.card_info.parcels, config.card_info.pointsCash, config.card_info.securityCode, 'dfhjksfbsdjbfb').then(function(response){
                expect(response, 'Deve responder com UNAUTHORIZED no status').to.have.status(config.util.HTTP.UNAUTHORIZED);
        }).catch(function(response) {
               expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);   
        });
    });
});