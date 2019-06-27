'use strict';

var AuthService = require('../services/authService');
var NewsService = require('../services/newsService');
var NewscategoryService = require('../services/newscategoryService');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token
var client_Id = 1

describe('Testes na Api de Notícias', function () {

    before('setup', function () {
        var authService = new AuthService(this);

        return authService.authParticipant(config.ADMINUSERNAME, config.ADMINPASS, config.ADMINCLIENT_ID).then(function (response) {
            token = response.body.access_token;
        });
    });

    it('Deve criar uma notícia e participante deve visualizá-la', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNews(token, responseCategoria.body.Id).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve retornar status 200 ao criar notícia').to.have.status(config.util.HTTP.OK);
                expect(responseNoticia.body.Id).to.exist;
                console.log(responseNoticia.body.Id);
                //participante visualiza notícia
                return newsService.searchNews(token, responseNoticia.body.Id).then(function (responsesearchNoticia) {
                    expect(responsesearchNoticia, 'Deve retornar status 200 ao visualizar notícia').to.have.status(config.util.HTTP.OK);
                    expect(responsesearchNoticia.body.Id).to.exist;
                });
            });

        });
    });

    it('Deve criar uma notícia, atualizá-la e participante deve visualizá-la', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNews(token, responseCategoria.body.Id).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve retornar status 200 ao criar notícia').to.have.status(config.util.HTTP.OK);
                expect(responseNoticia.body.Id).to.exist;
                //realiza update da notícia criada
                return newsService.updateNews(token, responseNoticia.body.Id, responseCategoria.body.Id).then(function (responseNoticiaatualizada) {
                    expect(responseNoticiaatualizada, 'Deve retornar status 200 ao atualizar notícia').to.have.status(config.util.HTTP.OK);
                    expect(responseNoticiaatualizada.body.Id).to.exist;
                    //participante visualiza notícia
                    return newsService.searchNews(token, responseNoticiaatualizada.body.Id).then(function (responsesearchNoticia) {
                        expect(responsesearchNoticia, 'Deve retornar status 200 ao visualizar notícia').to.have.status(config.util.HTTP.OK);
                        expect(responsesearchNoticia.body.Id).to.exist;
                    });
                });

            });
        });
    });
    //REGRA VALIDADA NO FRONT. PENDENTE INCLUSÃO NA API.
    xit('Finalizar cadastro de notícia com campo categoria vazio', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNewsemptycategory(token, responseCategoria.body.Id).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.BAD_REQUEST);
            })
        });
    });

    it('Não deve permitir finalização de cadastro de notícia sem token', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNewsemptycategory(/*token,*/ responseCategoria.body.Id).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.UNAUTHORIZED);
            }).catch(function (responseNoticia) {
                expect(responseNoticia).to.have.status(config.util.HTTP.UNAUTHORIZED);
            });
        });
    });
    //PENDENTE TRATAR RESPOSTA. RETORNA 500 E DEVE RETORNAR 400
    xit('Não deve permitir finalização de cadastro de notícia com campo subtítulo com mais de 120 caracteres', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);
        var news = {
            Subtitle: "oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo"
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNewsemptycategory(token, responseCategoria.body.Id, news).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.BAD_REQUEST);
            });//.catch(function (responseNoticia) {
            // });
        });
    });
    //REGRA VALIDADA NO FRONT. PENDENTE INCLUSÃO NA API.
    xit('Não deve permitir finalização de cadastro de notícia com campo subtítulo vazio', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);
        var news = {
            Subtitle: ""
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNews(token, responseCategoria.body.Id, news).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.BAD_REQUEST);
            });
        });
    });
    //PENDENTE TRATAR RESPOSTA. RETORNA 500 E DEVE RETORNAR 400
    xit('Não deve permitir finalização de cadastro de notícia com campo título com mais de 60 caracteres', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);
        var news = {
            Title: "oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oo"
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNewsemptycategory(token, responseCategoria.body.Id, news).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.BAD_REQUEST);
            });//.catch(function (responseNoticia) {
               // expect(responseNoticia).to.have.status(config.util.HTTP.BAD_REQUEST);
            //});
        });
    });
    //REGRA VALIDADA NO FRONT. PENDENTE INCLUSÃO NA API.
    xit('Não deve permitir finalização de cadastro de notícia com campo título vazio', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);
        var news = {
            Title: ""
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNews(token, responseCategoria.body.Id, news).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.BAD_REQUEST);
            });//.catch(function (responseNoticia) {
            // expect(responseNoticia).to.have.status(config.util.HTTP.BAD_REQUEST);
            //});
        });
    });
    //REGRA VALIDADA NO FRONT. PENDENTE INCLUSÃO NA API.
    xit('Não deve permitir finalização de cadastro de notícia com campo conteúdo com mais de 120 caracteres', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);
        var news = {
            Content: "oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oooooooooo oo"
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNewsemptycategory(token, responseCategoria.body.Id, news).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.BAD_REQUEST);
            });//.catch(function (responseNoticia) {
            // expect(responseNoticia).to.have.status(config.util.HTTP.BAD_REQUEST);
            //});
        });
    });
    //REGRA VALIDADA NO FRONT. PENDENTE INCLUSÃO NA API.
    xit('Não deve permitir finalização de cadastro de notícia com campo conteúdo vazio', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);
        var news = {
            Content: ""
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNews(token, responseCategoria.body.Id, news).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve impedir o cadastro da notícia').to.have.status(config.util.HTTP.BAD_REQUEST);
            });//.catch(function (responseNoticia) {
            //  expect(responseNoticia).to.have.status(config.util.HTTP.BAD_REQUEST);
            //});
        });
    });

    it('Deve visualizar todas as notícias cadastradas', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);

        //visualiza todas as notícias cadastradas
        return newsService.searchallNews(token).then(function (responsesearchallNoticias) {
            expect(responsesearchallNoticias, 'Deve retornar status 200 ao visualizar todas as notícias cadastradas').to.have.status(config.util.HTTP.OK);
            expect(responsesearchallNoticias.body).to.exist;
        });
    });

    //cria noticia faz uma varredura e identifica noticia cadastrada

    //cadastrar noticia como rascunho e participante não deve visualizar
    it('Deve criar uma notícia como rascunho', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);

        var news = {
            IsDraft: 0
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNews(token, responseCategoria.body.Id).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve retornar status 200 ao criar notícia').to.have.status(config.util.HTTP.OK);
                expect(responseNoticia.body.Id).to.exist;
                //participante visualiza notícia
                return newsService.searchNews(token, responseNoticia.body.Id).then(function (responsesearchNoticia) {
                    expect(responsesearchNoticia, 'Deve retornar status 200 ao visualizar notícia').to.have.status(config.util.HTTP.OK);
                    expect(responsesearchNoticia.body.IsDraft).equal(false);
                });
            });

        });
    });

    //cadastrar notícia como inativa não deve visualizar
    it('Deve criar uma notícia como inativa', function () {

        var newsService = new NewsService(this);
        var newscategoryService = new NewscategoryService(this);

        var news = {
            IsActive: 0
        };

        //cria uma categoria
        return newscategoryService.createCategory1(token).then(function (responseCategoria) {
            expect(responseCategoria, 'Deve retornar status 200 ao criar categoria').to.have.status(config.util.HTTP.OK);
            expect(responseCategoria.body.Id).to.exist;
            //cria uma noticia atrelada a categoria criada
            return newsService.createNews(token, responseCategoria.body.Id).then(function (responseNoticia) {
                expect(responseNoticia, 'Deve retornar status 200 ao criar notícia').to.have.status(config.util.HTTP.OK);
                expect(responseNoticia.body.Id).to.exist;
                //participante visualiza notícia
                return newsService.searchNews(token, responseNoticia.body.Id).then(function (responsesearchNoticia) {
                    expect(responsesearchNoticia, 'Deve retornar status 200 ao visualizar notícia').to.have.status(config.util.HTTP.OK);
                    expect(responsesearchNoticia.body.IsActive).equal(false);
                });
            });

        });
    });
});
