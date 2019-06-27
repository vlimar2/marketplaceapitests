'use strict';

var bodyEditEnquete3Factory = function(){

}

bodyEditEnquete3Factory.prototype.build = function()
{

    var body = {
      "enqueteFuncao": [
          "Oficina",
          "Frota",
          "Motorista Autônomo"
      ],
      "enqueteId": 31,
      "descricao": "Enquete 2019",
      "dataDe": "2020-01-03T00:00:00",
      "dataAte": "2020-01-03T23:59:59",
      "ativo": true,
      "perfisSelecionados": [
      ],
      "enquetePergunta": [
          {
              "$id": "17",
              "enquetePerguntaId": 34,
              "descricao": "Pergunta 1 aberta",
              "enqueteId": 31,
              "enquete": {
                  "$ref": "1"
              },
              "dataCriacao": "2019-05-28T17:26:41.7032556+00:00",
              "dataAlteracao": null,
              "userCriacao": "6138b6da-13e4-480d-bd58-bc1c9ee09275",
              "userAlteracao": null,
              "ativo": true,
              "ordem": 0,
              "tipoPerguntaId": 3,
              "TipoPergunta": null,
              "campoAdicional": false,
              "campoAdicionalDescricao": null,
              "limiteQdeResposta": null,
              "imagemResposta": null,
              "enqueteResposta": []
          },
          {
              "$id": "18",
              "enquetePerguntaId": 33,
              "descricao": "Pergunta 1 aberta",
              "enqueteId": 31,
              "enquete": {
                  "$ref": "1"
              },
              "dataCriacao": "2019-05-28T17:26:41.7032556+00:00",
              "dataAlteracao": null,
              "userCriacao": "6138b6da-13e4-480d-bd58-bc1c9ee09275",
              "userAlteracao": null,
              "ativo": true,
              "ordem": 0,
              "tipoPerguntaId": 2,
              "TipoPergunta": null,
              "campoAdicional": false,
              "campoAdicionalDescricao": null,
              "limiteQdeResposta": 1,
              "imagemResposta": false,
              "enqueteResposta": [
                  {
                      "enqueteRespostaId": 98,
                      "descricao": "Resposta 1 multipla",
                      "enquetePerguntaId": 33,
                      "dataCriacao": "2019-05-28T17:26:41.7032556+00:00",
                      "dataAlteracao": null,
                      "userCriacao": "6138b6da-13e4-480d-bd58-bc1c9ee09275",
                      "userAlteracao": null,
                      "ativo": true,
                      "nomeArquivoGerado": "24052019_20321414432335-e8cb-4e18-ba68-e6166de34b11.png",
                      "link": "https://mercedesqa.blob.core.windows.net/file/enquete/24052019_20321414432335-e8cb-4e18-ba68-e6166de34b11.png"
                  },
                  {
                      "$id": "20",
                      "enqueteRespostaId": 99,
                      "descricao": "Resposta 2 multipla",
                      "enquetePerguntaId": 33,
                      "enquetePergunta": {
                          "$ref": "18"
                      },
                      "dataCriacao": "2019-05-28T17:26:41.7032556+00:00",
                      "dataAlteracao": null,
                      "userCriacao": "6138b6da-13e4-480d-bd58-bc1c9ee09275",
                      "userAlteracao": null,
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

module.exports = bodyEditEnquete3Factory