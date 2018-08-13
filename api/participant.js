'use strict';

var AuthService = require('../services/authService');
var ParticipantService = require('../services/participantService');
var Participantfactory = require('../factories/participantfactory');
var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var token;
var usertoken;

describe('Testes na Api de Participante', function() {

    before('setup', function() {
        var authServiceclient = new AuthService(this);
        var participantService = new ParticipantService(this);

        return authServiceclient.authClient(config.CAMPAIGN_ID).then(function(response) {
            token = response.body.access_token;

            return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(responseuser){                
                var token = JSON.parse(responseuser.text);                
                usertoken = token.ticket.access_token;
            });
        });
    });

    it('Deve autenticar participante utilizando Login e Senha', function(){
        var participantService = new ParticipantService(this);

        return participantService.Authenticate(config.credentials.user,config.credentials.pwd,config.credentials.url).then(function(response){
            expect(response, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
            expect(response.error,'Deve estar sem erros na resposta').to.equal(false);
            expect(response.text, 'Deve retornar o token').to.not.be.undefined;
            var token = JSON.parse(response.text);
            expect(token.ticket, 'Deve retornar um ticket').to.not.be.undefined;
            expect(token.ticket.access_token, 'Deve retornar um access token').to.not.be.undefined;
            expect(parseInt(token.participantId), 'Deve retornar o mesmo participantid da autenticação').to.be.equal(config.credentials.participantId);
        });
    });

    it('Deve impedir autenticar participante com login e senha inválidos', function(){
        var participantService = new ParticipantService(this);
        
        return participantService.Authenticate(config.credentials.user,'dasdasdsadsad',config.credentials.url).then(function(response){
            expect(response, 'Deve responder com BadRequest no status').to.have.status(config.util.HTTP.BAD_REQUEST);
        }).catch(function(response){
            expect(response, 'Deve responder com BadRequest no status').to.have.status(config.util.HTTP.BAD_REQUEST);
            expect(response.response.body.errors.length,'Deve retornar um array com o erro').to.be.above(0);
            expect(response.response.body.errors[0].message, 'Deve retornar mensagem de login inválido').to.be.equal('Usuário e/ou senha incorretos. Numero de tentativas restantes para o bloqueio: 2');                    
        });
    });

    it('Deve criar um participante', function() {
        var factory = new Participantfactory();
        var currentdate = new Date();

        
        var participant = factory.buildDefault();        
        participant.Username = "TESTEAPI1"+currentdate.getMonth()+currentdate.getDay()+currentdate.getHours()+currentdate.getMinutes();
        var participantService = new ParticipantService(this);

        return participantService.createParticipant(token,participant).then(function(response) {
            expect(response,'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.error, 'Deve retornar error como false').to.equal(false);            
            expect(response.body.participantId, 'Deve retornar participantId maior que zero').to.be.above(0);
        });
    });

    it('Deve criar um participante e autenticar com o mesmo', function() {
        var factory = new Participantfactory();
        var currentdate = new Date();
        var authServiceclient = new AuthService(this);
        
        var participant = factory.buildDefault();        
        participant.Password = '123456';
        participant.Username = "TESTEAPI2"+currentdate.getFullYear()+currentdate.getMonth()+currentdate.getDay()+currentdate.getHours()+currentdate.getMinutes();
        var participantService = new ParticipantService(this);

        return participantService.createParticipant(token,participant).then(function(response) {
            expect(response,'Deve retornar status 200 ao criar o participante').to.have.status(config.util.HTTP.OK);
            expect(response.error, 'Deve retornar error como false').to.equal(false);
            expect(response.body.participantId, 'Deve retornar participantId maior que zero').to.be.above(0);
                    
            return participantService.Authenticate(participant.Username,participant.Password,config.credentials.url).then(function(responseauth){
                expect(responseauth, 'Deve responder com OK no status').to.have.status(config.util.HTTP.OK);
                expect(responseauth.error,'Deve estar sem erros na resposta').to.equal(false);
                expect(responseauth.text, 'Deve retornar o token').to.not.be.undefined;
                var token = JSON.parse(responseauth.text);
                expect(token.ticket, 'Deve retornar um ticket').to.not.be.undefined;
                expect(token.ticket.access_token, 'Deve retornar um access token').to.not.be.undefined;
                expect(token.participantId, 'Deve retornar o mesmo participantid da autenticação').to.be.equal(response.body.participantId.toString());
            }); 
        });
    });
    
   
    it('Deve buscar e atualizar um participante', function() {
        var factory = new Participantfactory();
        var currentdate = new Date();

        
        var newparticipant = factory.buildDefault();        
        newparticipant.Username = "TESTEAPI3"+currentdate.getMonth()+currentdate.getDay()+currentdate.getHours()+currentdate.getMinutes();
        var participantService = new ParticipantService(this);
        var authService = new AuthService(this);

        var participant; 

        return participantService.createParticipant(token,newparticipant).then(function(response) {
            expect(response).to.have.status(config.util.HTTP.OK);
            expect(response.error).to.equal(false);            
            expect(response.body.participantId).to.be.above(0);

            participant = newparticipant;
            participant.ParticipantId = response.body.participantId;
            participant.MaritalStatusId=2;
            participant.PersonTypeId=1;            
            participant.Name="participante atualizado";
            participant.CPF="72778648160";
            participant.RG="114455236";
            participant.CNPJ=null;
            participant.Password="meupassatualizado";
            participant.Gender=2;
            participant.BirthDate="01/02/1989";
            participant.Address[0].AddressText = "Rua teste Stub atualizado";
            participant.Address[0].AddressName = "Minha Casa atualizado";
            participant.Address[0].Number = "20";
            participant.Address[0].Complement = "apto 45 atualizado";
            participant.Address[0].District = "Bairro de teste atualizado";
            participant.Address[0].City = "Cidada de Teste atualizado";
            participant.Address[0].State = "MG"; 
            participant.Address[0].ZipCode = "30320150";
            participant.Address[0].Reference = "Próximo ao shopping atualizado";
            participant.Phones[0].Ddd="31";
            participant.Phones[0].Number="39548710";
            participant.Phones[0].PhoneType=2;
            participant.Accepts[0].OptInId=1;
            participant.Accepts[0].Checked=false;
            participant.Emails[0].EmailText="testeqa@teste.com";
            participant.Emails[0].EmailType=2;

            return participantService.updateParticipant(token,participant, 'me').then(function(responseupd){
                expect(responseupd).to.have.status(config.util.HTTP.OK);
                expect(responseupd.error).to.equal(false);            
                expect(responseupd.body.participantId).to.be.above(0);

                return authService.authParticipant(config.CAMPAIGN_ID, response.body.participantId).then(function(responseauth){                    
                    var tokenparticipant = responseauth.body.access_token;
                   
                    return participantService.getParticipant(tokenparticipant).then(function(responseget){
                        expect(responseget, 'Deve obter o participante atualizado com sucesso').to.have.status(config.util.HTTP.OK);
                        expect(responseget.error, 'Deve obter o participante com a propriedade error do response como False').to.equal(false);
                        expect(responseget.body.id, 'Deve obter o mesmo id de participante utilizado a atualização').to.equal(participant.ParticipantId);
                        expect(responseget.body.maritalStatusId, 'Deve obter o id de estado civil atualizado').to.equal(participant.MaritalStatusId);
                        expect(responseget.body.name, 'Deve obter o nome do participante atualizado').to.equal(participant.Name);  
                        expect(responseget.body.cpfCnpj, 'Deve obter o cpf atualizado').to.equal(participant.CPF);
                        expect(responseget.body.rg.number, 'Deve obter o rg atualizado').to.equal(participant.RG);
                        expect(responseget.body.genderType, 'Deve obter o genero do participante atualizado').to.equal(participant.Gender);
                        expect(responseget.body.address.addressText, 'Deve obter o endereço do participante atualizado').to.equal(participant.Address[0].AddressText);
                        //expect(response.body.address.addressName).to.equal(participant.Address[0].AddressName);
                        expect(responseget.body.address.number,'Deve obter o numero do logradouro do participante atualizado').to.equal(participant.Address[0].Number);
                        expect(responseget.body.address.complement, 'Deve obter o complemento atualizado').to.equal(participant.Address[0].Complement);
                        expect(responseget.body.address.district, 'Deve obter o distrito atualizado').to.equal(participant.Address[0].District);
                        expect(responseget.body.address.city, 'Deve obter a cidade do participante atualizada').to.equal(participant.Address[0].City);
                        expect(responseget.body.address.state, 'Deve obter o estado do logradouro do participante atualizado').to.equal(participant.Address[0].State);
                        expect(responseget.body.address.zipCode, 'Deve obter cep do participante atualiazadp').to.equal(participant.Address[0].ZipCode);
                        //expect(response.body.address.reference).to.equal(participant.Address[0].Reference);
                        expect(responseget.body.phones[0].ddd,'Deve obter o DDD atualizado').to.equal(participant.Phones[0].Ddd);
                        expect(responseget.body.phones[0].number, 'Deve obter o número de telefone do participante atualizado').to.equal(participant.Phones[0].Number);
                        expect(responseget.body.phones[0].phoneType, 'Deve obter o tipo de telefone do participante atualizado').to.equal(participant.Phones[0].PhoneType);
                        expect(responseget.body.email[0].emailText, 'Deve obter o email atualizado').to.equal(participant.Emails[0].EmailText);
                        expect(responseget.body.email[0].emailType, 'Deve obter o tipo de email atualizado').to.equal(participant.Emails[0].EmailType);
                        expect(responseget.body.accepts[0].optInId, 'Deve obter o optin do participante atualizado').to.equal(participant.Accepts[0].OptInId);
                        expect(responseget.body.accepts[0].checked, 'Deve obter o checked do regulamento atualizado').to.equal(participant.Accepts[0].Checked);
            
                        var birthDate = responseget.body.birthDate.split('T')[0].split('-');
                        expect(birthDate[1]+'/'+birthDate[2]+'/'+birthDate[0], 'Deve obter a data de nascimento atualizada').to.equal(participant.BirthDate); 
                    });
                });
            });
        });

    });

    
    it('Deve obter as informações do Participante', function() {
        var participantService = new ParticipantService(this);               

        return participantService.getParticipant(usertoken).then(function(response){
            expect(response, 'Deve retorar OK no status da requisição').to.have.status(config.util.HTTP.OK);    
            expect(response.body.id, 'Deve obter o mesmo Id de participante utilizado para obter o token').to.be.eql(config.credentials.participantId);    
        });
    });


    it('Deve verificar se o participante esta autenticado', function(){
        var participantService = new ParticipantService(this);

        return participantService.IsAuthenticate(config.credentials.user, config.credentials.pwd, config.credentials.url).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);    
            expect(response.body).to.not.be.undefined;  
        });
    });
    
    it('Deve confirmar se o participante esta autenticado', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.IsAuthenticated(usertoken).then(function(response){
             expect(response).to.have.status(config.util.HTTP.OK);
         });
     });
    
     it('Deve validar compatibilidade do browser', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getBrowserCompatibility(usertoken).then(function(response){
             expect(response).to.have.status(config.util.HTTP.OK);
             expect(response.body).to.be.equal(true);
         });
     });

    it('Deve retornar o saldo de pontos do participante', function() {
       var participantService = new ParticipantService(this);

       return participantService.getBalance(usertoken).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);                
            expect(response.body).to.be.a('number')        
        });
    });

    it('Deve obter o histórico de saldo do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getBalanceType(usertoken, 'balanceOrigin').then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
         });
     });

     it('Deve obter o saldo bloqueado do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getBalanceType(usertoken, 'balanceOnHold').then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
         });
     });

     it('Deve obter o saldo total do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getBalanceType(usertoken, 'fullBalance').then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
         });
     });

     it('Deve obter os pontos a expirar do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getBalanceType(usertoken, 'toExpire/0').then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
         });
     });

     it('Deve obter o extrato do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getExtract(usertoken).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
         });
     });

    it('Deve obter os regulamentos do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getRegulations(usertoken).then(function(response){
             expect(response).to.have.status(config.util.HTTP.OK);                
             expect(response.body).to.be.a('Array')        
         });
     });

    it('Deve obter informações do catalogo do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getCatalogParticipant(usertoken).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);    
            expect(response.body.campaign.campaignId).to.be.eql(config.CAMPAIGN_ID);     
             //expect(response.body).to.be.a('Array')        
         });
    });

    it('Deve enviar o Fingerprint do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.postFingerPrint(usertoken).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve fazer a busca do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.ParticipantSearch(usertoken, config.credentials.user, config.CAMPAIGN_ID).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve autenticar o participante pelo CPF', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.ParticipantAuthCpfCnpj(config.credentials.participantdocument,config.credentials.pwd, config.Campaign_Id_pj).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve recuperar a lista de desejos do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.getWishlist(usertoken).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve adicionar um produto a lista de desejos do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.postAddWishlist(usertoken, config.PRODUCTS[0].sku).then(function(response){
            expect(response).to.have.status(config.util.HTTP.OK);
        });
    });

    it('Deve remover um produto a lista de desejos do participante', function() {
        var participantService = new ParticipantService(this);
 
        return participantService.postAddWishlist(usertoken, config.PRODUCTS[0].sku).then(function(response){
            expect(response, 'um produto deve ser adicionado antes de ser excluído').to.have.status(config.util.HTTP.OK);
            
            return participantService.postRemoveWishlist(usertoken, config.PRODUCTS[0].sku).then(function(response){
                expect(response, 'confirmar que o produto foi deletado').to.have.status(config.util.HTTP.OK);
                
            });
        });
    });
});