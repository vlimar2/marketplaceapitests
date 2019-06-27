'use strict';

var FaqlistService = require ('../services/FaqlistService')
var chai = require ('chai')
var assert = chai.assert
var expect = chai.expect

describe ('Testes de na API que lista todas as perguntas frequentes contidas no Fale conosco', function() {

    it('Deve retornar primeira pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[0].titulo, 'Deve retornar primeira pergunta da lista de perguntas frequentes').to.be.equal('O que é o Mercedes Club?');
        })
    })

    it('Deve retornar segunda pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[1].titulo, 'Deve retornar segunda pergunta da lista de perguntas frequentes').to.be.equal('Como faço para participar do Mercedes Club?');
        })
    })

    it('Deve retornar terceira pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[2].titulo, 'Deve retornar terceira pergunta da lista de perguntas frequentes').to.be.equal('Como faço acessar o Mercedes Club?');
        })
    })

    it('Deve retornar quarta pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[3].titulo, 'Deve retornar quarta pergunta da lista de perguntas frequentes').to.be.equal('Como acumular pontos?');
        })
    })

    it('Deve retornar quinta pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[4].titulo, 'Deve retornar quinta pergunta da lista de perguntas frequentes').to.be.equal('Em quais transações acúmulo pontos?');
        })
    })

    it('Deve retornar sexta pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[5].titulo, 'Deve retornar sexta pergunta da lista de perguntas frequentes').to.be.equal('Quem participa do acúmulo de pontos?');
        })
    })

    it('Deve retornar sétima pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[6].titulo, 'Deve retornar sétima pergunta da lista de perguntas frequentes').to.be.equal('Como faço para utilizar meus pontos?');
        })
    })

    it('Deve retornar oitava pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[7].titulo, 'Deve retornar oitava pergunta da lista de perguntas frequentes').to.be.equal('Em quais transações posso resgatar pontos?');
        })
    })

    it('Deve retornar nona pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[8].titulo, 'Deve retornar nona pergunta da lista de perguntas frequentes').to.be.equal('Qual é a validade dos meus pontos?');
        })
    })
    
    it('Deve retornar décima pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[9].titulo, 'Deve retornar décima pergunta da lista de perguntas frequentes').to.be.equal('Em quanto tempo os pontos serão creditados?');
        })
    })

    it('Deve retornar  décima primeira pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[10].titulo, 'Deve retornar décima primeira pergunta da lista de perguntas frequentes').to.be.equal('Meus pontos não foram creditados, como devo proceder?');
        })
    })

    it('Deve retornar décima segunda pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[11].titulo, 'Deve retornar décima segunda pergunta da lista de perguntas frequentes').to.be.equal('Como acumular estrelas?');
        })
    })

    it('Deve retornar décima terceira pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[12].titulo, 'Deve retornar décima terceira pergunta da lista de perguntas frequentes').to.be.equal('Em quais ações acúmulo estrelas?');
        })
    })

    it('Deve retornar décima quarta pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[13].titulo, 'Deve retornar décima quarta pergunta da lista de perguntas frequentes').to.be.equal('Quem participa do acúmulo de estrelas?');
        })
    })

    it('Deve retornar décima quinta pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[14].titulo, 'Deve retornar décima quinta pergunta da lista de perguntas frequentes').to.be.equal('Qual é a vigência das estrelas?');
        })
    })

    it('Deve retornar décima sexta pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[15].titulo, 'Deve retornar décima sexta pergunta da lista de perguntas frequentes').to.be.equal('Clientes de outras marcas poderão participar do Mercedes Club?');
        })
    })

    it('Deve retornar décima sétima pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[16].titulo, 'Deve retornar décima sétima pergunta da lista de perguntas frequentes').to.be.equal('Onde encontro o regulamento do Mercedes Club?');
        })
    })

    it('Deve retornar décima oitava pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[17].titulo, 'Deve retornar décima oitava pergunta da lista de perguntas frequentes').to.be.equal('Esqueci minha senha ou login de acesso ao Mercedes Club. O que fazer?');
        })
    })

    it('Deve retornar décima nona pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[18].titulo, 'Deve retornar décima nona pergunta da lista de perguntas frequentes').to.be.equal('Não tenho pontos suficiente para trocar pelo produto que desejo. O que fazer?');
        })
    })
    it('Deve retornar vigésima pergunta da lista de perguntas frequentes', function(){
        var faqlistService = new FaqlistService(this);

        return faqlistService.listfaq().then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.body[19].titulo, 'Deve retornar vigésima pergunta da lista de perguntas frequentes').to.be.equal('Depois que finalizo a troca de pontos, posso desistir?');
        })
    })
})