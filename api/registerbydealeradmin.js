'use strict';

var AuthdealeradminService = require('../services/authdealeradminService');
var RegisterbydealeradminService = require('../services/registerbydealeradminService');
var Participantbydealeradminfactory = require('../factories/participantbydealeradminfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de cadastro de participante via dealer admin', function() {

    before('setup', function() {    
        var authdealeradminService = new AuthdealeradminService(this);

        return authdealeradminService.authDealeradm(config.DEALERADMUSERNAME, config.DEALERADMPASS, config.DEALERADMCLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });


    it('Deve criar um participante', function() {

        var factory1 = new Participantbydealeradminfactory();

        var currentdate1 = new Date();

        var participant1 = factory1.buildDefault1(); 

        var registerbydealeradminService = new RegisterbydealeradminService(this);

        return registerbydealeradminService.createParticipante(token, participant1).then(function(response) {
            expect(response,'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Usuario criado com sucesso");
        });
    });

});