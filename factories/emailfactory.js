'use strict';

var Emailfactory = function(){

};
Emailfactory.prototype.build = function()
{

    var participant = { 
        email: null     
    };

    return participant;
}
Emailfactory.prototype.buildDefault = function(){
    var email = this.build();
    participant.email =new Date().getTime().toString();
    return participant;
};

module.exports = Emailfactory;