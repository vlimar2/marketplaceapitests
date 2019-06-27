'use strict';

var ContactusnologgedService = require('../services/contactusnologgedService');
var Contactfactory = require('../factories/contactfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Testes na Api de fale conosco deslogado', function() {


    it('Deve enviar uma mensagem de fale conosco com usuário deslogado', function() {

        var factory = new Contactfactory();

        var contact = factory.buildDefault(); 

        var contactusnologgedService = new ContactusnologgedService(this);

        return contactusnologgedService.getContactus(contact).then(function(response) {
            expect(response,'Deve retornar status 200 ao criar uma mensagem de fale conosco').to.have.status(config.util.HTTP.OK);
        });
    });

});