'use strict';

var AuthService = require('../services/authService');
var PartfordealerService = require('../services/partfordealerService')
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de busca de participante para dealer', function() {

    before('setup', function() {    
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });

    it('Deve obter participantes para o dealer', function(){
        var partfordealerService = new PartfordealerService(this);

        var authService = new AuthService(this);

        return partfordealerService.getParticipant(token).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body.participante, 'Deve obter participantes para o dealer').to.not.equal('');
        });
    });

});