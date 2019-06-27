'use strict';

var AuthService = require('../services/authService');
var EnquetequestionService = require('../services/enquetequestionService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Testes na Api de pergunta de Quiz', function() {

    before('setup', function() {    
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });

    xit('Deve criar uma pergunta para o Quiz', function() {

        var enquetequestionService = new EnquetequestionService(this);

        return enquetequestionService.createPerguntaquiz(token).then(function(response) {
            expect(response,'Deve retornar status 200 ao criar uma pergunta para a Enquete').to.have.status(config.util.HTTP.OK);
            //expect(response.body.quizId).to.exist;
        });
    });

   
});