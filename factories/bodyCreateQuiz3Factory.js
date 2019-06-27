'use strict';

var bodyCreateQuiz3Factory = function(){

};
bodyCreateQuiz3Factory.prototype.build = function()
{

    var body = {  
      "descricao":"Quiz todos os perfis 2019-4-20",
      "dataDe":"2063-4-20T00:00:00.000Z",
      "dataAte":"2063-4-20T00:00:00.000Z",
      "ativo":true,
      "quizFuncao":[  
         "Frota"
      ],
      "perfisSelecionados":[  
         "81FE735C-D2B4-4706-A33E-77DB67830B57"
      ],
      "quizId":null,
      "Pergunta":[  
         {  
            "descricao":"Pergunta 1",
            "Resposta":[
            ]
         },
         {  
            "descricao":"Pergunta 2",
            "Resposta":[
            ]
         }
      ]
   }

    return body
}

module.exports = bodyCreateQuiz3Factory

