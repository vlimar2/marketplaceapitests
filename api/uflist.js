'use strict';

var AuthService = require('../services/authService');
var UflistService = require('../services/UflistService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Testes na Api de lista de unidades federativas do país', function() {

    it('Deve obter lista de unidades federativas', function(){
        var uflistService = new UflistService(this);

        return uflistService.getUflist().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[0].sigla, 'Deve conter a sigla AC').to.be.equal('AC');
            expect(response.body[1].sigla, 'Deve conter a sigla AC').to.be.equal('AL');
            expect(response.body[2].sigla, 'Deve conter a sigla AC').to.be.equal('AM');
            expect(response.body[3].sigla, 'Deve conter a sigla AC').to.be.equal('AP');
            expect(response.body[4].sigla, 'Deve conter a sigla AC').to.be.equal('BA');
            expect(response.body[5].sigla, 'Deve conter a sigla AC').to.be.equal('CE');
            expect(response.body[6].sigla, 'Deve conter a sigla AC').to.be.equal('DF');
            expect(response.body[7].sigla, 'Deve conter a sigla AC').to.be.equal('ES');
            expect(response.body[8].sigla, 'Deve conter a sigla AC').to.be.equal('GO');
            expect(response.body[9].sigla, 'Deve conter a sigla AC').to.be.equal('MA');
            expect(response.body[10].sigla, 'Deve conter a sigla AC').to.be.equal('MG');
            expect(response.body[11].sigla, 'Deve conter a sigla AC').to.be.equal('MS');
            expect(response.body[12].sigla, 'Deve conter a sigla AC').to.be.equal('MT');
            expect(response.body[13].sigla, 'Deve conter a sigla AC').to.be.equal('PA');
            expect(response.body[14].sigla, 'Deve conter a sigla AC').to.be.equal('PB');
            expect(response.body[15].sigla, 'Deve conter a sigla AC').to.be.equal('PE');
            expect(response.body[16].sigla, 'Deve conter a sigla AC').to.be.equal('PI');
            expect(response.body[17].sigla, 'Deve conter a sigla AC').to.be.equal('PR');
            expect(response.body[18].sigla, 'Deve conter a sigla AC').to.be.equal('RJ');
            expect(response.body[19].sigla, 'Deve conter a sigla AC').to.be.equal('RN');
            expect(response.body[20].sigla, 'Deve conter a sigla AC').to.be.equal('RO');
            expect(response.body[21].sigla, 'Deve conter a sigla AC').to.be.equal('RR');
            expect(response.body[22].sigla, 'Deve conter a sigla AC').to.be.equal('RS');
            expect(response.body[23].sigla, 'Deve conter a sigla AC').to.be.equal('SC');
            expect(response.body[24].sigla, 'Deve conter a sigla AC').to.be.equal('SE');
            expect(response.body[25].sigla, 'Deve conter a sigla AC').to.be.equal('SP');
            expect(response.body[26].sigla, 'Deve conter a sigla AC').to.be.equal('TO');
        });
    });

});