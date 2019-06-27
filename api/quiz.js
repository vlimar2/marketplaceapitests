'use strict';

var AuthService = require('../services/authService');
var Token = require('../validation/token');
var ValidaQuiz = require('../validation/validaQuiz')
var QuizquestionService = require('../services/quizquestionService');
var QuizanswerService = require('../services/quizanswerService');
var QuizService = require('../services/quizService');
var BodyCreateQuizFactory = require('../factories/bodyCreateQuizFactory')
var BodyCreateQuiz2Factory = require('../factories/bodyCreateQuiz2Factory')
var BodyCreateQuiz3Factory = require('../factories/bodyCreateQuiz3Factory')
var BodyCreateQuiz4Factory = require('../factories/bodyCreateQuiz4Factory')
var BodyEditQuizFactory = require('../factories/bodyEditQuizFactory')
var BodyEditQuiz2Factory = require('../factories/bodyEditQuiz2Factory')
var BodyEditQuiz3Factory = require('../factories/bodyEditQuiz3Factory')
var BodyEditQuiz4Factory = require('../factories/bodyEditQuiz4Factory')
var BodyEditQuiz5Factory = require('../factories/bodyEditQuiz5Factory')
var BodyEditQuiz6Factory = require('../factories/bodyEditQuiz6Factory')
var moment = require('moment')
var client_Id = 1
var dataVigencia
var data = new Date()
var dataNome = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate()

