'use strict';

var Addressfactory = function(){

};
Addressfactory.prototype.build = function()
{

    var address = {        
        receiver: {
            receiverName:null,
            cpfCnpj:null,
            email:null,
            birthDate:null,
            genderType:null,
            personType:null,
            phones:[{
                ddd:null,
                number:null,
                phoneType:null
            }]

        },
        addressText:null,
        addressName:null,
        number:null,
        district:null,
        city:null,
        state:null,
        zipCode:null,
        reference:null,
        complement:null
    };

    return address;
}
Addressfactory.prototype.buildDefault = function(){
    var address = this.build();

    address.receiver.receiverName ='Grupo LTM TESTE QA';
    address.receiver.cpfCnpj ='37482628843';
    address.receiver.email = 'qa@grupoltm.com.br';
    address.receiver.birthDate = '1989-08-23T17:30:13.907+00:00';
    address.receiver.genderType = 3;
    address.receiver.personType = 1;
    address.receiver.phones[0].ddd='11';
    address.receiver.phones[0].number='34744900';
    address.receiver.phones[0].phoneType=3;
    address.addressText = 'Alamenda Rio Negro';
    address.addressName = 'Alamenda Rio Negro';
    address.number = '585';
    address.district = 'Barueri'
    address.city='São Paulo';
    address.state='SP';
    address.zipCode='06454000'
    address.complement='7 andar';
    address.reference='Próximo a LTM';

    return address;
};

module.exports = Addressfactory;