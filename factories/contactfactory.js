'use strict';

var Contactfactory = function(){

};
Contactfactory.prototype.build = function()
{

    var contact = {        
         catalogId: null,           
         name:  null,    
         cpfcnpj : null,    
         email : null,           
         phone : null,    
         subject : null,    
         message : null,    
         empresa : null,    
         url : null
    };

    return contact;
}
Contactfactory.prototype.buildDefault = function(){
    var contact = this.build();
    
        contact.catalogId = '40210';           
        contact.name =  'Marcio Ramos Teste';
        contact.cpfcnpj = '37482628843';
        contact.email = 'rafael.ribon@grupoltm.com.br';        
        contact.phone = '1129939484';
        contact.subject = 'Reclamações';
        contact.message = 'xxxxx cczxzxczx';
        contact.empresa = 'Empresa teste'; 
        contact.url = 'https://marketplace.webpremios.com.br/#/contato';

    return contact;
};

module.exports = Contactfactory;