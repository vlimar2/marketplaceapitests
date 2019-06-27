'use strict';

var AuthService = require('../services/authService');
var NewscategoryService = require('../services/newscategoryService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var client_Id = 1

describe('Testes na Api de categoria de notícia', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve criar uma categoria tipo Corporativo', function () {

        var newscategoryService = new NewscategoryService(this);

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            expect(responseCategoria.body.CategoryType).to.equal(1);
        });
    });

    it('Deve criar uma categoria tipo Serviços', function () {
        
        var newscategoryService = new NewscategoryService(this);
        
        //cria uma categoria
        return newscategoryService.createCategory2(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            expect(responseCategoria.body.CategoryType).to.equal(2);
        });
    });

    it('Deve criar uma categoria tipo Vans', function () {
        
        var newscategoryService = new NewscategoryService(this);
        
        //cria uma categoria
        return newscategoryService.createCategory3(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            expect(responseCategoria.body.CategoryType).to.equal(3);
        });
    });

    it('Deve criar uma categoria tipo Ônibus', function () {
        
        var newscategoryService = new NewscategoryService(this);
        
        //cria uma categoria
        return newscategoryService.createCategory4(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            expect(responseCategoria.body.CategoryType).to.equal(4);
        });
    });

    it('Deve criar uma categoria tipo Caminhões', function () {
        
        var newscategoryService = new NewscategoryService(this);
        
        //cria uma categoria
        return newscategoryService.createCategory5(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            expect(responseCategoria.body.CategoryType).to.equal(5);
        });
    });

    it('Deve criar uma categoria tipo Outros', function () {
        
        var newscategoryService = new NewscategoryService(this);
        
        //cria uma categoria
        return newscategoryService.createCategory6(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            expect(responseCategoria.body.CategoryType).to.equal(6);
        });
    });

});
