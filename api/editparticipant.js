'use strict';

var AuthService = require('../services/authService');
var EditparticipantService = require('../services/editparticipantService');
var Participantfactory = require('../factories/participantfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de editar participante', function() {

    before('setup', function() {    
        var authService = new AuthService(this);

        return authService.authParticipant(config.USERNAME, config.PASS, config.CLIENT_ID).then(function(response) {
            token = response.body.access_token;
        });
    });

    xit('Deve editar um participante existente', function() {

        var factory = new Participantfactory();
        
                var currentdate = new Date();
        
                var newparticipant = factory.buildDefault(); 
        
                var editparticipantService = new EditparticipantService(this);

                var participant;

                participant = newparticipant;
                participant.participanteId = "2189"
                participant.senha = "123456";
                participant.confirmacaoSenha = "123456";
                participant.documentoParticipante =new Date().getTime().toString();
                participant.documentoEmpresa =new Date().getTime().toString();
                participant.email = "rafael.lima@ltm.digital";
                participant.nome = "Rafael Simião Atualizado";
                participant.telefone = "11974382096";
                participant.googleId = "";
                participant.receberNovidades = true;
                participant.termoAceite = true;
                participant.meioConfirmacao = "EMAIL";
       

        return editparticipantService.editParticipant(newparticipant, token).then(function(response) {
            expect(response,'Deve retornar status 200 ao editar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body).to.equal("Dados atualizados");
        });
    });

});