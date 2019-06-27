'use strict';

var AuthService = require('../services/authService');
var Token = require('../validation/token');
var ValidaEnquete = require('../validation/validaEnquete')
var enquetequestionService = require('../services/enquetequestionService');
var enqueteanswerService = require('../services/enqueteanswerService');
var enqueteService = require('../services/enqueteService');
var bodyCreateEnqueteFactory = require('../factories/bodyCreateEnqueteFactory')
var bodyCreateEnquete2Factory = require('../factories/bodyCreateEnquete2Factory')
var bodyCreateEnquete3Factory = require('../factories/bodyCreateEnquete3Factory')
var bodyCreateEnquete4Factory = require('../factories/bodyCreateEnquete4Factory')
var bodyEditEnqueteFactory = require('../factories/bodyEditEnqueteFactory')
var bodyEditEnquete2Factory = require('../factories/bodyEditEnquete2Factory')
var bodyEditEnquete3Factory = require('../factories/bodyEditEnquete3Factory')
var bodyEditEnquete4Factory = require('../factories/bodyEditEnquete4Factory')
var bodyEditEnquete5Factory = require('../factories/bodyEditEnquete5Factory')
var bodyEditEnquete6Factory = require('../factories/bodyEditEnquete6Factory')
var moment = require('moment')
var client_Id = 1
var dataVigencia
var data = new Date()
var dataNome = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate()

/*---------------------------------------------------------------------------------------------------------------------
PARA OS CASOS DE TESTES QUE CRIAM ENQUETE, NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O 
PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
-----------------------------------------------------------------------------------------------------------------------*/

