'use strict';

var RechargeService = require('../services/rechargeService')
var ParticipantService = require('../services/participantService')
var CartService = require('../services/cartService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

var usertoken;
var token;

describe('Testes na Api de Recarga de Celular', function() {

    before('setup', function() {    
        var participantService = new ParticipantService(this);
        var cartservice = new CartService(this);
        
            return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url, token).then(function(responseuser){                
                var token = JSON.parse(responseuser.text);                
                usertoken = token.ticket.access_token;

                return cartservice.clearCart(usertoken).then(function(){
                    console.log('Produtos excluídos com sucesso');
            });
        });        
    });

    it('Deve obter os DDDs da operadora Claro', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getOperatorDDD(config.mobile_operator[0].operator, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os DDDs da operadora Vivo', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getOperatorDDD(config.mobile_operator[1].operator, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os DDDs da operadora Tim', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getOperatorDDD(config.mobile_operator[2].operator, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os DDDs da operadora Oi', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getOperatorDDD(config.mobile_operator[3].operator, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os DDDs da operadora Nextel', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getOperatorDDD(config.mobile_operator[4].operator, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve impedir de obter os DDDs de uma operadora inválida', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getOperatorDDD('kfjsd', usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Deve impedir de obter os DDDs com um token inválido', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getOperatorDDD(config.mobile_operator[4].operator, 'khbgdfbjfd').then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Deve obter os valores de recarga da operadora Claro', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge(config.mobile_operator[0].operator, config.mobile_prefix[0].ddd, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os valores de recarga da operadora Vivo', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge(config.mobile_operator[1].operator, config.mobile_prefix[1].ddd, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os valores de recarga da operadora Tim', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge(config.mobile_operator[2].operator, config.mobile_prefix[2].ddd, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os valores de recarga da operadora Oi', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge(config.mobile_operator[3].operator, config.mobile_prefix[0].ddd, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os valores de recarga da operadora Nextel', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge(config.mobile_operator[4].operator, config.mobile_prefix[1].ddd, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve impedir de obter os valores de recarga de uma operadora inválida', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge('kfjsd', config.mobile_prefix[1].ddd, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Deve impedir de obter os valores de recarga com um DDD inválido', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge(config.mobile_operator[2].operator, 'jhvjvhkvkhv', usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Deve impedir de obter os valores de recarga com um token inválido', function(){
        var rechargeService = new RechargeService(this);
        return rechargeService.getValuesRecharge(config.mobile_operator[1].operator, config.mobile_prefix[1].ddd, 'khbgdfbjfd').then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });
});