'use strict';

var AuthService = require('../services/authService');
//var QuizquestionService = require('../services/quizquestionService');
//var QuizanswerService = require('../services/quizanswerService');
var BannerService = require('../services/bannerService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var client_Id = 1

describe('Testes na Api de criação de Banner', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve criar um Banner deslogado tipo JPEG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpeg';
        var fileName1 = 'Large1920x800.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpeg';
        var fileName2 = 'Small760x400.jpeg';

        //cria um banner
        return bannerService.createBanner(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner deslogado tipo PNG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.png';
        var fileName1 = 'Large1920x800.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.png';
        var fileName2 = 'Small760x400.jpeg';

        //cria um banner
        return bannerService.createBanner(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner deslogado tipo JPG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpg';
        var fileName1 = 'Large1920x800.jpg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpg';
        var fileName2 = 'Small760x400.jpg';

        //cria um banner
        return bannerService.createBanner(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Não deve criar um Banner deslogado do tipo JPEG com dimensões maior que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Extralarge3840x2160.jpeg';
        var fileName1 = 'Extralarge3840x2160.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpeg';
        var fileName2 = 'Large1920x800.jpeg';

        //cria um banner
        return bannerService.createBanner(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    })

    it('Não deve criar um Banner deslogado com tamanho maior que: desktop 1MB e mobile 500KB', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName1 = 'LargeGRANDE_1.5MB_1920x800.png';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName2 = 'LargeGRANDE_1.5MB_1920x800.png';

        //cria um banner
        return bannerService.createBanner(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    })

    it('Deve criar um Banner secundário logado para motorista autônomo tipo JPEG com dimensões igual ou menor que: desktop 400x320 e mobile 400x320', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Secundario400x320.jpeg';
        var fileName1 = 'Secundario400x320.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Secundario400x320.jpeg';
        var fileName2 = 'Secundario400x320.jpeg';

        //cria um banner
        return bannerService.createBannerSecloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner secundário logado para motorista autônomo tipo PNG com dimensões igual ou menor que: desktop 400x320 e mobile 400x320', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Secundario400x320.jpeg';
        var fileName1 = 'Secundario400x320.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Secundario400x320.jpeg';
        var fileName2 = 'Secundario400x320.jpeg';

        //cria um banner
        return bannerService.createBannerSecloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner secundário logado para motorista autônomo tipo JPG com dimensões igual ou menor que: desktop 400x320 e mobile 400x320', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Secundario400x320.jpeg';
        var fileName1 = 'Secundario400x320.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Secundario400x320.jpeg';
        var fileName2 = 'Secundario400x320.jpeg';

        //cria um banner
        return bannerService.createBannerSecloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Não deve criar um Banner secundário logado para motorista autônomo tipo JPEG com dimensão maior que: desktop 400x320 e mobile 400x320', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpeg';
        var fileName1 = 'Small760x400.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpeg';
        var fileName2 = 'Small760x400.jpeg';

        //cria um banner
        return bannerService.createBannerSecloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    })

    it('Não deve criar um Banner secundário logado para motorista autônomo tipo JPEG com dimensão maior que: desktop 1MB e mobile 500KB', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName1 = 'LargeGRANDE_1.5MB_1920x800.png';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName2 = 'LargeGRANDE_1.5MB_1920x800.png';

        //cria um banner
        return bannerService.createBannerSecloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    });

    it('Deve criar um Banner principal logado para motorista autônomo tipo JPEG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpeg';
        var fileName1 = 'Large1920x800.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpeg';
        var fileName2 = 'Small760x400.jpeg';

        //cria um banner
        return bannerService.createBannerPrincloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner principal logado para motorista autônomo tipo PNG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.png';
        var fileName1 = 'Large1920x800.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.png';
        var fileName2 = 'Small760x400.jpeg';

        //cria um banner
        return bannerService.createBannerPrincloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner principal logado para motorista autônomo tipo JPG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpg';
        var fileName1 = 'Large1920x800.jpg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpg';
        var fileName2 = 'Small760x400.jpg';

        //cria um banner
        return bannerService.createBannerPrincloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        })
    })

    it('Não deve criar um Banner principal logado para motorista autônomo tipo JPEG com dimensão maior que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Extralarge3840x2160.jpeg';
        var fileName1 = 'Extralarge3840x2160.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpeg';
        var fileName2 = 'Large1920x800.jpeg';

        //cria um banner
        return bannerService.createBannerPrincloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    })

    it('Não deve criar um Banner principal logado para motorista autônomo tipo JPEG com dimensão maior que: desktop 1MB e mobile 500KB', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName1 = 'LargeGRANDE_1.5MB_1920x800.png';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName2 = 'LargeGRANDE_1.5MB_1920x800.png';

        //cria um banner
        return bannerService.createBannerPrincloggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    });
    
    it('Deve criar um Banner popup logado para motorista autônomo tipo JPEG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpeg';
        var fileName1 = 'Large1920x800.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpeg';
        var fileName2 = 'Small760x400.jpeg';

        //cria um banner
        return bannerService.createBannerPoploggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Popup cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner popup logado para motorista autônomo tipo PNG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.png';
        var fileName1 = 'Large1920x800.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.png';
        var fileName2 = 'Small760x400.jpeg';

        //cria um banner
        return bannerService.createBannerPoploggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Popup cadastrado com sucesso");
        })
    })

    it('Deve criar um Banner popup logado para motorista autônomo tipo JPG com dimensões igual ou menor que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpg';
        var fileName1 = 'Large1920x800.jpg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Small760x400.jpg';
        var fileName2 = 'Small760x400.jpg';

        //cria um banner
        return bannerService.createBannerPoploggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Popup cadastrado com sucesso");
        })
    })

    it('Não deve criar um Banner popup logado para motorista autônomo tipo JPEG com dimensão maior que: desktop 1920x800 e mobile 760x400', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Extralarge3840x2160.jpeg';
        var fileName1 = 'Extralarge3840x2160.jpeg';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\Large1920x800.jpeg';
        var fileName2 = 'Large1920x800.jpeg';

        //cria um banner
        return bannerService.createBannerPoploggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    })

    it('Não deve criar um Banner popup logado para motorista autônomo tipo JPEG com dimensão maior que: desktop 1MB e mobile 500KB', function () {

        var bannerService = new BannerService(this);

        var filePath1 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName1 = 'LargeGRANDE_1.5MB_1920x800.png';
        var filePath2 = 'C:\\Users\\rafael.lima\\Desktop\\Evidências\\Mercedes\\Imagens\\LargeGRANDE_1.5MB_1920x800.png';
        var fileName2 = 'LargeGRANDE_1.5MB_1920x800.png';

        //cria um banner
        return bannerService.createBannerPoploggedMautonomo(token, filePath1, fileName1, filePath2, fileName2).then(function (responseBanner) {
            expect(responseBanner, 'Deve retornar status 200 ao criar Banner').to.have.status(config.util.HTTP.OK);
            expect(responseBanner.body).to.equal("Banner cadastrado com sucesso");
        }).catch(function (response) {
            expect(response).to.have.status(config.util.HTTP.BAD_REQUEST);
            console.log(response);
        });
    });
});

