'use strict';

var bodyEditEnquete2Factory = function(){

}

bodyEditEnquete2Factory.prototype.build = function()
{

    var body = {
      "enqueteFuncao": [
      ],
      "enqueteId": 31,
      "descricao": "Enquete 2019",
      "dataDe": "2020-01-03T00:00:00",
      "dataAte": "2020-01-03T23:59:59",
      "ativo": true,
      "perfisSelecionados": [
          "01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0",
          "31FA37DE-1C15-4C68-B068-66B361F5A731",
          "54F7D870-BE1A-46AC-BAAA-2073C524E718",
          "594C417D-3F20-452F-BA0E-AA1A44038E21",
          "7F10233D-F450-4224-9A95-EC5EC9FAA99D",
          "DE5D8249-93BC-4046-A03B-A78D67C4E915",
          "066F9B7F-D7F7-441D-BE22-B20D16586571",
          "5945342B-CCE1-4EB8-97EE-9355A2D09337",
          "5E3AF20B-5545-4F0A-8D8F-D218E21B67CE",
          "778261CE-A850-4F39-95CB-F0BD630AE6BC",
          "81FE735C-D2B4-4706-A33E-77DB67830B57",
          "99261002-2617-4C67-824B-CC6F234D7E18",
          "A25F81B5-6385-49FD-8DF0-8A2C6315490A",
          "ED46B925-DC54-43E9-A3DC-8EEFBEA3577C",
          "54786C70-B31D-4156-B1EC-46693636C307"
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

module.exports = bodyEditEnquete2Factory