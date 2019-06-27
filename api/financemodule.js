'use strict';

var AuthService = require('../services/authService');
var FinancemoduleService = require('../services/financemoduleService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
//var fs = require('fs');


describe('Testes na Api de módulo financeiro', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar informações de módulo financeiro', function () {

        var financemoduleService = new FinancemoduleService(this);

        var url = 'pontos/relatoriopontosmensalidadesgrid?UFId=&CidadeId=&PeriodoId=&DealerId='

        return financemoduleService.generateInfos(token).then(function (response) {
            expect(response, 'Deve retornar status 200 ao retornar informações').to.have.status(config.util.HTTP.OK);
            //Valida se há informações no corpo da resposta
            expect(response.body[0]).to.not.equal('');
        });
    });

    it('Deve retornar informações filtrado por mês de dezembro', function () {

        var financemoduleService = new FinancemoduleService(this);

        //var cidadeId = "CidadeId=74";

        var periodId = 74

        var url = 'pontos/relatoriopontosmensalidadesgrid?UFId=&CidadeId=&PeriodoId=' + periodId + '&DealerId=';

        return financemoduleService.generateInfos(token, url).then(function (response) {
            expect(response, 'Deve retornar status 200 ao retornar informações').to.have.status(config.util.HTTP.OK);
            //Valida se há informações no corpo da resposta
            expect(response.body[0]).to.not.equal('');
            for (var i = response.body.length - 1; i >= 0; i--) {
                //console.log(response.body[i].razaoSocial)
                if (periodId === response.body[i].PeriodoId) {
                    console.log(response.body[i].PeriodoId)
                    expect(periodId, 'Deve retornar apenas registros do mês de dezembro').to.eq(response.body[i].PeriodoId);
                    break
                } else {
                    if (i === 0) {
                        throw Error('Mês inválido');
                    }
                }
            }
        });
    });

    it('Deve retornar informações filtrado por estado do Distrito federal', function () {

        var financemoduleService = new FinancemoduleService(this);

        //var cidadeId = "CidadeId=74";

        var ufId = 1

        var url = 'pontos/relatoriopontosmensalidadesgrid?UFId=' + ufId + '&CidadeId=&PeriodoId=&DealerId=';

        return financemoduleService.generateInfos(token, url).then(function (response) {
            expect(response, 'Deve retornar status 200 ao retornar informações').to.have.status(config.util.HTTP.OK);
            //Valida se há informações no corpo da resposta
            expect(response.body[0]).to.not.equal('');
            for (var i = response.body.length - 1; i >= 0; i--) {
                //console.log(response.body[i].razaoSocial)
                if (ufId === response.body[i].UFId) {
                    //console.log(response.body[i].CidadeId)
                    expect(ufId, 'Deve retornar apenas registros do estado do distrito federal').to.eq(response.body[i].UFId);
                    break
                } else {
                    if (i === 0) {
                        throw Error('Estado inválido');
                    }
                }
            }
        });
    });

    it('Deve retornar informações filtrado pela cidade de Brasília', function () {

        var financemoduleService = new FinancemoduleService(this);

        //var cidadeId = "CidadeId=74";

        var cidadeId = 1

        var url = 'pontos/relatoriopontosmensalidadesgrid?UFId=&CidadeId=' + cidadeId + '&PeriodoId=&DealerId=';

        return financemoduleService.generateInfos(token, url).then(function (response) {
            expect(response, 'Deve retornar status 200 ao retornar informações').to.have.status(config.util.HTTP.OK);
            //Valida se há informações no corpo da resposta
            expect(response.body[0]).to.not.equal('');
            for (var i = response.body.length - 1; i >= 0; i--) {
                //console.log(response.body[i].razaoSocial)
                if (cidadeId === response.body[i].CidadeId) {
                    //console.log(response.body[i].CidadeId)
                    expect(cidadeId, 'Deve retornar apenas registros da cidade de Brasília').to.eq(response.body[i].CidadeId);
                    break
                } else {
                    if (i === 0) {
                        throw Error('Cidade inválida');
                    }
                }
            }
        });
    });

    it('Deve retornar informações filtrado por dealer específico', function () {

        var financemoduleService = new FinancemoduleService(this);

        //var cidadeId = "CidadeId=74";

        var dealerId = 0

        var url = 'pontos/relatoriopontosmensalidadesgrid?UFId=&CidadeId=&PeriodoId=&DealerId='+ dealerId;

        return financemoduleService.generateInfos(token, url).then(function (response) {
            expect(response, 'Deve retornar status 200 ao retornar informações').to.have.status(config.util.HTTP.OK);
            //Valida se há informações no corpo da resposta
            expect(response.body[0]).to.not.equal('');
            for (var i = response.body.length - 1; i >= 0; i--) {
                //console.log(response.body[i].razaoSocial)
                if (dealerId === response.body[i].DealerId) {
                    //console.log(response.body[i].CidadeId)
                    expect(dealerId, 'Deve retornar apenas registros do dealer Mercedes').to.eq(response.body[i].DealerId);
                    break
                } else {
                    if (i === 0) {
                        throw Error('Dealer inválido');
                    }
                }
            }
        });
    });
});
