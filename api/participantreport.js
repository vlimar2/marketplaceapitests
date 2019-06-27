'use strict';

var AuthService = require('../services/authService');
var ParticipantreportService = require('../services/participantreportService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
//var fs = require('fs');


describe('Testes na Api de relatório de participantes', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve retornar relatório de participantes', function () {

        var participantreportService = new ParticipantreportService(this);

                return participantreportService.generatereport(token).then(function (response) {
                    expect(response, 'Deve retornar status 200 ao gerar relatório de participante').to.have.status(config.util.HTTP.OK);
                    expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
                    // console.log(response.headers.content-disposition);
                });
    });

    it('Não deve retornar relatório de participantes sem token', function () {

        var participantreportService = new ParticipantreportService(this);

        return participantreportService.generatereport().then(function (response) {
            expect(response, 'Deve retornar status 401 ao negar relatório de participante').to.have.status(config.util.HTTP.OK);
            //expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
            // console.log(response.headers.content-disposition);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });

    });

    it('Não deve retornar relatório de participantes com token inválido', function () {

        token = "zNIpZFWua-WKqGGB37FfSjfgHT76IYJmn9V"

        var participantreportService = new ParticipantreportService(this);

        return participantreportService.generatereport().then(function (response) {
            expect(response, 'Deve retornar status 401 ao negar relatório de participante').to.have.status(config.util.HTTP.OK);
            //expect(response.res.rawHeaders[13], 'Deve retornar relatório').to.exist;
            // console.log(response.headers.content-disposition);
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.UNAUTHORIZED);
        });

    });
});

  /*  fs.writeFile('./text.txt', "Hello Node.js" + os.EOL, function(err) {
        if (err) {
          throw "Unable to read file";
        }*/