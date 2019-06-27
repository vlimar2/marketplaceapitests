'use strict';

var AuthService = require('../services/authService');
var RelatoriosAdminService = require('../services/relatoriosAdminService');
let Database = require('../database/database');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token

describe('Testes na Api de relatórios do admin', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Retornar lista de relatório de particpipante e verificar se quantidade de linhas é do excel e banco de dados é a mesma', function () {

        var relatoriosAdminService = new RelatoriosAdminService(this);
        var database = new Database();
        var util = relatoriosAdminService.util;
        var relatorioIdSemDownload = null;
        return new Promise(resolve => {
            util.retornaRelatorioWebConfig().then(function (res) {
                relatorioIdSemDownload = res.configuration.appSettings[0].add[0].$.value;

                resolve(relatoriosAdminService.getAll(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 listando os relatórios').to.have.status(config.util.HTTP.OK);
                    //expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
                    return database.consultaRelatoriosAdmin(relatorioIdSemDownload, response.body.length).then(function (responsequery) {
                        expect(responsequery[0].length, "Deve ser a mesma quantidade de registros.").to.equal(responsequery[1]);

                        return new Promise(resolve => {
                            util.retornaExcel(responsequery[0][0].UrlRelatorio).then(function (excel) {
                                var ultimaLinhaExcelQuery = parseInt(responsequery[0][0].QuantidadeLinhas) + 1;
                                var ultimaLinhaExcel = parseInt(excel.Sheets.Participantes["!ref"].split(":")[1].replace(/\D/g, ''));
                                var cpf = excel.Sheets.Participantes["C" + ultimaLinhaExcelQuery].v;
                                console.log(cpf);
                                //if (ultimaLinhaExcel === ultimaLinhaExcelQuery)
                                expect(ultimaLinhaExcel, 'última linha do arquivo deve ser igual a última linha da query').to.eq(ultimaLinhaExcel);
                                expect(excel, "Deve ter um excel").to.not.equal(null);
                                expect(cpf, "Deve ser um cpf igual a: 99981874604").to.equal("99981874604");
                                resolve(true);
                            });
                        });
                    })
                }));
            });
        });
    });

    it('Retornar lista de relatório de chassi e verificar se quantidade de linhas é do excel e banco de dados é a mesma', function () {

        var relatoriosAdminService = new RelatoriosAdminService(this);
        var database = new Database();
        var util = relatoriosAdminService.util;
        var relatorioIdSemDownload = null;
        return new Promise(resolve => {
            util.retornaRelatorioWebConfig().then(function (res) {
                relatorioIdSemDownload = res.configuration.appSettings[0].add[0].$.value;

                resolve(relatoriosAdminService.getAll(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 listando os relatórios').to.have.status(config.util.HTTP.OK);
                    //expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
                    return database.consultaRelatoriosAdmin(relatorioIdSemDownload, response.body.length).then(function (responsequery) {
                        expect(responsequery[0].length, "Deve ser a mesma quantidade de registros.").to.equal(responsequery[1]);

                        return new Promise(resolve => {
                            util.retornaExcel(responsequery[0][1].UrlRelatorio).then(function (excel) {
                                var ultimaLinhaExcelQuery = parseInt(responsequery[0][1].QuantidadeLinhas) + 1;
                                var ultimaLinhaExcel = parseInt(excel.Sheets.Chassis["!ref"].split(":")[1].replace(/\D/g, ''));
                                //var cpf = excel.Sheets.Participantes["C" + ultimaLinhaExcelQuery].v;
                                //console.log(cpf);
                                //if (ultimaLinhaExcel === ultimaLinhaExcelQuery)
                                expect(ultimaLinhaExcel, 'última linha do arquivo deve ser igual a última linha da query').to.eq(ultimaLinhaExcel);
                                expect(excel, "Deve ter um excel").to.not.equal(null);
                                //expect(cpf, "Deve ser um cpf igual a: 99981874604").to.equal("99981874604");
                                resolve(true);
                            });
                        });
                    })
                }));
            });
        });
    });

    it('Retornar lista de relatório de Sorteio relacional e verificar se quantidade de linhas é do excel e banco de dados é a mesma', function () {

        var relatoriosAdminService = new RelatoriosAdminService(this);
        var database = new Database();
        var util = relatoriosAdminService.util;
        var relatorioIdSemDownload = null;
        return new Promise(resolve => {
            util.retornaRelatorioWebConfig().then(function (res) {
                relatorioIdSemDownload = res.configuration.appSettings[0].add[0].$.value;

                resolve(relatoriosAdminService.getAll(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 listando os relatórios').to.have.status(config.util.HTTP.OK);
                    //expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
                    return database.consultaRelatoriosAdmin(relatorioIdSemDownload, response.body.length).then(function (responsequery) {
                        expect(responsequery[0].length, "Deve ser a mesma quantidade de registros.").to.equal(responsequery[1]);

                        return new Promise(resolve => {
                            util.retornaExcel(responsequery[0][2].UrlRelatorio).then(function (excel) {
                                var ultimaLinhaExcelQuery = parseInt(responsequery[0][2].QuantidadeLinhas) + 1;
                                var ultimaLinhaExcel = parseInt(excel.Sheets.Sorteio["!ref"].split(":")[1].replace(/\D/g, ''));
                                //var cpf = excel.Sheets.Participantes["C" + ultimaLinhaExcelQuery].v;
                                //console.log(cpf);
                                //if (ultimaLinhaExcel === ultimaLinhaExcelQuery)
                                expect(ultimaLinhaExcel, 'última linha do arquivo deve ser igual a última linha da query').to.eq(ultimaLinhaExcel);
                                expect(excel, "Deve ter um excel").to.not.equal(null);
                                //expect(cpf, "Deve ser um cpf igual a: 99981874604").to.equal("99981874604");
                                resolve(true);
                            });
                        });
                    })
                }));
            });
        });
    });
}); /*if (participant.documentoParticipante === response.body[i].DocumentoParticipante) {
    console.log(response.body[i].DocumentoParticipante)
    expect(participant.documentoParticipante, 'Deve retornar participante que possui o cupom').to.eq(response.body[i].DocumentoParticipante);*/