'use strict';

var Participantbydealeradminfactory = function(){

};
Participantbydealeradminfactory.prototype.build = function()
{

    var participant1 = { 
        documentoParticipante: null,       
        senha: null,
        confirmacaoSenha: null,
        dealerId: null,
        email: null,
        nome: null,
        telefone:null,
        funcaoParticipante:null
    };

    return participant1;
}
Participantbydealeradminfactory.prototype.buildDefault1 = function(){
    var participant1 = this.build();
    
    participant1.documentoParticipante =new Date().getTime().toString();
    participant1.senha = "123456";
    participant1.confirmacaoSenha = "123456";
    participant1.dealerId = "205"
    participant1.email = "rafael.lima@ltm.digital";
    participant1.nome = "Rafael Simião";
    participant1.telefone = "11900000000";
    participant1.funcaoParticipante = "54786C70-B31D-4156-B1EC-46693636C308";
    
    return participant1;
};

module.exports = Participantbydealeradminfactory;