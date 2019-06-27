'use strict';

var CitylistService = require('../services/CitylistService');
var AuthService = require('../services/authService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;

describe('Testes na Api de lista de cidades de cada estado brasileiro', function () {

    it('Deve obter lista de cidades do distrito federal', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist1().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[0].nome, 'Deve conter a cidade Brasília').to.be.equal('Brasília');
            expect(response.body[1].nome, 'Deve conter a cidade Brazlândia').to.be.equal('Brazlândia');
            expect(response.body[2].nome, 'Deve conter a cidade Candangolândia').to.be.equal('Candangolândia');
            expect(response.body[3].nome, 'Deve conter a cidade Ceilândia').to.be.equal('Ceilândia');
            expect(response.body[4].nome, 'Deve conter a cidade Cruzeiro').to.be.equal('Cruzeiro');
            expect(response.body[5].nome, 'Deve conter a cidade Gama').to.be.equal('Gama');
            expect(response.body[6].nome, 'Deve conter a cidade Guará').to.be.equal('Guará');
            expect(response.body[7].nome, 'Deve conter a cidade Lago Norte').to.be.equal('Lago Norte');
            expect(response.body[8].nome, 'Deve conter a cidade Lago Sul').to.be.equal('Lago Sul');
            expect(response.body[9].nome, 'Deve conter a cidade Núcleo Bandeirante').to.be.equal('Núcleo Bandeirante');
            expect(response.body[10].nome, 'Deve conter a cidade Paranoá').to.be.equal('Paranoá');
            expect(response.body[11].nome, 'Deve conter a cidade Planaltina').to.be.equal('Planaltina');
            expect(response.body[12].nome, 'Deve conter a cidade Recanto das Emas').to.be.equal('Recanto das Emas');
            expect(response.body[13].nome, 'Deve conter a cidade Riacho Fundo').to.be.equal('Riacho Fundo');
            expect(response.body[14].nome, 'Deve conter a cidade Samambaia').to.be.equal('Samambaia');
            expect(response.body[15].nome, 'Deve conter a cidade Santa Maria').to.be.equal('Santa Maria');
            expect(response.body[16].nome, 'Deve conter a cidade São Sebastião').to.be.equal('São Sebastião');
            expect(response.body[17].nome, 'Deve conter a cidade Sobradinho').to.be.equal('Sobradinho');
            expect(response.body[18].nome, 'Deve conter a cidade Taguatinga').to.be.equal('Taguatinga');

        });
    });

    it('Deve obter lista de cidades do estado de Goiás', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist2().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[0].nome, 'Deve conter a cidade Abadia de Goiás').to.be.equal('Abadia de Goiás');
            expect(response.body[1].nome, 'Deve conter a cidade Abadiânia').to.be.equal('Abadiânia');
            expect(response.body[2].nome, 'Deve conter a cidade Acreúna').to.be.equal('Acreúna');
            expect(response.body[3].nome, 'Deve conter a cidade Adelândia').to.be.equal('Adelândia');
            expect(response.body[4].nome, 'Deve conter a cidade Água Fria de Goiás').to.be.equal('Água Fria de Goiás');
            expect(response.body[5].nome, 'Deve conter a cidade Água Limpa').to.be.equal('Água Limpa');
            expect(response.body[6].nome, 'Deve conter a cidade Águas Lindas de Goiás').to.be.equal('Águas Lindas de Goiás');
            expect(response.body[7].nome, 'Deve conter a cidade Alexânia').to.be.equal('Alexânia');
            expect(response.body[8].nome, 'Deve conter a cidade Aloândia').to.be.equal('Aloândia');
            expect(response.body[9].nome, 'Deve conter a cidade Alto Alvorada').to.be.equal('Alto Alvorada');
            expect(response.body[10].nome, 'Deve conter a cidade Alto Horizonte').to.be.equal('Alto Horizonte');
            expect(response.body[11].nome, 'Deve conter a cidade Alto Paraíso de Goiás').to.be.equal('Alto Paraíso de Goiás');
            expect(response.body[12].nome, 'Deve conter a cidade Alvorada do Norte').to.be.equal('Alvorada do Norte');
            expect(response.body[13].nome, 'Deve conter a cidade Amaralina').to.be.equal('Amaralina');
            expect(response.body[14].nome, 'Deve conter a cidade Americano do Brasil').to.be.equal('Americano do Brasil');
            expect(response.body[15].nome, 'Deve conter a cidade Amorinópolis').to.be.equal('Amorinópolis');
            expect(response.body[16].nome, 'Deve conter a cidade Anápolis').to.be.equal('Anápolis');
            expect(response.body[17].nome, 'Deve conter a cidade Anhangüera').to.be.equal('Anhangüera');
            expect(response.body[18].nome, 'Deve conter a cidade Anicuns').to.be.equal('Anicuns');
            expect(response.body[19].nome, 'Deve conter a cidade Aparecida').to.be.equal('Aparecida');
            expect(response.body[20].nome, 'Deve conter a cidade Aparecida de Goiânia').to.be.equal('Aparecida de Goiânia');
            expect(response.body[21].nome, 'Deve conter a cidade Aparecida de Goiás').to.be.equal('Aparecida de Goiás');
        });
    });

    it('Deve obter lista de cidades do estado de Mato Grosso do Sul', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist3().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do Mato Grosso do Sul').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Mato Grosso', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist4().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do Mato Grosso').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Alagoas', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist5().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado de Alagoas').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado da Bahia', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist6().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado da Bahia').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Ceará', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist7().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Ceará').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Maranhão', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist8().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Maranhão').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado da Paraíba', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist9().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado da Paraíba').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado da Pernambuco', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist10().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado de Pernambuco').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado da Piauí', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist11().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Piauí').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Rio Grande do Norte', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist12().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Rio Grande do Norte').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Sergipe', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist13().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado de Sergipe').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Acre', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist14().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Acre').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Amazonas', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist15().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Amazonas').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Amapá', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist16().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Amapá').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Pará', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist17().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Pará').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Rondônia', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist18().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado de Rondônia').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Roraima', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist19().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado de Roraima').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Tocantins', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist20().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado de Tocantins').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Espírito Santo', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist21().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado do Espírito Santo').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Minas Gerais', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist22().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do estado de Minas Gerais').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Rio de Janeiro', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist23().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do Rio de Janeiro').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de São Paulo', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist24().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades de São Paulo').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Paraná', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist25().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do Paraná').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado do Rio Grande do Sul', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist26().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades do Rio Grande do Sul').to.be.a('Array');
        });
    });

    it('Deve obter lista de cidades do estado de Santa Catarina', function () {
        var citylistService = new CitylistService(this);

        return citylistService.getCitylist27().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body, 'Deve conter a lista de todas as cidades de Santa Catarina').to.be.a('Array');
        });
    });

    it('Não deve obter sucesso na lista de cidades sem token', function () {

        var citylistService = new CitylistService(this);

        //realiza busca por cidade
        return citylistService.getCitylist27().then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Deve obter sucesso na lista de cidades com token inválido', function () {

        var citylistService = new CitylistService(this);

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V";

        //realiza busca por cidade
        return citylistService.getCitylist27(token).then(function (response) {
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });
    });

    it('Não deve obter sucesso na lista de cidades com token de admin', function () {

        var citylistService = new CitylistService(this);

        var authService = new AuthService(this);

        var tokenadm;

        //autentica participante
        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (responseAuth) {
            tokenadm = responseAuth.body.access_token;
            //realiza busca por placa
            return citylistService.getCitylist27(tokenadm).then(function (response) {
                expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.BAD_REQUEST);
                console.log(response);
            })//.catch(function (response) {
            //   expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            //});
        });
    });
});