describe('Testes na Api de Quiz', function () {

    before('setup', async function () {
        var acesso = new Token()
        config.quiz.login = config.ADMINUSERNAME
        config.quiz.senha = config.ADMINPASS
        config.quiz.client_id = config.ADMINCLIENT_ID
        config.quiz.token = await acesso.gerarToken(config.quiz)
    })

    //PERFIL ADMINISTRADOR, AUDITORIA E DEALER NÃO PODEM SER INCLUIRDOS NO QUIZ
    xit('Deve cadastrar Quiz com todos os perfis e subperfis', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 100) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 7) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.quizFuncao[1] = 'Motorista Autônomo'
        config.quiz.requestCreateQuiz.quizFuncao[2] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.quiz.requestCreateQuiz.perfisSelecionados[1] = '99261002-2617-4C67-824B-CC6F234D7E18'
        config.quiz.requestCreateQuiz.perfisSelecionados[2] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        config.quiz.requestCreateQuiz.perfisSelecionados[3] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        config.quiz.requestCreateQuiz.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        config.quiz.requestCreateQuiz.perfisSelecionados[5] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        config.quiz.requestCreateQuiz.perfisSelecionados[6] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        config.quiz.requestCreateQuiz.perfisSelecionados[7] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        config.quiz.requestCreateQuiz.perfisSelecionados[8] = '54786C70-B31D-4156-B1EC-46693636C307'
        config.quiz.requestCreateQuiz.perfisSelecionados[9] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        config.quiz.requestCreateQuiz.perfisSelecionados[10] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        config.quiz.requestCreateQuiz.perfisSelecionados[11] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        config.quiz.requestCreateQuiz.perfisSelecionados[12] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        config.quiz.requestCreateQuiz.perfisSelecionados[13] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        config.quiz.requestCreateQuiz.perfisSelecionados[14] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e todos os subperfis', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 11) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 4) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz Frota e todos os subperfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.quiz.requestCreateQuiz.perfisSelecionados[1] = '99261002-2617-4C67-824B-CC6F234D7E18'
        config.quiz.requestCreateQuiz.perfisSelecionados[2] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        config.quiz.requestCreateQuiz.perfisSelecionados[3] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        config.quiz.requestCreateQuiz.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        config.quiz.requestCreateQuiz.perfisSelecionados[5] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        config.quiz.requestCreateQuiz.perfisSelecionados[6] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        config.quiz.requestCreateQuiz.perfisSelecionados[7] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Gestor Frota', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 12) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Gestor Frota ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Proprietário', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 13) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Proprietário ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Comprador', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 14) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Comprador ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Outros', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 15) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Outros ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Representante Legal', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 16) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Representante Legal ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Gestor de Manutenção', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 17) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Gestor de Manutenção ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Motorista', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 18) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Motorista ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '99261002-2617-4C67-824B-CC6F234D7E18'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Frota e subperfil Almoxarifado', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 19) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Frota e subperfil Almoxarifado ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Oficina e todos os subperfis', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 20) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Oficina e todos os subperfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        config.quiz.requestCreateQuiz.perfisSelecionados[1] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        config.quiz.requestCreateQuiz.perfisSelecionados[2] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        config.quiz.requestCreateQuiz.perfisSelecionados[3] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        config.quiz.requestCreateQuiz.perfisSelecionados[4] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        config.quiz.requestCreateQuiz.perfisSelecionados[5] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Oficina e subperfil Outros', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 21) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Oficina e subperfil Outros ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Oficina e subperfil Comprador', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 22) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Oficina e subperfil Comprador ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Oficina e subperfil Gerente', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 23) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Oficina e subperfil Gerente ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Oficina e subperfil Proprietário', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 24) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Oficina e subperfil Proprietário ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Oficina e subperfil Mecânico', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 25) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Oficina e subperfil Mecânico ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz com perfil Oficina e subperfil Representante Legal', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 26) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Oficina e subperfil Representante Legal ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await quiz.cadastrarQuiz(config.quiz)
    })

    it('Deve cadastrar Quiz com perfil Motorista Autônomo e subperfil Motorista Autônomo', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 27) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 1) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz perfil Motorista Autônomo e subperfil Motorista Autônomo ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = "2019-05-21T03:00:00.000Z" //dataVigencia
        config.quiz.requestCreateQuiz.dataAte = "2019-05-21T03:00:00.000Z" //dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Motorista Autônomo'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '54786C70-B31D-4156-B1EC-46693636C307'
        await quiz.cadastrarQuiz(config.quiz)
    })

    xit('Deve cadastrar Quiz informando vigência com período de 1 mês', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = (data.getFullYear() + 29) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz.dataAte = (data.getFullYear() + 29) + '-' + moment.utc(data.getMonth() + 1).format('MM') + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.quizFuncao[1] = 'Motorista Autônomo'
        config.quiz.requestCreateQuiz.quizFuncao[2] = 'Oficina'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.quiz.requestCreateQuiz.perfisSelecionados[1] = '99261002-2617-4C67-824B-CC6F234D7E18'
        config.quiz.requestCreateQuiz.perfisSelecionados[2] = 'A25F81B5-6385-49FD-8DF0-8A2C6315490A'
        config.quiz.requestCreateQuiz.perfisSelecionados[3] = '5E3AF20B-5545-4F0A-8D8F-D218E21B67CE'
        config.quiz.requestCreateQuiz.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BC'
        config.quiz.requestCreateQuiz.perfisSelecionados[5] = '5945342B-CCE1-4EB8-97EE-9355A2D09337'
        config.quiz.requestCreateQuiz.perfisSelecionados[6] = '066F9B7F-D7F7-441D-BE22-B20D16586571'
        config.quiz.requestCreateQuiz.perfisSelecionados[7] = 'ED46B925-DC54-43E9-A3DC-8EEFBEA3577C'
        config.quiz.requestCreateQuiz.perfisSelecionados[8] = '54786C70-B31D-4156-B1EC-46693636C307'
        config.quiz.requestCreateQuiz.perfisSelecionados[9] = '01ED56C6-4DD2-4EB8-A00F-9364D4D72DB0'
        config.quiz.requestCreateQuiz.perfisSelecionados[10] = '31FA37DE-1C15-4C68-B068-66B361F5A731'
        config.quiz.requestCreateQuiz.perfisSelecionados[11] = '594C417D-3F20-452F-BA0E-AA1A44038E21'
        config.quiz.requestCreateQuiz.perfisSelecionados[12] = '54F7D870-BE1A-46AC-BAAA-2073C524E718'
        config.quiz.requestCreateQuiz.perfisSelecionados[13] = '7F10233D-F450-4224-9A95-EC5EC9FAA99D'
        config.quiz.requestCreateQuiz.perfisSelecionados[14] = 'DE5D8249-93BC-4046-A03B-A78D67C4E915'
        await quiz.cadastrarQuiz(config.quiz)
    })

    //BUG
    xit('Não deve cadastrar Quiz informando perfil administrativo, auditor e dealer', async function () {
        /* PERFIS ADMINISTRATIVOS
        Auditoria - Devpartner, Auditoria - Auditoria, Administrador-Cliente - Administrador-Cliente, 
        Dealer - Administrador, Dealer - Usuario, Auditoria - LTM*/
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 28) + '-' + moment.utc(data.getMonth()).format('MM') + '-' + (data.getDate() + 2) + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Não deve cadastrar Quiz informando perfil administrativo, auditor e dealer ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Auditoria - Devpartner'
        config.quiz.requestCreateQuiz.quizFuncao[1] = 'Auditoria - Auditoria'
        config.quiz.requestCreateQuiz.quizFuncao[2] = 'Administrador-Cliente - Administrador-Cliente'
        config.quiz.requestCreateQuiz.quizFuncao[3] = 'Dealer - Administrador'
        config.quiz.requestCreateQuiz.quizFuncao[4] = 'Dealer - Usuario'
        config.quiz.requestCreateQuiz.quizFuncao[5] = 'Auditoria - LTM'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '54786C70-B31D-4156-B1EC-46693636C309'
        config.quiz.requestCreateQuiz.perfisSelecionados[1] = '54786C70-B31D-4156-B1EC-46693636C308'
        config.quiz.requestCreateQuiz.perfisSelecionados[2] = '03A183BA-1751-4679-A12C-69D4A46BE92A'
        config.quiz.requestCreateQuiz.perfisSelecionados[3] = 'A3B4408D-745B-4B2A-AD83-1F99C1F6A8C0'
        config.quiz.requestCreateQuiz.perfisSelecionados[4] = '778261CE-A850-4F39-95CB-F0BD630AE6BD'
        config.quiz.requestCreateQuiz.perfisSelecionados[5] = '778261CE-A850-4F39-95CB-F0BD630AE6BE'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar perfil', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 30) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz sem perfil ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar subperfil', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 31) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar título', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 32) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = ''
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar data início', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        dataVigencia = (data.getFullYear() + 33) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = ''
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando data início menor que hoje', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 34) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = '2019-01-01T03:00:00.000Z'
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando data início com letra', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 35) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = 'AAA'
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando data início com caracteres especiais', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 36) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = '###'
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando data início maior que data fim', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = '2100-01-01T03:00:00.000Z'
        config.quiz.requestCreateQuiz.dataAte = '2090-01-01T03:00:00.000Z'
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar data fim', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 37) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = ''
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando data fim menor que hoje', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 38) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = '2019-01-01T03:00:00.000Z'
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando data fim com letra', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 39) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = 'AAA'
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando data fim com caracteres especiais', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 40) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = '###'
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    //BUG 96419 - [API] Está cadastrando Quiz inativo
    xit('Não deve cadastrar Quiz informando status inativo', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 41) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = false
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando subperfil no período de vigência de outro Quiz ativo', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = '2021-01-01T03:00:00.000Z'
        config.quiz.requestCreateQuiz.dataAte = '2021-12-31T03:00:00.000Z'
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar pergunta', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz2 = new BodyCreateQuiz2Factory()
		dataVigencia = (data.getFullYear() + 43) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz2.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar resposta', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz3 = new BodyCreateQuiz3Factory()
		dataVigencia = (data.getFullYear() + 44) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz3.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz informando somente 1 resposta', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz4 = new BodyCreateQuiz4Factory()
		dataVigencia = (data.getFullYear() + 45) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz4.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar descrição da resposta', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 46) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.quiz.requestCreateQuiz.Pergunta[0].Resposta[0].descricao = ''
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Não deve cadastrar Quiz sem informar resposta correta', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 47) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.quiz.requestCreateQuiz.Pergunta[0].Resposta[2].correta = false
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    //BUG 96459 - [API] Erro 500 ao cadastrar Quiz sem preencher descrição da pergunta
    xit('Não deve cadastrar Quiz sem informar nome da pergunta', async function () {
        var quiz = new ValidaQuiz()
        var bodyCreateQuiz = new BodyCreateQuizFactory()
		dataVigencia = (data.getFullYear() + 48) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestCreateQuiz = bodyCreateQuiz.build()
        config.quiz.requestCreateQuiz.descricao = 'Quiz todos os perfis ' + dataNome
        config.quiz.requestCreateQuiz.dataDe = dataVigencia
        config.quiz.requestCreateQuiz.dataAte = dataVigencia
        config.quiz.requestCreateQuiz.ativo = true
        config.quiz.requestCreateQuiz.quizFuncao[0] = 'Frota'
        config.quiz.requestCreateQuiz.perfisSelecionados[0] = '81FE735C-D2B4-4706-A33E-77DB67830B57'
        config.quiz.requestCreateQuiz.Pergunta[0].descricao = ''
        await quiz.naoCadastrarQuiz(config.quiz)
    })

    xit('Deve editar qualquer informação do Quiz antes do período de vigência', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.descricao = 'Editar Quiz ' + dataNome
        await quiz.editarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar título', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.descricao = ''
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar perfil', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz2 = new BodyEditQuiz2Factory()
        config.quiz.requestEditQuiz = bodyEditQuiz2.build()
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar subperfil', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz3 = new BodyEditQuiz3Factory()
        config.quiz.requestEditQuiz = bodyEditQuiz3.build()      
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar data início', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataDe = ''
        await quiz.naoEditarQuiz(config.quiz)
    })

    //BUG 96520 - [API] Erro 500 ao editar Quiz com data menor que hoje
    xit('Não deve editar Quiz informando data início menor que hoje', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataDe = '2019-01-01T03:00:00.000Z'
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz informando data início com letra', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataDe = 'AAA'
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz informando data início com caracteres especiais', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataDe = '###'
        await quiz.naoEditarQuiz(config.quiz)
    })

    //BUG 96522 - [API] Mensagem de erro "A data do campo Data fim deve ser maior ou igual a data do campo Data fim"
    xit('Não deve editar Quiz informando data início maior que data fim', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataDe = '2025-01-01T03:00:00.000Z'
        config.quiz.requestEditQuiz.dataAte = '2024-01-01T03:00:00.000Z'
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar data fim', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataAte = ''
        await quiz.naoEditarQuiz(config.quiz)
    })

    //BUG 96522 - [API] Mensagem de erro "A data do campo Data fim deve ser maior ou igual a data do campo Data fim"
    xit('Não deve editar Quiz informando data fim menor que hoje', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataAte = '2019-01-01T03:00:00.000Z'
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz informando data fim com letra', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataAte = 'AAA'
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz informando data fim com caracteres especiais', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataAte = '###'
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz informando subperfil no período de vigência de outro Quiz ativo', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        dataVigencia = (data.getFullYear() + 10) + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        config.quiz.requestEditQuiz.dataDe = dataVigencia
        config.quiz.requestEditQuiz.dataAte = dataVigencia
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar pergunta', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz4 = new BodyEditQuiz4Factory()
        config.quiz.requestEditQuiz = bodyEditQuiz4.build()
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar resposta', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz5 = new BodyEditQuiz5Factory()
        config.quiz.requestEditQuiz = bodyEditQuiz5.build()
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz informando somente 1 resposta', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz6 = new BodyEditQuiz6Factory()
        config.quiz.requestEditQuiz = bodyEditQuiz6.build()
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar descrição da resposta', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        for(var i = 0; i < config.quiz.requestEditQuiz.Pergunta.length; i++) {
            for(var j = 0; j < config.quiz.requestEditQuiz.Pergunta[i].Resposta.length; j++) {
                config.quiz.requestEditQuiz.Pergunta[i].Resposta[j].descricao = ''
            }
        }
        await quiz.naoEditarQuiz(config.quiz)
    })

    xit('Não deve editar Quiz sem informar resposta correta', async function () {
        var quiz = new ValidaQuiz()
        var bodyEditQuiz = new BodyEditQuizFactory()
        config.quiz.requestEditQuiz = bodyEditQuiz.build()
        for(var i = 0; i < config.quiz.requestEditQuiz.Pergunta.length; i++) {
            for(var j = 0; j < config.quiz.requestEditQuiz.Pergunta[i].Resposta.length; j++) {
                config.quiz.requestEditQuiz.Pergunta[i].Resposta[j].correta = false
            }
        }
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Deve editar data fim do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente(config.quiz)
        await quiz.bodyEditarDataFimQuiz()//REVER ESTRUTURA DO BODY NA FUNCTION
        config.quiz.requestEditQuiz.dataAte = '2022-12-31T03:00:00.000Z'
        await quiz.editarQuiz(config.quiz)
    })

    it('Deve editar status do Quiz de ativo para inativo durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        await quiz.editarQuiz(config.quiz)
    })

    it('Não deve editar status do Quiz de inativo para ativo durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizInativo()
        await quiz.bodyEditarQuizAtivoInativo()
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar título do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        config.quiz.requestEditQuiz.descricao = 'Não deve editar título do Quiz durante o período de vigência'
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar perfil do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        for(var i = 0; i < config.quiz.requestEditQuiz.quizFuncao.length; i++) {
            config.quiz.requestEditQuiz.quizFuncao[i] === ''
        } 
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar subperfil do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        for(var j = 0; j < config.quiz.requestEditQuiz.perfisSelecionados.length; j++) {
            config.quiz.requestEditQuiz.perfisSelecionados[j] === ''
        }
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar data início do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        config.quiz.requestEditQuiz.dataDe === data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate() + 'T00:00:00.000Z'
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar pergunta do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        for(var k = 0; k < config.quiz.requestEditQuiz.Pergunta.length; k++) {
            config.quiz.requestEditQuiz.Pergunta[k].descricao === 'Não deve editar pergunta do Quiz durante o período de vigência'
        }
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar Quiz adicionando pergunta durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        config.quiz.requestEditQuiz.Pergunta[2].descricao === 'Nova pergunta'
        for(var l = 0; l < 5; l++) {
            config.quiz.requestEditQuiz.Pergunta[2].Resposta[l].descricao = 'Nova resposta'
            config.quiz.requestEditQuiz.Pergunta[2].Resposta[l].correta = false
        }
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar resposta do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        for(var k = 0; k < config.quiz.requestEditQuiz.Pergunta.length; k++) {
            for(var l = 0; l < config.quiz.requestEditQuiz.Pergunta[k].Resposta.length; l++) {
                config.quiz.requestEditQuiz.Pergunta[k].Resposta[l].descricao === 'Não deve editar resposta do Quiz durante o período de vigência'
                config.quiz.requestEditQuiz.Pergunta[k].Resposta[l].correta === false
            }
        }
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar Quiz adicionando resposta durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        config.quiz.requestEditQuiz.Pergunta[0].descricao === 'Nova pergunta'
        config.quiz.requestEditQuiz.Pergunta[0].Resposta[5].descricao = 'Nova resposta'
        config.quiz.requestEditQuiz.Pergunta[0].Resposta[5].correta = false
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Não deve editar resposta correta do Quiz durante o período de vigência', async function () {
        var quiz = new ValidaQuiz()
        await quiz.quizAtivoVigente()
        await quiz.bodyEditarQuizAtivoInativo()
        for(var k = 0; k < config.quiz.requestEditQuiz.Pergunta.length; k++) {
            for(var l = 0; l < config.quiz.requestEditQuiz.Pergunta[k].Resposta.length; l++) {
                config.quiz.requestEditQuiz.Pergunta[k].Resposta[l].correta === false
            }
        }
        await quiz.naoEditarQuiz(config.quiz)
    })

    it('Deve consultar(listar) Quiz existentes', async function () {
        var quiz = new ValidaQuiz()
        await quiz.consultarListaQuiz()
    })

    it('Deve consultar Quiz pelo id', async function () {
        var quiz = new ValidaQuiz()
        await quiz.consultarIdQuiz()
    })        
}); 