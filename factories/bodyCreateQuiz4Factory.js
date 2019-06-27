'use strict';

var bodyCreateQuiz4Factory = function(){

};
bodyCreateQuiz4Factory.prototype.build = function()
{

    var body = {
      "descricao": "Teste Quiz",
      "dataDe": "",
      "dataAte": "",
      "ativo": false,
      "quizFuncao": [
      ],
      "perfisSelecionados": [
        ],
      "quizId": null,
      "Pergunta": [
        {
          "descricao": "Pergunta 1",
          "Resposta": [
            {
              "descricao": "Resposta 1",
              "correta": false
            }
          ]
        },
        {
          "descricao": "Pergunta 2",
          "Resposta": [
            {
              "descricao": "Resposta 1",
              "correta": false
            }
          ]
        }
      ]
    }

    return body
}

module.exports = bodyCreateQuiz4Factory

