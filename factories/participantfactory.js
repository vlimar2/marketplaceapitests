'use strict';

var Participantfactory = function(){

};
Participantfactory.prototype.build = function()
{

    var participant = { 
        participanteId: null,       
        funcaoParticipante: null,
        funcaoParticipanteDetalhe: null,
        senha: null,
        confirmacaoSenha: null,
        documentoParticipante: null,
        documentoEmpresa:null,
        email:null,
        nome:null,
        telefone:null,
        googleId:null,
        receberNovidades:null,
        termoAceite:null,
        meioConfirmacao:null,
    };

    return participant;
}
// criar participante frota proprietário
Participantfactory.prototype.buildDefault = function(){
    var body = {
        "funcaoParticipante": "54786C70-B31D-4156-B1EC-46693636C307",
        "senha": "123456",
        "confirmacaoSenha": "123456",
        "documentoParticipante": "01386226041",
        "email": "cursoqaltm@gmail.com",
        "nome": "testes",
        "receberNovidades": false,
        "termoAceite": true,
        "termoRelacional": false,
        "termoTransacional": false,
        "meioConfirmacao": "EMAIL",
        "cidadeId": 3266,
        "ufId": 11,
        "celular": "(11) 90000-0000",
        "DataNascimento": "1982-01-01T18:34:58.193Z",
        "sexo": "ACEITE.SORTEIO;2019-04-30 15:34:58",
        "templateEmailCadastro": "cadastroParticipante",
        "origem": "Portal Participante"
      }

    return body;
};

//cria participante motorista autônomo
/*Participantfactory.prototype.buildDefault = function(){
    var participant = this.build();
    
    participant.participanteId = "2189"
    participant.funcaoParticipante = "FC0B26F9-E059-4446-B9EC-1F73A4BE05D6";
    participant.funcaoParticipanteDetalhe = "54786C70-B31D-4156-B1EC-46693636C307";
    participant.senha = "123456";
    participant.confirmacaoSenha = "123456";
    participant.documentoParticipante =new Date().getTime().toString();
    participant.documentoEmpresa =new Date().getTime().toString();
    participant.email = "rafael.lima@ltm.digital";
    participant.nome = "Rafael Simião";
    participant.telefone = "11974382096";
    participant.googleId = "";
    participant.receberNovidades = true;
    participant.termoAceite = true;
    participant.meioConfirmacao = "EMAIL";

    return participant;
};*/

module.exports = Participantfactory;