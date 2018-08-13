'use strict';

var CartService = require('../services/CartService')
var ParticipantService = require('../services/ParticipantService')
var Addressfactory = require('../factories/addressfactory')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

var usertoken;
var token;

describe('Testes na Api de Carrinho', function() {

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

    it('Deve obter o carrinho', function(){
        var cartService = new CartService(this);
        return cartService.getCart(usertoken).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve adicionar um produto no carrinho', function(){
        var cartService = new CartService(this);
        var product = {"vendorId": config.PRODUCTS[0].vendorid,"ProductSkuId": config.PRODUCTS[0].sku, "Quantity":1, "Configuration":{}, "SupplierTypeId": config.PRODUCTS[0].type};
        
        
        return cartService.clearCart(usertoken).then(function(){        
            return cartService.AddCart(usertoken, product).then(function(response){
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                expect(response.body.items.length, 'Deve acrescentar um produto no carrinho').to.be.eql(1);                
                expect(response.body.items[0].quantity, 'Deve apresentar quantidade 1 ao adicionar o produto no carrinho').to.be.eql(1);
                expect(response.body.items[0].productSkuId, 'Deve constar o mesmo sku de produto utilizado na requisição').to.be.eql(config.PRODUCTS[0].sku);
                expect(response.body.items[0].vendorId, 'Deve constar o mesmo vendorid de produto utilizado na requisição').to.be.eql(config.PRODUCTS[0].vendorid);
                expect(response.body.items[0].productName, 'Deve constar o mesmo nome de produto utilizado na requisição').to.be.eql(config.PRODUCTS[0].description);                
                expect(response.body.items[0].sellingPrice, 'Deve constar o mesmo nome de produto utilizado na requisição').to.be.eql(config.PRODUCTS[0].price.to);
                expect(response.body.items[0].defaultPrice, 'Deve constar o mesmo nome de produto utilizado na requisição').to.be.eql(config.PRODUCTS[0].price.from);
                expect(response.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após inserir produto').to.be.eql(config.PRODUCTS[0].price.to);
                
            });
        });
    });

    //Nota: Caso este caso esteja dando erro, verificar as validações de valores
    it('Deve adicionar três produtos no carrinho', function(){
        var cartService = new CartService(this);
        var productmap = [];
        
        productmap[config.PRODUCTS[0].sku] = 0;
        productmap[config.PRODUCTS[1].sku] = 1;
        productmap[config.PRODUCTS_VOUCHER[0].sku] = 2;        
        
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

                        

        return cartService.clearCart(usertoken).then(function(){        
            return cartService.AddCart(usertoken, product[0].product).then(function(response){
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                expect(response.body.items.length, 'Deve constar 1 produto no carrinho').to.be.eql(1);                
                expect(response.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após inserir primeiro produto').to.be.eql((product[0].product.Quantity * product[0].config.price.to));
                
                return cartService.AddCart(usertoken, product[1].product).then(function(response1){
                    expect(response1, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                    expect(response1.body.items.length, 'Deve constar 2 produtos no carrinho').to.be.eql(2);
                    expect(response1.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após inserir segundo produto').to.be.eql(product[0].config.price.to + product[1].config.price.to);

                    return cartService.AddCart(usertoken, product[2].product).then(function(response2){
                        expect(response2, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                        expect(response2.body.items.length, 'Deve constar 3 produtos no carrinho').to.be.eql(3);
                        expect(response2.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após inserir terceiro produto').to.be.eql((product[0].config.price.to + product[1].config.price.to + product[2].config.price.to));
                        
                        //deve encontrar os três skus de produtos que foram inseridos no carrinho
                        var exists;
                        for (let index = 0; index < product.length; index++) {
                            exists = false;
                            for (let index2 = 0; index2 < response2.body.items.length; index2++) {
                                
                                if(response2.body.items[index2].productSkuId == product[index].product.ProductSkuId)
                                {
                                    exists = true;
                                    break;  
                                }                                
                            }                            
                            expect(exists, 'Deve encontrar o sku '+product[index].product.ProductSkuId + ' no carrinho').to.be.eql(true);
                        }

                        for (let index2 = 0; index2 < response2.body.items.length; index2++) {
                            var producttocompare = product[productmap[response2.body.items[index2].productSkuId]];
                            expect(response2.body.items[index2].quantity, 'Deve apresentar quantidade 1 ao adicionar o produto no carrinho').to.be.eql(1);
                            expect(response2.body.items[index2].productSkuId, 'Deve constar o mesmo sku de produto utilizado na requisição').to.be.eql(producttocompare.config.sku);
                            expect(response2.body.items[index2].vendorId, 'Deve constar o mesmo vendorid de produto utilizado na requisição').to.be.eql(producttocompare.config.vendorid);
                            expect(response2.body.items[index2].productName, 'Deve constar o mesmo nome de produto utilizado na requisição').to.be.eql(producttocompare.config.description);
                            expect(response2.body.items[index2].sellingPrice, 'Deve obter o preço POR aplicando o fator de conversão para o produto '+producttocompare.config.description).to.be.eql(producttocompare.config.price.to);
                            expect(response2.body.items[index2].defaultPrice, 'Deve obter o preço DE aplicando o fator de conversão para o produto '+producttocompare.config.description).to.be.eql(producttocompare.config.price.from);
                        }
                    });
                });                
            });
        });
    });

    it('Deve adicionar três produtos no carrinho e remover os mesmos', function(){
        var cartService = new CartService(this);
        
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

                        

        return cartService.clearCart(usertoken).then(function(){        
            return cartService.AddCart(usertoken, product[0].product).then(function(response){
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                
                return cartService.AddCart(usertoken, product[1].product).then(function(response1){
                    expect(response1, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                
                    return cartService.AddCart(usertoken, product[2].product).then(function(response2){
                        expect(response2, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                
                        return cartService.removeCart(usertoken, product[1].product.ProductSkuId).then(function(responseremove){
                            expect(responseremove, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                            expect(responseremove.body.items.length, 'Deve constar 2 produtos no carrinho após a remoção').to.be.eql(2);
                            expect(responseremove.body.items[0].productSkuId, 'Deve conter sku diferente do sku removido no primeiro item do carrinho').to.not.be.eql(product[1].product.ProductSkuId);
                            expect(responseremove.body.items[1].productSkuId, 'Deve conter sku diferente do sku removido no segundo item do carrinho').to.not.be.eql(product[1].product.ProductSkuId);
                            expect(responseremove.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após remoção do segundo produto').to.be.eql((product[0].product.Quantity * product[0].config.price.to)+(product[2].product.Quantity * product[2].config.price.to));

                            return cartService.removeCart(usertoken, product[0].product.ProductSkuId).then(function(responseremove2){
                                expect(responseremove2, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                expect(responseremove2.body.items.length, 'Deve constar 1 produto no carrinho após a remoção').to.be.eql(1);
                                expect(responseremove2.body.items[0].productSkuId, 'Deve conter apenas o SKU que não foi removido no carrinho').to.be.eql(product[2].product.ProductSkuId);
                                expect(responseremove2.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após remoção do segundo produto').to.be.eql((product[2].product.Quantity * product[2].config.price.to));

                                return cartService.removeCart(usertoken, product[2].product.ProductSkuId).then(function(responseremove3){
                                    expect(responseremove3, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                    expect(responseremove3.body.items.length, 'Deve exibir um carrinho sem itens').to.be.eql(0);
                                    expect(responseremove3.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após remoção do terceiro produto').to.be.eql(0);
                                });
                            });
                        });
                    });
                });                
            });
        });
    });

    it('Deve adicionar três produtos no carrinho e atualizar a quantidade dos mesmos', function(){
        
        var cartService = new CartService(this);
        
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

                        
                        
        return cartService.clearCart(usertoken).then(function(){        
            return cartService.AddCart(usertoken, product[0].product).then(function(response){
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                
                return cartService.AddCart(usertoken, product[1].product).then(function(response1){
                    expect(response1, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                
                    return cartService.AddCart(usertoken, product[2].product).then(function(response2){
                        expect(response2, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                
                        product[0].product.Quantity = 2;
                        return cartService.updateCart(usertoken, product[0].product).then(function(responseupd){
                            expect(responseupd, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                            expect(responseupd.body.items.length, 'Deve constar 3 produtos no carrinho após atualização').to.be.eql(3);

                            for (let index = 0; index < responseupd.body.items.length; index++) {
                                if(responseupd.body.items[index].productSkuId==product[0].product.ProductSkuId)
                                expect(responseupd.body.items[index].quantity, 'Deve apresentar quantidade 1 ao adicionar o produto no carrinho').to.be.eql(product[0].product.Quantity);
                            }
                            expect(responseupd.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após atualização do primeiro produto').to.be.eql((product[0].product.Quantity * product[0].config.price.to)+(product[1].product.Quantity * product[1].config.price.to)+(product[2].product.Quantity * product[2].config.price.to));
                            

                            product[1].product.Quantity = 4;
                            return cartService.updateCart(usertoken, product[1].product).then(function(responseupd2){
                                expect(responseupd2, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                expect(responseupd2.body.items.length, 'Deve constar 3 produtos no carrinho após atualização').to.be.eql(3);
                                
                                for (let index = 0; index < responseupd2.body.items.length; index++) {
                                    if(responseupd2.body.items[index].productSkuId==product[1].product.ProductSkuId)
                                    expect(responseupd2.body.items[index].quantity, 'Deve apresentar quantidade 1 ao adicionar o produto no carrinho').to.be.eql(product[1].product.Quantity);
                                }
                                expect(responseupd2.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após atualização do segundo produto').to.be.eql((product[0].product.Quantity * product[0].config.price.to)+(product[1].product.Quantity * product[1].config.price.to)+(product[2].product.Quantity * product[2].config.price.to));

                                product[2].product.Quantity = 6;
                                return cartService.updateCart(usertoken, product[2].product).then(function(responseupd3){
                                    expect(responseupd3, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                                    expect(responseupd3.body.items.length, 'Deve constar 3 produtos no carrinho após atualização').to.be.eql(3);
                                    
                                    for (let index = 0; index < responseupd3.body.items.length; index++) {
                                        if(responseupd3.body.items[index].productSkuId==product[2].product.ProductSkuId)
                                        expect(responseupd3.body.items[index].quantity, 'Deve apresentar quantidade 1 ao adicionar o produto no carrinho').to.be.eql(product[2].product.Quantity);
                                    }
                                    expect(responseupd3.body.totalPointsPrice,'Deve exibir o total do carrinho corretamente após atualização do terceiro produto').to.be.eql((product[0].product.Quantity * product[0].config.price.to)+(product[1].product.Quantity * product[1].config.price.to)+(product[2].product.Quantity * product[2].config.price.to));
                                });
                            });
                        });
                    });
                });                
            });
        });
    });

    it('Deve definir Endereço de entrega para o carrinho', function(){
    
        var cartService = new CartService(this);
        var addressfactory = new Addressfactory();
        var address = addressfactory.buildDefault();
        return cartService.AddShippingAddress(usertoken, address).then(function(response){ 
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);            
            return cartService.getCart(usertoken).then(function(responseget){
                expect(responseget, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK); 
                expect(responseget.body.shippingAddress.addressText).to.equal(address.addressText);
                expect(responseget.body.shippingAddress.addressName).to.equal(address.addressName);
                expect(responseget.body.shippingAddress.number).to.equal(address.number);
                expect(responseget.body.shippingAddress.district).to.equal(address.district);
                expect(responseget.body.shippingAddress.city).to.equal(address.city);
                expect(responseget.body.shippingAddress.state).to.equal(address.state);
                expect(responseget.body.shippingAddress.zipCode).to.equal(address.zipCode);
                expect(responseget.body.shippingAddress.complement).to.equal(address.complement);
                expect(responseget.body.shippingAddress.reference).to.equal(address.reference);
                expect(responseget.body.shippingAddress.receiver.birthDate).to.equal(address.receiver.birthDate);
                expect(responseget.body.shippingAddress.receiver.cpfCnpj).to.equal(address.receiver.cpfCnpj);
                expect(responseget.body.shippingAddress.receiver.gender).to.equal(address.receiver.genderType);
                expect(responseget.body.shippingAddress.receiver.phones[0].ddd).to.equal(address.receiver.phones[0].ddd);
                expect(responseget.body.shippingAddress.receiver.phones[0].number).to.equal(address.receiver.phones[0].number);
                expect(responseget.body.shippingAddress.receiver.phones[0].phoneType).to.equal(address.receiver.phones[0].phoneType); 
                expect(responseget.body.shippingAddress.receiver.receiverName).to.equal(address.receiver.receiverName); 
                expect(responseget.body.shippingAddress.receiver.email).to.equal(address.receiver.email); 
            });
        });
    });

    it('Deve obter o endereço do participante pelo CEP', function(){
        var cartService = new CartService(this);
        return cartService.getZipCode(usertoken, '06454000').then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve impedir de obter o endereço do participante com CEP inválido', function(){
        var cartService = new CartService(this);
        return cartService.getZipCode(usertoken, 'gfdgdgdgd').then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.BAD_REQUEST);
        }).catch(function(response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
        });
    });

    it('Deve obter o frete do carrinho', function(){
        var cartService = new CartService(this);
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

        return cartService.clearCart(usertoken).then(function(){        
            return cartService.AddCart(usertoken, product[0].product).then(function(responsecart){
                expect(responsecart, 'Deve adcionar primeiro produto com sucesso').to.have.status(config.util.HTTP.OK);
                return cartService.getFreight(usertoken, '06454000').then(function(responsefreight){
                    expect(responsefreight, 'Deve obter frete do primeiro produto com sucesso').to.have.status(config.util.HTTP.OK);
                    expect(responsefreight.body.vendors.length, 'Deve trazer frete de apenas 1 parceiro').to.equal(1); 
                    expect(responsefreight.body.vendors[0].vendorId, 'Deve trazer o vendorid do produto que foi adiconado no carrinho').to.equal(product[0].product.vendorId);

                    return cartService.AddCart(usertoken, product[1].product).then(function(responsecart1){
                        expect(responsecart1, 'Deve adcionar segundo produto (do mesmo parceiro) com sucesso').to.have.status(config.util.HTTP.OK);
                        return cartService.getFreight(usertoken, '06454000').then(function(responsefreight1){
                            expect(responsefreight1, 'Deve obter frete dos 2 produtos com sucesso').to.have.status(config.util.HTTP.OK);
                            expect(responsefreight1.body.vendors.length, 'Deve trazer frete de apenas 1 parceiro').to.equal(1); 
                            expect(responsefreight1.body.vendors[0].vendorId, 'Deve trazer o vendorid dos produtos que foram adiconados no carrinho').to.equal(product[1].product.vendorId);

                            return cartService.AddCart(usertoken, product[2].product).then(function(responsecart2){
                                expect(responsecart2, 'Deve adcionar terceiro produto (de outro parceiro) com sucesso').to.have.status(config.util.HTTP.OK);
                                return cartService.getFreight(usertoken, '06454000').then(function(responsefreight2){
                                    expect(responsefreight2, 'Deve obter frete dos 2 produtos com sucesso').to.have.status(config.util.HTTP.OK);
                                    expect(responsefreight2.body.vendors.length, 'Deve trazer frete de 2 parceiros distintos').to.equal(2);
                                    
                                    if(responsefreight2.body.vendors[1].vendorId==product[2].product.vendorId)
                                    {
                                        expect(responsefreight2.body.vendors[0].vendorId, 'Deve trazer o vendorid dos produtos que foram adiconados no carrinho').to.equal(product[0].product.vendorId);
                                        expect(responsefreight2.body.vendors[1].vendorId, 'Deve trazer o vendorid dos produtos que foram adiconados no carrinho').to.equal(product[2].product.vendorId);
                                    }
                                    else
                                    {
                                        expect(responsefreight2.body.vendors[0].vendorId, 'Deve trazer o vendorid dos produtos que foram adiconados no carrinho').to.equal(product[2].product.vendorId);
                                        expect(responsefreight2.body.vendors[1].vendorId, 'Deve trazer o vendorid dos produtos que foram adiconados no carrinho').to.equal(product[0].product.vendorId);
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