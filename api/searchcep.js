'use strict';

var SearchcepService = require('../services/SearchcepService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Testes na Api de busca por CEP', function() {

    it('Deve obter informações do CEP desejado', function(){
        var searchcepService = new SearchcepService(this);

        return searchcepService.getCep().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.bairro, 'Deve conter o nome do bairro').not.to.be.equal('');
            expect(response.body.cep, 'Deve conter o número do cep procurado').not.to.be.equal('');
            expect(response.body.logradouro, 'Deve conter o nome da rua referente ao cep').not.to.be.equal('');
            expect(response.body.cidade.cidadeId, 'Deve conter o ID da cidade referente ao cep').not.to.be.equal('');
            expect(response.body.cidade.nome, 'Deve conter o nome da cidade referente ao cep').not.to.be.equal('');
            expect(response.body.cidade.ufId, 'Deve conter o ID da unidade federativa referente ao cep').not.to.be.equal('');
            expect(response.body.uf.sigla, 'Deve conter a sigla do estado referente ao cep').not.to.be.equal('');
        });
    });

});