describe('Testes na Api de Enquete', function () {

    before('setup', async function () {
        var acesso = new Token()
        config.enquete.login = config.ADMINUSERNAME
        config.enquete.senha = config.ADMINPASS
        config.enquete.client_id = config.ADMINCLIENT_ID
        config.enquete.token = await acesso.gerarToken(config.enquete)
    })

    //PERFIL ADMINISTRADOR, AUDITORIA E DEALER NÃO PODEM SER INCLUIRDOS NO enquete
    xit('Deve cadastrar Enquete com todos os perfis e subperfis', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2030-01-08T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.enqueteFuncao[1] = 'Motorista Autônomo'
        config.enquete.requestCreateEnquete.enqueteFuncao[2] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.enquete.requestCreateEnquete.perfisSelecionados[1] = '99261002-2617-4C67-824B-CC6F234D7E18'
        config.enquete.requestCreateEnquete.perfisSelecionados[2] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        config.enquete.requestCreateEnquete.perfisSelecionados[3] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        config.enquete.requestCreateEnquete.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        config.enquete.requestCreateEnquete.perfisSelecionados[5] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        config.enquete.requestCreateEnquete.perfisSelecionados[6] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        config.enquete.requestCreateEnquete.perfisSelecionados[7] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        config.enquete.requestCreateEnquete.perfisSelecionados[8] = '54786C70-B31D-4156-B1EC-46693636C307'
        config.enquete.requestCreateEnquete.perfisSelecionados[9] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        config.enquete.requestCreateEnquete.perfisSelecionados[10] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        config.enquete.requestCreateEnquete.perfisSelecionados[11] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        config.enquete.requestCreateEnquete.perfisSelecionados[12] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        config.enquete.requestCreateEnquete.perfisSelecionados[13] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        config.enquete.requestCreateEnquete.perfisSelecionados[14] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e todos os subperfis', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2031-01-01T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete Frota e todos os subperfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.enquete.requestCreateEnquete.perfisSelecionados[1] = '99261002-2617-4C67-824B-CC6F234D7E18'
        config.enquete.requestCreateEnquete.perfisSelecionados[2] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        config.enquete.requestCreateEnquete.perfisSelecionados[3] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        config.enquete.requestCreateEnquete.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        config.enquete.requestCreateEnquete.perfisSelecionados[5] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        config.enquete.requestCreateEnquete.perfisSelecionados[6] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        config.enquete.requestCreateEnquete.perfisSelecionados[7] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Gestor Frota', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2032-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Gestor Frota ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Proprietário', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2033-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Proprietário ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Comprador', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2034-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Comprador ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Outros', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2035-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Outros ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Representante Legal', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2036-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Representante Legal ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Gestor de Manutenção', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2037-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Gestor de Manutenção ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Motorista', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2038-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Motorista ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '99261002-2617-4C67-824B-CC6F234D7E18'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Frota e subperfil Almoxarifado', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2039-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Frota e subperfil Almoxarifado ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Oficina e todos os subperfis', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2040-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Oficina e todos os subperfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        config.enquete.requestCreateEnquete.perfisSelecionados[1] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        config.enquete.requestCreateEnquete.perfisSelecionados[2] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        config.enquete.requestCreateEnquete.perfisSelecionados[3] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        config.enquete.requestCreateEnquete.perfisSelecionados[4] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        config.enquete.requestCreateEnquete.perfisSelecionados[5] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Oficina e subperfil Outros', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2041-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Oficina e subperfil Outros ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Oficina e subperfil Comprador', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2042-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Oficina e subperfil Comprador ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Oficina e subperfil Gerente', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2043-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Oficina e subperfil Gerente ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Oficina e subperfil Proprietário', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2044-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Oficina e subperfil Proprietário ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Oficina e subperfil Mecânico', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2045-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Oficina e subperfil Mecânico ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Oficina e subperfil Representante Legal', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2046-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Oficina e subperfil Representante Legal ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete com perfil Motorista Autônomo e subperfil Motorista Autônomo', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = '2047-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete perfil Motorista Autônomo e subperfil Motorista Autônomo ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Motorista Autônomo'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '54786C70-B31D-4156-B1EC-46693636C307'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Deve cadastrar Enquete informando vigência com período de 1 mês', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = '2048-01-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete.dataAte = '2048-02-01T00:00:00.000Z'//NECESSÁRIO INATIVAR ENQUETE CRIADA OU PREENCHER COM UMA DATA QUE O PERFIL/SUBPERFIL NÃO TENHA ENQUETE ATIVA
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.enqueteFuncao[1] = 'Motorista Autônomo'
        config.enquete.requestCreateEnquete.enqueteFuncao[2] = 'Oficina'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.enquete.requestCreateEnquete.perfisSelecionados[1] = '99261002-2617-4C67-824B-CC6F234D7E18'
        config.enquete.requestCreateEnquete.perfisSelecionados[2] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        config.enquete.requestCreateEnquete.perfisSelecionados[3] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        config.enquete.requestCreateEnquete.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        config.enquete.requestCreateEnquete.perfisSelecionados[5] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        config.enquete.requestCreateEnquete.perfisSelecionados[6] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        config.enquete.requestCreateEnquete.perfisSelecionados[7] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        config.enquete.requestCreateEnquete.perfisSelecionados[8] = '54786C70-B31D-4156-B1EC-46693636C307'
        config.enquete.requestCreateEnquete.perfisSelecionados[9] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        config.enquete.requestCreateEnquete.perfisSelecionados[10] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        config.enquete.requestCreateEnquete.perfisSelecionados[11] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        config.enquete.requestCreateEnquete.perfisSelecionados[12] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        config.enquete.requestCreateEnquete.perfisSelecionados[13] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        config.enquete.requestCreateEnquete.perfisSelecionados[14] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await enquete.cadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando perfil administrativo, auditor e dealer', async function () {
        /* PERFIS ADMINISTRATIVOS
        Auditoria - Devpartner, Auditoria - Auditoria, Administrador-Cliente - Administrador-Cliente, 
        Dealer - Administrador, Dealer - Usuario, Auditoria - LTM*/
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = (data.getFullYear() + 28) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 2) + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'Não deve cadastrar enquete informando perfil administrativo, auditor e dealer ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Auditoria - Devpartner'
        config.enquete.requestCreateEnquete.enqueteFuncao[1] = 'Auditoria - Auditoria'
        config.enquete.requestCreateEnquete.enqueteFuncao[2] = 'Administrador-Cliente - Administrador-Cliente'
        config.enquete.requestCreateEnquete.enqueteFuncao[3] = 'Dealer - Administrador'
        config.enquete.requestCreateEnquete.enqueteFuncao[4] = 'Dealer - Usuario'
        config.enquete.requestCreateEnquete.enqueteFuncao[5] = 'Auditoria - LTM'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '54786C70-B31D-4156-B1EC-46693636C309'
        config.enquete.requestCreateEnquete.perfisSelecionados[1] = '54786C70-B31D-4156-B1EC-46693636C308'
        config.enquete.requestCreateEnquete.perfisSelecionados[2] = '03A183BA-1751-4679-A12C-69D4A46BE92A'
        config.enquete.requestCreateEnquete.perfisSelecionados[3] = 'A3B4408D-745B-4B2A-AD83-1F99C1F6A8C0'
        config.enquete.requestCreateEnquete.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BD'
        config.enquete.requestCreateEnquete.perfisSelecionados[5] = '778261CE-A850-4F39-95CB-F0BD630AE6BE'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar perfil', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = (data.getFullYear() + 30) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete sem perfil ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar subperfil', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = (data.getFullYear() + 31) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar título', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = (data.getFullYear() + 32) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = ''
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar data início', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        dataVigencia = (data.getFullYear() + 33) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = ''
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando data início menor que hoje', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 34) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = '2019-01-01T03:00:00.000Z'
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando data início com letra', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 35) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = 'AAA'
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando data início com caracteres especiais', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 36) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = '###'
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando data início maior que data fim', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = '2100-01-01T03:00:00.000Z'
        config.enquete.requestCreateEnquete.dataAte = '2090-01-01T03:00:00.000Z'
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar data fim', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 37) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = ''
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando data fim menor que hoje', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 38) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = '2019-01-01T03:00:00.000Z'
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando data fim com letra', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 39) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = 'AAA'
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando data fim com caracteres especiais', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 40) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = '###'
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando status inativo', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 41) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = false
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando subperfil no período de vigência de outra Enquete ativa', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = '2021-01-01T03:00:00.000Z'
        config.enquete.requestCreateEnquete.dataAte = '2021-12-31T03:00:00.000Z'
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar pergunta', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete2 = new bodyCreateEnquete2Factory()
		dataVigencia = (data.getFullYear() + 43) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete2.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar resposta', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete3 = new bodyCreateEnquete3Factory()
		dataVigencia = (data.getFullYear() + 44) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete3.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete informando somente 1 resposta', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete4 = new bodyCreateEnquete4Factory()
		dataVigencia = (data.getFullYear() + 45) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete4.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    xit('Não deve cadastrar Enquete sem informar descrição da resposta', async function () {
        var enquete = new ValidaEnquete()
        var bodyCreateEnquete = new bodyCreateEnqueteFactory()
		dataVigencia = (data.getFullYear() + 46) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestCreateEnquete = bodyCreateEnquete.build()
        config.enquete.requestCreateEnquete.descricao = 'enquete todos os perfis ' + dataNome
        config.enquete.requestCreateEnquete.dataDe = dataVigencia
        config.enquete.requestCreateEnquete.dataAte = dataVigencia
        config.enquete.requestCreateEnquete.ativo = true
        config.enquete.requestCreateEnquete.enqueteFuncao[0] = 'Frota'
        config.enquete.requestCreateEnquete.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.enquete.requestCreateEnquete.enquetePergunta[1].enqueteResposta[1].descricao = ''
        await enquete.naoCadastrarEnquete(config.enquete)
    })

    //BUG 97512 - [API] Editar enquete sem data criação grava nulo no banco
    xit('Deve editar qualquer informação da Enquete antes do período de vigência', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.descricao = 'Editar enquete ' + dataNome
        await enquete.editarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar título', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.descricao = ''
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar perfil', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete2 = new bodyEditEnquete2Factory()
        config.enquete.requestEditEnquete = bodyEditEnquete2.build()
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar subperfil', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete3 = new bodyEditEnquete3Factory()
        config.enquete.requestEditEnquete = bodyEditEnquete3.build()      
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar data início', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataDe = ''
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando data início menor que hoje', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataDe = '2019-01-01T03:00:00.000Z'
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando data início com letra', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataDe = 'AAA'
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando data início com caracteres especiais', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataDe = '###'
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando data início maior que data fim', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataDe = '2025-01-01T03:00:00.000Z'
        config.enquete.requestEditEnquete.dataAte = '2024-01-01T03:00:00.000Z'
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar data fim', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataAte = ''
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando data fim menor que hoje', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataAte = '2019-01-01T03:00:00.000Z'
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando data fim com letra', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataAte = 'AAA'
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando data fim com caracteres especiais', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataAte = '###'
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando subperfil no período de vigência de outro enquete ativo', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        dataVigencia = (data.getFullYear() + 10) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        config.enquete.requestEditEnquete.dataDe = dataVigencia
        config.enquete.requestEditEnquete.dataAte = dataVigencia
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar pergunta', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete4 = new bodyEditEnquete4Factory()
        config.enquete.requestEditEnquete = bodyEditEnquete4.build()
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar resposta', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete5 = new bodyEditEnquete5Factory()
        config.enquete.requestEditEnquete = bodyEditEnquete5.build()
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete informando somente 1 resposta', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete6 = new bodyEditEnquete6Factory()
        config.enquete.requestEditEnquete = bodyEditEnquete6.build()
        await enquete.naoEditarEnquete(config.enquete)
    })

    xit('Não deve editar Enquete sem informar descrição da resposta', async function () {
        var enquete = new ValidaEnquete()
        var bodyEditEnquete = new bodyEditEnqueteFactory()
        config.enquete.requestEditEnquete = bodyEditEnquete.build()
        for(var i = 0; i < config.enquete.requestEditEnquete.enquetePergunta.length; i++) {
            for(var j = 0; j < config.enquete.requestEditEnquete.enquetePergunta[i].enqueteResposta.length; j++) {
                config.enquete.requestEditEnquete.enquetePergunta[i].enqueteResposta[j].descricao = ''
            }
        }
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Deve editar data fim da Enquete durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente(config.enquete)
        await enquete.bodyEditarDataFimenquete()//REVER ESTRUTURA DO BODY NA FUNCTION
        config.enquete.requestEditEnquete.dataAte = '2022-12-31T03:00:00.000Z'
        await enquete.editarenquete(config.enquete)
    })

    it('Deve editar status da Enquete de ativo para inativo durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        await enquete.editarenquete(config.enquete)
    })

    it('Não deve editar status da Enquete de inativo para ativo durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteInativo()
        await enquete.bodyEditarenqueteAtivoInativo()
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar título da Enquete durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        config.enquete.requestEditEnquete.descricao = 'Não deve editar título do enquete durante o período de vigência'
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar perfil da Enquete durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        for(var i = 0; i < config.enquete.requestEditEnquete.enqueteFuncao.length; i++) {
            config.enquete.requestEditEnquete.enqueteFuncao[i] === ''
        } 
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar subperfil da Enquete durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        for(var j = 0; j < config.enquete.requestEditEnquete.perfisSelecionados.length; j++) {
            config.enquete.requestEditEnquete.perfisSelecionados[j] === ''
        }
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar data início da Enquete durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        config.enquete.requestEditEnquete.dataDe === data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar pergunta da Enquete durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        for(var k = 0; k < config.enquete.requestEditEnquete.Pergunta.length; k++) {
            config.enquete.requestEditEnquete.Pergunta[k].descricao === 'Não deve editar pergunta do enquete durante o período de vigência'
        }
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar Enquete adicionando pergunta durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        config.enquete.requestEditEnquete.Pergunta[2].descricao === 'Nova pergunta'
        for(var l = 0; l < 5; l++) {
            config.enquete.requestEditEnquete.Pergunta[2].Resposta[l].descricao = 'Nova resposta'
            config.enquete.requestEditEnquete.Pergunta[2].Resposta[l].correta = false
        }
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar resposta da Enquete durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        for(var k = 0; k < config.enquete.requestEditEnquete.Pergunta.length; k++) {
            for(var l = 0; l < config.enquete.requestEditEnquete.Pergunta[k].Resposta.length; l++) {
                config.enquete.requestEditEnquete.Pergunta[k].Resposta[l].descricao === 'Não deve editar resposta do enquete durante o período de vigência'
                config.enquete.requestEditEnquete.Pergunta[k].Resposta[l].correta === false
            }
        }
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Não deve editar Enquete adicionando resposta durante o período de vigência', async function () {
        var enquete = new ValidaEnquete()
        await enquete.enqueteAtivoVigente()
        await enquete.bodyEditarenqueteAtivoInativo()
        config.enquete.requestEditEnquete.Pergunta[0].descricao === 'Nova pergunta'
        config.enquete.requestEditEnquete.Pergunta[0].Resposta[5].descricao = 'Nova resposta'
        config.enquete.requestEditEnquete.Pergunta[0].Resposta[5].correta = false
        await enquete.naoEditarEnquete(config.enquete)
    })

    it('Deve consultar(listar) enquete existentes', async function () {
        var enquete = new ValidaEnquete()
        await enquete.consultarListaenquete()
    })

    it('Deve consultar enquete pelo id', async function () {
        var enquete = new ValidaEnquete()
        await enquete.consultarIdenquete()
    })        
}); 