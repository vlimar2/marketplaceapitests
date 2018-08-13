'use strict';

var Participantfactory = function(){

};
Participantfactory.prototype.build = function()
{

    var participant = {        
        ClientId: null,
        ProfileId: null,
        ParticipantStatusId: null,
        LogonTypeId: null,
        CatalogId: null,
        MaritalStatusId:null,
        PersonTypeId:null,
        CampaignId:null,
        Name:null,
        CPF:null,
        RG:null,
        CNPJ:null,
        Password:null,
        Gender:null,
        BirthDate:null,
        Address:[{
            AddressText:null,
            AddressName:null,
            Number:null,
            Complement:null,
            District:null,
            City:null,
            State:null,
            ZipCode:null,
            Reference:null
        }],
        Phones:[{
            Ddd:null,
            Number:null,
            PhoneType:null
        }],
        Accepts:[{
            OptInId:null,
            Checked:null
        }],
        Emails:[{
            EmailText:null,
            EmailType:null
        }],
        Username:null
    };

    return participant;
}
Participantfactory.prototype.buildDefault = function(){
    var participant = this.build();
    
    participant.ClientId = 88;
    participant.ProfileId = 50637;
    participant.ParticipantStatusId =1;
    participant.LogonTypeId=1;
    participant.CatalogId=40281;
    participant.MaritalStatusId=3;
    participant.PersonTypeId=1;
    participant.CampaignId=30296;
    participant.Name="participant Test";
    participant.CPF=new Date().getTime().toString();
    participant.RG="225545236";
    participant.CNPJ=null;
    participant.Password="meupass";
    participant.Gender=1;
    participant.BirthDate="02/07/1989";
    participant.Address[0].AddressText = "Rua teste Stub";
    participant.Address[0].AddressName = "Minha Casa";
    participant.Address[0].Number = "54";
    participant.Address[0].Complement = "apto 45";
    participant.Address[0].District = "Bairro de teste";
    participant.Address[0].City = "Cidada de Teste";
    participant.Address[0].State = "SP";
    participant.Address[0].ZipCode = "30320-150";
    participant.Address[0].Reference = "Próximo ao shopping";
    participant.Phones[0].Ddd="11";
    participant.Phones[0].Number="45875478";
    participant.Phones[0].PhoneType=1;
    participant.Accepts[0].OptInId=1;
    participant.Accepts[0].Checked=true;
    participant.Emails[0].EmailText="testeqa@teste.com";
    participant.Emails[0].EmailType=1;
    participant.Username="";

    return participant;
};

module.exports = Participantfactory;