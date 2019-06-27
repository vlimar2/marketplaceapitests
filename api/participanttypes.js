'use strict';

var ParticipanttypesService = require ('../services/ParticipanttypesService')
var chai = require ('chai')
var assert = chai.assert
var expect = chai.expect

describe ('Testes de na API que lista todas os perfis de participante', function() {

    it('Deve obter lista de tipos de perfis do participante', function(){
        var participanttypesService = new ParticipanttypesService(this);

        return participanttypesService.listParticipanttype().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[0].descricao, 'Deve retornar o perfil Frotista').to.be.equal('Frotista');
            expect(response.body[1].descricao, 'Deve o perfil Motorista Autônomo').to.be.equal('Motorista Autônomo');
            expect(response.body[2].descricao, 'Deve retornar o perfil Oficina Independente').to.be.equal('Oficina Independente');
        })

    })
})