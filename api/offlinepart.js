'use strict';

var OfflinepartService = require('../services/OfflinepartService');
var chai = require('chai')
var MongoDB = require('../database/mongoDbtruckers')
var assert = chai.assert
var expect = chai.expect
var Util = require('../util');

describe('Testes na Api de criação de participante via app off-line', function () {

    it('Deve criar um participante com perfil Frota gestor de manutenção (funcionário)', async function () {

        var util = new Util(this);

        var cpf = util.gerarCPF();

        var body = {
            CPF: cpf,
            bairro: "",
            birth: "01/01/1982",
            cellphone: "11900000000",
            cep: "",
            corporateName: "",
            creationDate: "2019-05-06T13:50:52.920Z",
            email: "cursoqaltm@gmail.com",
            eventName: "teste automatizado",
            localidade: "Alvarães",
            name: "Funionário teste automatizado",
            profile: "Frota",
            subprofile: "Gestor Manutenção",
            truckerBrand: "",
            truckerModel: "",
            typeOfCompany: "oficinaIndependente",
            uf: "AM"
        }

        var offlinepartService = new OfflinepartService(this);

        var log = new MongoDB()

        var respostaMongo

        //cria um participante frota gestor de manutenção
        return offlinepartService.createParticipant(body).then(async function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body.CPF).to.equal(cpf);
            expect(response.body.profile).to.equal("Frota");
            expect(response.body.subprofile).to.equal("Gestor Manutenção");
            //verifica se o cadastro é realizado no mongo DB
            respostaMongo = await log.mongoDbtruckers(cpf);
            //console.log(respostaMongo);
            //     expect(responsequery[0].origem).to.equal("Portal Participante");
            // });
        });
    });

    it('Deve criar um participante com perfil Oficina proprietário (empresa)', async function () {

        var util = new Util(this);

        var cnpj = util.gerarCNPJ();

        var cpf = util.gerarCPF();

        var body = {
            CNPJ: cnpj,
            CPF: cpf,
            birth: "01/01/1982",
            cellphone: "11900000000",
            corporateName: "Teste automatizado S/A",
            creationDate: "2019-05-06T13:50:52.920Z",
            email: "cursoqaltm@gmail.com",
            eventName: "teste automatizado",
            localidade: "Alvarães",
            name: "Empresa teste automatizado",
            profile: "Oficina",
            subprofile: "Proprietário",
            telephone: "1143434343",
            truckerBrand: "Ford",
            truckerModel: "Ford",
            typeOfCompany: "frotista",
            uf: "AM"
        }

        var offlinepartService = new OfflinepartService(this);

        var log = new MongoDB()

        var respostaMongo

        //cria um participante frota gestor de manutenção
        return offlinepartService.createParticipant(body).then(async function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body.CPF).to.equal(cpf);
            expect(response.body.CNPJ).to.equal(cnpj);
            expect(response.body.profile).to.equal("Oficina");
            expect(response.body.subprofile).to.equal("Proprietário");
            //verifica se o cadastro é realizado no mongo DB
            respostaMongo = await log.mongoDbtruckers1(cnpj);
            //console.log(respostaMongo);
            //     expect(responsequery[0].origem).to.equal("Portal Participante");
            // });
        });
    });

    it('Deve criar um participante com perfil Motorista autônomo', async function () {

        var util = new Util(this);

        var cpf = util.gerarCPF();

        var body = {
            CPF: cpf,
            birth: "01/01/1982",
            cellphone: "11900000000",
            corporateName: "",
            creationDate: "2019-05-06T13:50:52.920Z",
            email: "cursoqaltm@gmail.com",
            eventName: "teste automatizado",
            localidade: "Alvarães",
            name: "Funionário teste automatizado",
            profile: "motoristaAutonomo",
            subprofile: "",
            truckerBrand: "",
            truckerModel: "",
            typeOfCompany: "motoristaAutonomo",
            uf: "AM"
        }

        var offlinepartService = new OfflinepartService(this);

        var log = new MongoDB()

        var respostaMongo

        //cria um participante frota gestor de manutenção
        return offlinepartService.createParticipant(body).then(async function (response) {
            expect(response, 'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.body.CPF).to.equal(cpf);
            //verifica se o cadastro é realizado no mongo DB
            respostaMongo = await log.mongoDbtruckers(cpf);
            //console.log(respostaMongo);
            //     expect(responsequery[0].origem).to.equal("Portal Participante");
            // });
        });
    });
});