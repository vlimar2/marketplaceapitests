'use strict';

var bodyCreateQuizFactory = function(){

};
bodyCreateQuizFactory.prototype.build = function()
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
              },
              {
                "descricao": "Resposta 2",
                "correta": false
              },
              {
                "descricao": "Resposta 3",
                "correta": true
              },
              {
                "descricao": "Resposta 4",
                "correta": false
              },
              {
                "descricao": "Resposta 5",
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
              },
              {
                "descricao": "Resposta 2",
                "correta": true
              },
              {
                "descricao": "Resposta 3",
                "correta": false
              },
              {
                "descricao": "Resposta 4",
                "correta": false
              },
              {
                "descricao": "Resposta 5",
                "correta": false
              }
            ]
          }
        ]
      }

    return body
}

module.exports = bodyCreateQuizFactory

