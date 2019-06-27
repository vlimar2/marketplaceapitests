'use strict';

var bodyCreateEnquete3Factory = function(){

}

bodyCreateEnquete3Factory.prototype.build = function()
{

    var body = {
        "enqueteFuncao": [
        ],
        "enqueteId": null,
        "descricao": "Enquete 2019",
        "dataDe": "",
        "dataAte": "",
        "ativo": true,
        "perfisSelecionados": [
        ],
        "enquetePergunta": [
            {
                "enquetePerguntaId": null,
                "descricao": "Pergunta 1",
                "enqueteId": null,
                "tipoPerguntaId": 3,
                "enqueteResposta": []
            },
            {
                "enquetePerguntaId": null,
                "descricao": "Pergunta 2",
                "enqueteId": null,
                "tipoPerguntaId": 2,
                "limiteQdeResposta": 1,
                "imagemResposta": true,
            }
        ]
    }

  return body
}

module.exports = bodyCreateEnquete3Factory