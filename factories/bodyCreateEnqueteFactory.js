'use strict';

var bodyCreateEnqueteFactory = function(){

}

bodyCreateEnqueteFactory.prototype.build = function()
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
            "enqueteResposta": [
                {
                    "descricao": "Resposta 1",
                    "ativo": true,
                    "nomeArquivoGerado": "24052019_20321414432335-e8cb-4e18-ba68-e6166de34b11.png",
                    "link": "https://mercedesqa.blob.core.windows.net/file/enquete/24052019_20321414432335-e8cb-4e18-ba68-e6166de34b11.png"
                },
                {
                    "descricao": "Resposta 2",
                    "ativo": true,
                    "nomeArquivoGerado": "24052019_2032226c01da36-923f-4798-a2a8-9ac3d0f62281.jpeg",
                    "link": "https://mercedesqa.blob.core.windows.net/file/enquete/24052019_2032226c01da36-923f-4798-a2a8-9ac3d0f62281.jpeg"
                }
            ]
        }
    ]
}

  return body
}

module.exports = bodyCreateEnqueteFactory