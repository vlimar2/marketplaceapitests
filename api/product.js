'use strict';

var ProductService = require('../services/productService')
var ParticipantService = require('../services/ParticipantService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

var usertoken;

describe('Testes na Api de Produtos', function() {
    
    before('setup', function() {        
        var participantService = new ParticipantService(this);
        
        return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(responseuser){
            var token = JSON.parse(responseuser.text);                
            usertoken = token.ticket.access_token;   
        });        
    });

    it('Deve realizar a busca de um produto', function(){
        var productService = new ProductService(this);
        return productService.getSearch(usertoken, 'Produto teste', 12, 'null', 0, 1).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.products.length, 'Deve trazer somente os quatro produtos com nome Produto teste que esta vinculado a esta campanha').to.eql(4);
            expect(response.body.products[0].productName, 'Deve conter a palavra Produto Teste no produto obtido da busca').to.include('Produto teste');
            expect(response.body.products[1].productName, 'Deve conter a palavra Produto Teste no produto obtido da busca').to.include('Produto teste');
        });
    });
        
    //Teste com divergência de valores de carrinho e detalhe do produto
    it('Deve obter o detalhe de um produto', function(){
        var productService = new ProductService(this);
            
        return productService.getProductDetail(usertoken,config.PRODUCTS[0].sku, false).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.defaultSku.productSkuId, 'Deve obter o mesmo SKU de produto utilizado na requisição').to.eql(config.PRODUCTS[0].sku);
            expect(response.body.defaultSku.originalProductSkuId, 'Deve obter o mesmo originalProductSkuId de produto utilizado na requisição').to.eql(config.PRODUCTS[0].originalid);
            expect(parseInt(response.body.defaultSku.vendorId), 'Deve obter o vendorId do SKU do produto').to.eql(config.PRODUCTS[0].vendorid);
            //expect(response.body.defaultSku.defaultPrice, 'Deve obter o preço DE do produto aplicando o fator de conversão').to.eql(config.PRODUCTS[0].price.from);
            //Divergência de valores, analisar
            //expect(response.body.defaultSku.sellingPrice, 'Deve obter o preço POR do produto aplicando o fator de conversão').to.eql(config.PRODUCTS[0].price.to);
            expect(response.body.description, 'Deve obter a descrição do produto').to.eql(config.PRODUCTS[0].description);
            expect(response.body.name, 'Deve obter o nome do produto').to.eql(config.PRODUCTS[0].name);
            expect(response.body.originalProductId, 'Deve obter o originalProductId do produto utilizado na requisição').to.eql(config.PRODUCTS[0].originalproductid);
        });
    });

    it('Deve obter a disponibilidade de um produto', function(){
        var productService = new ProductService(this);
        //token, sku, catalogid, vendorid, originalproductskuid, clientId
        return productService.getAvailability(usertoken, config.PRODUCTS[0].sku).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter a vitrine de produtos', function(){
        var productService = new ProductService(this);
            //token, sku, catalogid, vendorid, originalproductskuid, clientId
        return productService.getShowCase(usertoken, config.CATALOG_ID,'',1,0).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });
        
    it('Deve obter a vitrine do parceiro extra', function(){
        var productService = new ProductService(this);
        //token, sku, catalogid, vendorid, originalproductskuid, clientId
        return productService.getShopShowCase(usertoken, config.shop_showcases[0].shop).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter a vitrine do parceiro casas bahia', function(){
        var productService = new ProductService(this);
        //token, sku, catalogid, vendorid, originalproductskuid, clientId
        return productService.getShopShowCase(usertoken, config.shop_showcases[1].shop).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });


    it('Deve obter a vitrine do parceiro ponto frio', function(){
        var productService = new ProductService(this);
        //token, sku, catalogid, vendorid, originalproductskuid, clientId
        return productService.getShopShowCase(usertoken, config.shop_showcases[2].shop).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve obter a vitrine do parceiro casas bahia com paginação', function(){
        var productService = new ProductService(this);
        
        return productService.getShopShowCase(usertoken, config.shop_showcases[1].shop).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        });
    });

});    