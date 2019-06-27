'use strict';

var AuthService = require('../services/authService');
var QuizquestionService = require('../services/quizquestionService');
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

        var quizquestionService = new QuizquestionService(this);

        return quizquestionService.createPerguntaquiz(token).then(function(response) {
            expect(response,'Deve retornar status 200 ao criar uma pergunta para o Quiz').to.have.status(config.util.HTTP.OK);
            //expect(response.body.quizId).to.exist;
        });
    });

   
});