'use strict';
var basic;
var env;
var chai = require('chai'), chaiHttp = require('chai-http');
var fs = require("fs");
var request = require("request");
var xml2js = require('xml2js');
var XLSX = require('xlsx');

var Util = function (that) {
    chai.use(chaiHttp);
    this.that = that;
};

Util.prototype.getEnv = function () {
    return env;
};

Util.prototype.getHeaderFormUrlEncoded = function (token) {
    var header = this.getDefaultHeader(token);

    header[config.util.CONTENT_TYPE] = config.util.ContentType.FORM_URL_ENCODED;

    return header;
};

Util.prototype.getHeaderFormUrlEncoded2 = function () {
    var header = this.getDefaultHeader3()

    header[config.util.CONTENT_TYPE] = config.util.ContentType.FORM_URL_ENCODED;

    return header;
};

Util.prototype.getAuthParticipant = function (token) {
    var header = this.getAuthHeader(token);
    header[config.util.CONTENT_TYPE] = config.util.ContentType.JSON;
    return header;
};

Util.prototype.getUrls = function () {
    return config.urls.environment;
};

Util.prototype.getHeaderJson = function (token) {
    var header = this.getDefaultHeader(token);
    header[config.util.CONTENT_TYPE] = config.util.ContentType.JSON;
    return header;
};

Util.prototype.getHeaderJson1 = function () {
    var header = this.getDefaultHeader1();
    header = config.util.AUTH_HEADER;
    return header;

};

Util.prototype.getOAuthHeader = function () {
    var header = config.util.AUTH_HEADER;
    header.Authorization = config.util.BASIC + config.util.BASIC_AUTHORIZATION;
    header[config.util.CONTENT_TYPE] = config.util.ContentType.FORM_URL_ENCODED;
    return header;
};

Util.prototype.getDefaultHeader = function (token) {
    var header = config.util.DEFAULT_HEADER;
    header.Authorization = config.util.BEARER + token;
    return header;
};

Util.prototype.getDefaultHeader2 = function (token) {
    var header = config.util.HEADER_AUTHORIZATION;
    header.Authorization = "Bearer " + token
    return header;
};

Util.prototype.getDefaultHeader3 = function (token) {
    var header = config.util.HEADER_AUTHORIZATION;
    return header;
};

Util.prototype.getDefaultHeader4 = function (token) {
    var header = config.util.AUTH_HEADER;
    header.Authorization = "Bearer " + token
    return header;
};

Util.prototype.getDefaultHeader1 = function () {
    var header = config.util.DEFAULT_HEADER;
    //header.Authorization = config.util.BEARER + token;    
    return header;
};

Util.prototype.getAuthHeader = function (token) {
    var header = config.util.AUTH_HEADER;
    //header.Authorization = config.util.BEARER + token;    
    return header;
};

Util.prototype.getAuthHeader = function () {
    var header = config.util.AUTH_HEADER2;  
    return header;
};

Util.prototype.getTokenHeader = function (token) {
    var header = config.util.TOKEN_HEADER;
    header.Authorization = config.util.BEARER + token;
    return header;
};

Util.prototype.getTokenAdminHeader = function (token) {
    var header = config.util.TOKEN_ADMIN_HEADER;
    header.Authorization = config.util.BEARER + token;
    return header;
};

Util.prototype.getUrl = function (baseUrl, header, url) {
    ;
    return chai.request(baseUrl)
        .get(url)
        .set(header);
};

Util.prototype.getUrl1 = function (baseUrl, url) {
    return chai.request(baseUrl)
        .get(url);
};

Util.prototype.postUrl = function (baseUrl, body, header, url) {
    return chai.request(baseUrl).post(url)
        .set(header)
        .send(body);
};

Util.prototype.postUrlformdata = function (baseUrl, body, header, url, filePath1, fileName1, filePath2, fileName2) {
                                        //(urlservice, null, header, url, filePath1, fileName1, filePath2, fileName2);
    return chai.request(baseUrl).post(url)
        .type('form')
        .set(header).attach('banner', fs.readFileSync(filePath1), fileName1).attach('bannerMobile', fs.readFileSync(filePath2), fileName2)
        .send();
};

Util.prototype.postUrlformdata1 = function (baseUrl, body, header, url, filePath, fileName) {
                                        //(urlservice, null, header, url, filePath, fileName);(baseUrl, body,  url, filePath, fileName, header)
    return chai.request(baseUrl).post(url)
        .type('form')
        .set(header).attach('arquivoBlacklist', fs.readFileSync(filePath), fileName)
        .send({'IdTipoBlackList': '1', 'motivoBloqueio': 'Bloqueio teste'});
       //.send();
};

Util.prototype.postUrl2 = function (baseUrl, header, url) {
    return chai.request(baseUrl).post(url)
        .set(header)
        .send();
};

Util.prototype.deleteUrl = function (baseUrl, body, header, url) {
    return chai.request(baseUrl)
        .del(url)
        .set(header)
        .send(body);
};

Util.prototype.deleteUrl1 = function (urlservice, header, url) {
    return chai.request(urlservice)
        .del(url)
        .set(header);
    //  .send(body);
};

Util.prototype.putUrl = function (baseUrl, body, header, url) {
    return chai.request(baseUrl).put(url)
        .set(header)
        .send(body);
};

Util.prototype.timeout = function (miliseconds) {
    this.that.timeout(miliseconds);
};

function gera_random(n) {
    var ranNum = Math.round(Math.random() * n);
    return ranNum;
}
function mod(dividendo, divisor) {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
}

Util.prototype.gerarCPF = function () {
    return cpf()
}

Util.prototype.gerarCNPJ = function () {
    return cnpj()
}

function cpf() {
    var n = 9;
    var n1 = gera_random(n);
    var n2 = gera_random(n);
    var n3 = gera_random(n);
    var n4 = gera_random(n);
    var n5 = gera_random(n);
    var n6 = gera_random(n);
    var n7 = gera_random(n);
    var n8 = gera_random(n);
    var n9 = gera_random(n);
    var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;
    var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    return '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
}
function cnpj() {
    var n = 9;
    var n1 = gera_random(n);
    var n2 = gera_random(n);
    var n3 = gera_random(n);
    var n4 = gera_random(n);
    var n5 = gera_random(n);
    var n6 = gera_random(n);
    var n7 = gera_random(n);
    var n8 = gera_random(n);
    var n9 = 0;//gera_random(n);
    var n10 = 0;//gera_random(n);
    var n11 = 0;//gera_random(n);	
    var n12 = 1;//gera_random(n);		
    var d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;
    var d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + n11 + n12 + d1 + d2;
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Util.prototype.retornaRelatorioWebConfig = async function retornaRelatorioWebConfig() {
    var parser = new xml2js.Parser();
    return new Promise(resolve => {
        fs.readFile('assets/Web.config', function (err, data) {
            parser.parseString(data, function (err, result) {
                resolve(result);
            });
        });
    });
}

Util.prototype.retornaExcel = async function retornaExcel(url) {
    return new Promise((resolve, reject) => {
        request(url, { encoding: null }, function (err, res, data) {
            if (err || res.statusCode !== 200) reject(err);

            /* data is a node Buffer that can be passed to XLSX.read */
            var workbook = XLSX.read(data, { type: 'buffer' });
            resolve(workbook);
            /* DO SOMETHING WITH workbook HERE */
        });
    });
}

Util.prototype.cpf = () => cpf();
Util.prototype.cnpj = () => cnpj();

module.exports = Util
