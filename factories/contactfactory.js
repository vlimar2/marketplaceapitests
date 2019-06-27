'use strict';

var Contactfactory = function(){

};
Contactfactory.prototype.build = function()
{

    var contact = {                   
         nome:  null,  
         email : null,
         telefone : null,
         assuntoId : null,
         mensagem : null, 
         cpf : null,                    
         //url : null
    };

    return contact;
}
Contactfactory.prototype.buildDefault = function(){
    var contact = this.build();
              
        contact.nome =  'Rafael Lima Teste';
        contact.email = 'cursoqaltm1@gmail.com';        
        contact.telefone = '11900000000';
        contact.assuntoId = 1;
        contact.mensagem = 'Tenho dúvidas no meu cadastro'; 
        contact.cpf = '31400000000'; 
        //contact.url = 'http://mercedesclub-stage-api.azurewebsites.net/faleconosco';

    return contact;
};

module.exports = Contactfactory;

/*expect(response.body.FaleConoscoId, 'Deve conter o fale conosco ID').not.to.be.equal('');
expect(response.body.nome, 'Deve conter o nome do contatante').not.to.be.equal('');
expect(response.body.email, 'Deve conter email do contatante').not.to.be.equal('');
expect(response.body.telefone, 'Deve conter telefone do contatante').not.to.be.equal('');
expect(response.body.mensagem, 'Deve conter mensagem enviada pelo contatante').not.to.be.equal('');
expect(response.body.assuntoId, 'Deve conter o assunto ID').not.to.be.equal('');
expect(response.body.cpf, 'Deve conter CPF do contatante').not.to.be.equal('');
expect(response.body.IdentityUser_Id, 'Deve conter o identity user ID').not.to.be.equal('');*/