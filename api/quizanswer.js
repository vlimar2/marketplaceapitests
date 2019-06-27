'use strict';

var AuthService = require('../services/authService');
var QuizanswerService = require('../services/quizanswerService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Testes na Api de resposta da pergunta do Quiz', function() {

    before('setup', function() {    
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });

    xit('Deve criar uma pergunta para o Quiz', function() {

        var quizanswerService = new QuizanswerService(this);

        return quizanswerService.createRespostaquiz(token).then(function(response, pergunta) {
            expect(response,'Deve retornar status 200 ao criar uma pergunta para o Quiz').to.have.status(config.util.HTTP.OK);

        });
    });

   
});