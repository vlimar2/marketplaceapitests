config = {
    "env": {         
        "qa" : {
            "urlMktplaceAPI": "https://qa1-marketplace-api.webpremios.com.br",
            "urlMainMktplaceAPI": "https://qa1-apiman-marketplace-api.webpremios.com.br",
            "urlMktplaceAdminAPI": "http://qa1-marketplace-admin-api.webpremios.com.br"
        },
        //"hml" : {
           // "urlMktplaceAPI": "https://hml-marketplace-api.webpremios.com.br",
            //"urlMainMktplaceAPI": "https://hml-apiman-marketplace-api.webpremios.com.br"
       // },
        "uat" : {
        "urlMktplaceAPI": "https://uat-marketplace-api.webpremios.com.br",
        "urlMainMktplaceAPI": "https://uat-apiman-marketplace-api.webpremios.com.br"
    },
        "prd" : {
            "urlMktplaceAPI": "https://marketplace-api.webpremios.com.br",
            "urlMainMktplaceAPI": "https://apiman-marketplace-api.webpremios.com.br",
            "urlMktplaceAdminAPI": "https://marketplace-admin-api.webpremios.com.br"
        }
    },       
    "credentials":{
        "user":"11528460",
        "userpj":"qathiagopj",
        "participantdocument":"37482628843",
        "pjdocument":"21213645000182",
        "pwd":"123456",
        "url":"http://campanhateste.webpremios.com.br/#/login",
        "participantId": 16808521
    },
    "CAMPAIGN_ID": 30296,
    "Campaign_Id_pj": 30207,
    "CATALOG_ID": 40281,
    "CLIENT_ID": 88,
    "PRODUCTS":[{
        sku:"855fb95c682e41a6950e",
        productid:"fdf71157e4ab4ab29a21",
        originalid: "4393508",
        vendorid:10957,
        type: 1,
        description: "Produto teste 001",
        name: "Produto teste 001",
        originalproductid:"9472163",
        categoryid: "20949",
        subcategoryid: "20950",
        brand: {
            id:"24318",
            name:"Scalla"
        },
        price: {
            from:110,
            to:110
        }

    },
    {
        sku:"81f67f46ab9f4821a47f",
        productid:"1cac115905b04ab2aeef",
        originalid: "4393509",
        vendorid:10957,
        type: "E_COMMERCE",
        description: "Produto teste 002",
        name: "Produto teste 002",
        originalproductid:"9472164",
        categoryid: "20952",
        subcategoryid: "",
        brand: {
            id:"",
            name:""
        },
        price: {
            from:110,
            to:110
        }
    }],
    "PRODUCTS_VOUCHER":[{
        sku:"2d5ef5a9c9044dc4a0a4",
        originalid: "4553017",
        vendorid:21089,
        type: "E_COMMERCE",
        description: "Voucher Fisico 002",
        name: "Voucher Fisico 002",
        originalproductid:"9564604",
        productid:"01f92fc3116d4d9da602",
        categoryid: "24092",   
        subcategoryid:"27563",
        price: {
                from:110,
                to:110
               }
    },
    {
        sku:"508fbf7a6860471d9bfb",
        originalid: "4553018",
        vendorid:"21089",
        type: "E_COMMERCE",
        description: "Voucher Fisico 001",
        name: "Voucher Fisico 001",
        originalproductid:"9564603",
        productid:"79677d14a22743f198e7",
        categoryid: "24092",   
        subcategoryid:"27563",
        price: {
                from:110,
                to:1
               }
    }],
    "util": {
        "HTTP": {
            "OK": 200,
            "CREATED": 201,
            "ACCEPTED": 202,
            "BAD_REQUEST": 400,
            "UNAUTHORIZED": 401,
            "NOT_FOUND": 404
        },
        "HIGH_SECONDS": 500000,
        "DEFAULT_SECONDS": 100000,
        "CONTENT_TYPE": "Content-Type",
        "BEARER": "Bearer ",
        "BASIC": "Basic ",
        "BASIC_AUTHORIZATION":'MmMxYTQ3ZDBkM2FjNDBkZGIyNDdlYzZiZTE5ZmMyOGM6MGE0NjY5MWYtN2Q0YS00ZjQyLWIwM2UtZGMwYjNlZjM3Yjll',
        "ContentType": {
            "JSON": "application/json;charset=UTF-8",
            "FORM_URL_ENCODED": "application/x-www-form-urlencoded",
            "APP_JSON": "application/json"
        },
        "DEFAULT_HEADER": {              
            "Authorization": "",
            "Ocp-Apim-Subscription-Key": "8f3d5c18828e4530bf70bc18889702ec"
        },
        "TOKEN_HEADER": {
            "Authorization": ""
        },
        "TOKEN_ADMIN_HEADER": {
            "Authorization": "Basic YjViZDMzZjI1ZTM4NDI1ZTk0MzI3OGIwMWFmZDE5YzY6MTIzNDU2"
            ,"Content-Type": "application/x-www-form-urlencoded"
            ,"Cache-Control": "no-cache"
        },
        "AUTH_HEADER":{
            "Content-Type": "application/json"
        }
        
    },
    "bill":{
        "barcode":"846400000010401500060017711361010947201711152011",
        "vendorid":"84",
        "serviceid":"b839467b01c24e769d37c1eda0",
        "name": "EMBRATEL TELEFONIA (P?S)",
        "quantity": 1,
        "costPrice": 140.15,
        "sellingPrice": 1541.6
    },
    "mobile_operator":[
        {
            operator: "claro"
        },
        {
            operator: "vivo"
        },
        {
            operator: "tim"
        },
        {
            operator: "oi"
        },
        {
            operator: "nextel"
        }
    ],
    "mobile_prefix":[
        {
            "ddd":11
        },
        {
            "ddd":48
        },
        {
            "ddd":99
        }
    ],

    "card_info": {
        "cardBrandId": 2,
        "cardExpirationMonthDate": "03",
        "cardExpirationYearDate": "2020",
        "cardNumber": "5314929256234642",
        "catalogId": 40281,
        "nameOfCardHolder": "WEB PREMIOS COMERCIO E SERVICOS PROMOCIONAIS LTDA",
        "parcels": 1,
        "pointsCash": 1,
        "securityCode": "338"
    },
    "shop_showcases":[
        {
            "shop": "extra"
        },
        {
            "shop": "casas-bahia"
        },
        {
            "shop":"ponto-frio"
    }
    ]

};


module.exports = config;
