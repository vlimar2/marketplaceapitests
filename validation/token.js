'use strict';

var AuthService = require('../services/authService');

var Token = function () {
    
}

Token.prototype.gerarToken = async function (quiz) {
    var authService = new AuthService(this)

    var token = await authService.authParticipantdealer(quiz.login, quiz.senha, quiz.client_id)

    return token.body.access_token
}

module.exports = Token