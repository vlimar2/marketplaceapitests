'use strict';

var OrderService = require('../services/orderService')
var CartService = require('../services/CartService')
var ParticipantService = require('../services/ParticipantService')
var Addressfactory = require('../factories/addressfactory')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

var token;
var usertoken;

describe('Testes na Api de Pedidos', function() {

    before('setup', function() {        
        var participantService = new ParticipantService(this);        
        
        return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(responseuser){                
            var token = JSON.parse(responseuser.text);                
            usertoken = token.ticket.access_token;
        });        
    });

    it('Deve fechar pedido com 1 produto', function(){
        var participantService = new ParticipantService(this);
        var orderService = new OrderService(this);
        var cartService = new CartService(this);
        var balance=0;
        var addressfactory = new Addressfactory();
        var address = addressfactory.buildDefault();
        var product = {"vendorId": config.PRODUCTS[0].vendorid,"ProductSkuId": config.PRODUCTS[0].sku, "Quantity":1, "Configuration":{}, "SupplierTypeId": config.PRODUCTS[0].type};
        
        return participantService.getBalance(usertoken).then(function(response){
            expect(response,'Deve obter o saldo do particpante com sucesso').to.have.status(config.util.HTTP.OK);                
            expect(response.body).to.be.a('number')        
            balance = response.body;
            return cartService.clearCart(usertoken).then(function(){        
                return cartService.AddCart(usertoken, product).then(function(responsecart){
                    expect(responsecart, 'Deve adicionar produto com sucesso no carrinho').to.have.status(config.util.HTTP.OK);
                    balance -=  responsecart.body.totalPointsPrice;
                    return cartService.AddShippingAddress(usertoken, address).then(function(responseaddress){ 
                        expect(responseaddress, 'Deve adicionar endereço com sucesso no carrinho').to.have.status(config.util.HTTP.OK);                    
                        
                        return orderService.AddOrder(usertoken).then(function(responseorder){
                            expect(responseorder, 'Deve realizar pedido com sucesso').to.have.status(config.util.HTTP.OK);
                            expect(responseorder.body.success, 'Deve retornar true no Success').to.eql(true);
                            expect(responseorder.body.orderId, 'Deve retornar id de pedido').to.be.a('number');
                            // return participantService.getBalance(usertoken).then(function(responsebalance){
                            //     expect(responsebalance,'Deve obter o saldo do particpante com sucesso').to.have.status(config.util.HTTP.OK);  
                            //     expect(responsebalance.body, 'Deve realizar o debito na conta do participante ao realizar o pedido').to.eql(balance);
                            // });
                        });
                    });
                });
            });
        });
    });

    it('Deve fechar pedido com produtos de parceiros distintos', function(){
        var participantService = new ParticipantService(this);
        var orderService = new OrderService(this);
        var cartService = new CartService(this);
        var balance=0;
        var addressfactory = new Addressfactory();
        var address = addressfactory.buildDefault();
        
        var product =   [
            {
                config:config.PRODUCTS[0],
                product:{"vendorId": config.PRODUCTS[0].vendorid,"ProductSkuId": config.PRODUCTS[0].sku, "Quantity":1, "Configuration":{}, "SupplierTypeId": config.PRODUCTS[0].type}
            },
            {   config:config.PRODUCTS[1],
                product:{"vendorId": config.PRODUCTS[1].vendorid,"ProductSkuId": config.PRODUCTS[1].sku, "Quantity":1, "Configuration":{}, "SupplierTypeId": config.PRODUCTS[1].type}
            },
            {
                config: config.PRODUCTS_VOUCHER[0],
                product:{"vendorId": config.PRODUCTS_VOUCHER[0].vendorid,"ProductSkuId": config.PRODUCTS_VOUCHER[0].sku, "Quantity":1, "Configuration":{}, "SupplierTypeId": config.PRODUCTS_VOUCHER[0].type}
            }
        ];
        
        return participantService.getBalance(usertoken).then(function(response){
            expect(response,'Deve obter o saldo do particpante com sucesso').to.have.status(config.util.HTTP.OK);                
            expect(response.body).to.be.a('number')        
            balance = response.body;
            return cartService.clearCart(usertoken).then(function(){        
                


                return cartService.AddCart(usertoken, product[0].product).then(function(responsecart){
                    expect(responsecart, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    
                    return cartService.AddCart(usertoken, product[1].product).then(function(response1){
                        expect(response1, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    
                        return cartService.AddCart(usertoken, product[2].product).then(function(response2){
                            expect(response2, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);


                            //balance -=  response2.body.totalPointsPrice;
                            return cartService.AddShippingAddress(usertoken, address).then(function(responseaddress){ 
                                expect(responseaddress, 'Deve adicionar endereço com sucesso no carrinho').to.have.status(config.util.HTTP.OK);                    
                                
                                return orderService.AddOrder(usertoken).then(function(responseorder){
                                    expect(responseorder, 'Deve realizar pedido com sucesso').to.have.status(config.util.HTTP.OK);
                                    expect(responseorder.body.success, 'Deve retornar true no Success').to.eql(true);
                                    expect(responseorder.body.orderId, 'Deve retornar id de pedido').to.be.a('number');
                                    return orderService.GetOrder(usertoken).then(function(responselist){
                                        expect(responselist,'Deve obter os resgates do usuário').to.have.status(config.util.HTTP.OK);
                                        /*balance -= responselist.body.orders[0].totalItems
                                        return participantService.getBalance(usertoken).then(function(responsebalance){
                                            expect(responsebalance,'Deve obter o saldo do particpante com sucesso').to.have.status(config.util.HTTP.OK);  
                                            expect(responsebalance.body, 'Deve realizar o debito na conta do participante ao realizar o pedido').to.eql(balance);
                                        });*/
                                    });
                                });
                           });
                        });
                    });
                });
            });
        });
    });

    it('Deve obter o Tracking de um produto', function(){
        var orderService = new OrderService(this);

        return orderService.GetOrder(usertoken).then(function(responselist){
            expect(responselist, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            return orderService.GetTracking(usertoken, responselist.body.orders[0].parentOrderId).then(function(response){
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            });
        });
    });
});