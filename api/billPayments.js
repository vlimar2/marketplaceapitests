'use strict';

var BillPaymentService = require('../services/billPaymentsService')
var ParticipantService = require('../services/participantService')
var CartService = require('../services/cartService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

var usertoken;
var token;

describe('Testes na Api de Pague Contas', function() {

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

    xit('Deve obter os dados do boleto', function(){
        var billPaymentService = new BillPaymentService(this);
        return billPaymentService.getBillPrice(config.bill.barcode, config.bill.vendorid, config.bill.serviceid, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.vendorId, 'Deve constar o mesmo vendorid de conta utilizado na requisição').to.be.eql(parseInt(config.bill.vendorid));
            expect(response.body.serviceId, 'Deve constar o mesmo serviceid de produto utilizado na requisição').to.be.eql(config.bill.serviceid);                
            expect(response.body.name, 'Deve constar o mesmo nome de produto utilizado na requisição').to.be.eql(config.bill.name);
            expect(response.body.quantity, 'Deve constar apenas um produto').to.be.eql(1);
            expect(response.body.costPrice,'Deve constar o mesmo nome de produto utilizado na requisição').to.be.eql(config.bill.costPrice);
            expect(response.body.sellingPrice,'Deve constar o mesmo nome de produto utilizado na requisição').to.be.eql(config.bill.sellingPrice);
        });
    });

    it('Deve impedir de obter os dados de um boleto com código de barras inválido', function(){
        var billPaymentService = new BillPaymentService(this);
        return billPaymentService.getBillPrice('123456789123456789', config.bill.vendorid, config.bill.serviceid, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Deve impedir de obter os dados de um boleto com vendorid inválido', function(){
        var billPaymentService = new BillPaymentService(this);
        return billPaymentService.getBillPrice(config.bill.barcode, '1395271', config.bill.serviceid, usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Deve impedir de obter os dados de um boleto com serviceid inválido', function(){
        var billPaymentService = new BillPaymentService(this);
        return billPaymentService.getBillPrice(config.bill.barcode, config.bill.vendorid, 'ksudfsdkhf', usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Deve impedir de obter os dados de um boleto com token inválido', function(){
        var billPaymentService = new BillPaymentService(this);
        return billPaymentService.getBillPrice(config.bill.barcode, config.bill.vendorid, config.bill.serviceid, 'dfhjksfbsdjbfb').then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Deve obter os serviços pelo vendedor', function(){
        var billPaymentService = new BillPaymentService(this);
        return billPaymentService.getServiceByVendor(usertoken, config.PRODUCTS[0].vendorid).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter os vendedores', function(){
        var billPaymentService = new BillPaymentService(this);
        return billPaymentService.GetVendors(usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });
});