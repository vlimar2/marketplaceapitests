'use strict';

var AuthService = require('../services/authService')
let Database = require('../database/database');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

describe('Logar no APP', function () {

    it('Deve logar em mercedes através da autenticação por participante App', function () {
        var authService = new AuthService(this);

        return authService.authParticipantClientCredentials(config.CLIENTIDSECRET, config.CLIENTSECRET, config.CLIENTIDSECRET)
            .then(function (response) {
                //console.log(response.body)
                expect(response).to.have.status(config.util.HTTP.OK);
                //expect(response.error).to.equal(false);
                expect(response.body.access_token).to.not.equal('');
            })
    });
    
});