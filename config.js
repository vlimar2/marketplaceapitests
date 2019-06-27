config = {
    "environment": 'qa',//62142044514
    "env": {
        "qa": {
            "urlMercedesAPIqa": "https://mercedesapiqa.azurewebsites.net",
            "urlMercedesAPI": "https://mercedesapiqa.azurewebsites.net/",
        },
        "stage": {
            "urlMercedesAPIstage": "http://mercedesclub-stage-api.azurewebsites.net",
        },
        "apiman": {
            "urlMercedesAPIman": "https://apimanhml.webpremios.com.br/mercedes-club/",
        },
        "uat": {
            "urlMercedesAPI": "https://mercedesapiuat.azurewebsites.net/",
        },
        "prd": {
            "urlMercedesAPIprod": "https://mercedesclub.com.br/#/",
        },
        "dev": {
            "urlMercedesAPIdev": "http://mercedesapidev.azurewebsites.net/",
        }
    },
    "database": {
        "qa": {
            login: '',
            passowrd: '',
            host: '',
            port: ''
        },
        "staging": {
            //login: 'mbdbadmin',
            login: 'aplic.mercedzClb',
            passowrd: '@JEpi@bK59OsAh',
            //host: 'mercedesclube-db.database.windows.net',
            host: 'mercedesuat.database.windows.net',
            port: 1433,
            dbName: 'mercedesuat'//MERCEDESCLUB-STAGE
        },
        "mangoDB": {
            "qa": {
                connectionString: 'mongodb://aplic.banking:H%23TL11Lix1y841@mongodb.qa.ltm:27017/logBanking'
            },
            "uat": {
                connectionString: 'mongodb://aplic.banking:ME0fQWlk7vmT%23Z@mongodb.uat.ltm:27017/logBanking'
            },
            "staging": {
                connectionString:'mongodb://mercedesuat:QKKIn91RL4efcCUX855poWXZS7my1BqZBb0j40vHS2qmBFIK1McikgEH8iDePgEN8FT47yJ3wco0sLkQ493MgA%3D%3D@mercedesuat.documents.azure.com:10255/mercedes?ssl=true'
            }
        }
    },
    //"RespostaMongo":"",
    "credentials": {
        "user": "",
        "userpj": "",
        "participantdocument": "",
        "pjdocument": "",
        "pwd": "",
        "url": "",
        "participantId": "",
    },
    //login de participante motorista autônomo
    "USERNAME": "45242186000123",
    "EMPTYUSERNAME": "",
    "WRONGUSERNAME": "2304137768",
    "PASS": "123456",
    "EMPTYCLIENT_ID": "",
    "WRONGCLIENT_ID": "4",
    "PASSEMPTY": "",
    "PASSWRONG": "654321",
    //login de participante Frota/ Representante legal
    "USERNAMEFROREPLEGAL": "48801840000180",
    "PASSFROREPLEGAL": "123456",
    //login de participante Frota/ Proprietário
    "USERNAMEFROPRO": "54786540000171",
    "PASSFROPRO": "123456",
    //login de participante Frota/Almoxarifado
    "USERNAMEFROALMO": "94450476050",
    "PASSFROALMO": "123456",
    //login de participante Frota/Comprador
    "USERNAMEFROCOM": "38798503057",
    "PASSREPLEGALFROCOM": "123456",
    //login de participante Frota/Gestor
    "USERNAMEFROGES": "22795929082",
    "PASSFROGES": "123456",
    //login de participante Frota/Gestor de manutenção
    "USERNAMEFROGESMA": "63627077709",
    "PASSREPLEGALFROGESMA": "123456",
    //login de participante Frota/Motorista
    "USERNAMEFROGMOT": "98090761500",
    "PASSFROMOT": "123456",
    //login de participante Frota/Outros
    "USERNAMEFROOUTR": "12913035701",
    "PASSFROOUTR": "123456",
    //login de participante Oficina/Representante legal
    "USERNAMEOFIREPLEGAL": "87148862000144",
    "PASSOFIREPLEGAL": "123456",
    //login de participante Oficina/Comprador
    "USERNAMEOFICOMPRA": "41529409055",
    "PASSOFICOMPRA": "123456",
    //login de participante Oficina/Gerente
    "USERNAMEOFICOMPRA": "43495914005",
    "PASSOFICOMPRA": "123456",
    //login de participante Oficina/Mecânico
    "USERNAMEOFIMEC": "96985086004",
    "PASSOFIMEC": "123456",
    //login de participante Oficina/Mecânico
    "USERNAMEOFIOUT": "71963310012",
    "PASSOFIOUT": "123456",
    "CLIENT_ID": 1,
    //login de admin
    "ADMINUSERNAME": "41907038345",
    //login de dealer admin
    "DEALERADMUSERNAME": "99999999000199",
    //login de dealer vendedor
    "DEALERSALESUSERNAME": "45377745760",
    //login de dealer vendedor porte P
    "DEALERSALESPUSERNAME": "",
    //login de dealer vendedor porte M
    "DEALERSALESMUSERNAME": "05544253005",
    //login de dealer vendedor porte G
    "DEALERSALESGUSERNAME": "12885187069",
    //login de participante teste 1 na blacklist (Recebe estrelas mas não deve pontuar)
    "USERNAMEBLACKLISTTESTE": "78948836706",
    //login de participante teste 1 com transação
    "USERNAMEBLACKLISTTESTE": "59104273000129",
    //login de participante concessionário 2 na blacklist (Recebe estrelas mas não deve pontuar)
    "USERNAMEBLACKLISTCONC": "65551397815",
    //login de participante fraude 3 na blacklist (Não deve acessar o programa)
    "USERNAMEBLACKLISTFRAU": "70881442208",
    //login de participante sistema 4 na blacklist (Não deve ganhar estrelas nem pontuar mas acessa programa)
    "USERNAMEBLACKLISTSIS": "24068784140",
    //senha de admin
    "ADMINPASS": "123456",
    //senha de dealer admin
    "DEALERADMPASS": "123456789",
    //senha de dealer vendedor 
    "DEALERSALESPASS": "123456789",
    //senha de dealer vendedor porte P
    "DEALERSALESPPASS": "123456789",
    //senha de dealer vendedor porte M
    "DEALERSALESMPASS": "123456789",
    //senha de dealer vendedor porte G
    "DEALERSALESGPASS": "123456789",
    "DEALERADMCNPJ": "",
    "CATALOG_ID": "",
    "ADMINCLIENT_ID": 3,
    "DEALERADMCLIENT_ID": 2,
    "DEALERSALESCLIENT_ID": 2,
    //Client Credentials
    "GRANTSECRET": "client_credentials",
    "CLIENTIDSECRET": 1234,
    "CLIENTSECRET": 12345,
    "util": {
        "HTTP": {
            "OK": 200,
            "CREATED": 201,
            "ACCEPTED": 202,
            "BAD_REQUEST": 400,
            "UNAUTHORIZED": 401,
            "NOT_FOUND": 404,
            "INTERNAL_SERVER_ERROR": 500,
            "PRECONDITION_FAILED": 412
        },
        "HIGH_SECONDS": 500000,
        "DEFAULT_SECONDS": 100000,
        "CONTENT_TYPE": "Content-Type",
        "BEARER": "Bearer",
        "BASIC": "Basic",
        "BASIC_AUTHORIZATION": '',
        "ContentType": {
            "JSON": "application/json; charset=UTF-8",
            "FORM_URL_ENCODED": "application/x-www-form-urlencoded",
            "APP_JSON": "application/json"
        },
        "HEADER_AUTHORIZATION": {
            "Authorization": '',
            'Content-Type': 'application/json'
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
            , "Content-Type": "application/x-www-form-urlencoded"
            , "Cache-Control": "no-cache"
        },
        "AUTH_HEADER": {
            "Content-Type": "application/json"
        },
        "AUTH_HEADER2": {
            "Auth": "MzgwNTZmN2ZkNWFhMGFiNDY0MmZhZGE1NmY1ODY0MGU=",
            "Content-Type": "application/json"
        }
    },
    "indicateProprietario": {
        cnpj: '',
        email: "cursoqaltm1@gmail.com",
        nome: "Indicaçao teste Proprietário de frota",
        razaoSocial: "Indicaçao teste SA"
    },
    "indicateMotautonomo": {
        cpf: '',
        email: "cursoqaltm1@gmail.com",
        nome: "Indicaçao teste Motorista autônomo",
    },
    "createdealerportep": {
        Agencia: "011",
        Bairro: "Alphaville Industrial",
        //BancoId: "2",
        CEP: "06454000",
        CNPJ: "",
        Conta: "01010101",
        ContaCorrente: "01010011",
        Denominacao: "Teste automatizado PÊ",
        DigitoAgencia: "1",
        DigitoContaCorrente: "1",
        Endereco: "Alameda Rio Negro",
        IE: "010101010101010",
        Latitude: "-23,5505",
        Longitude: "-46,6333",
        Porte: "P",
        RazaoSocial: "Z",
        Segmento: "IT",
        Status: "Matriz",
        UF: "SP",
        Cidade: "Barueri",
        dtAceiteContrato: "2019-01-15T02:00:00.000Z"
    },
    "createdealerportem": {
        Agencia: "011",
        Bairro: "Alphaville Industrial",
        BancoId: "2",
        CEP: "06454000",
        CNPJ: "",
        Conta: "01010101",
        ContaCorrente: "01010011",
        Denominacao: "Teste automatizado M",
        DigitoAgencia: "",
        DigitoContaCorrente: "1",
        Endereco: "Alameda Rio Negro",
        IE: "010101010101010",
        Latitude: "-23,5505",
        Longitude: "-46,6333",
        Porte: "M",
        RazaoSocial: "X",
        Segmento: "IT",
        Status: "Matriz",
        UF: "SP",
        Cidade: "Barueri",
        dtAceiteContrato: "2019-01-15T02:00:00.000Z"
    },
    "createdealerporteg": {
        Agencia: "011",
        Bairro: "Alphaville Industrial",
        BancoId: "2",
        CEP: "06454000",
        CNPJ: "",
        Conta: "01010101",
        ContaCorrente: "01010011",
        Denominacao: "Teste automatizado G",
        DigitoAgencia: "",
        DigitoContaCorrente: "1",
        Endereco: "Alameda Rio Negro",
        IE: "010101010101010",
        Latitude: "-23,5505",
        Longitude: "-46,6333",
        Porte: "G",
        RazaoSocial: "Y",
        Segmento: "IT",
        Status: "Matriz",
        UF: "SP",
        Cidade: "Barueri",
        dtAceiteContrato: "2019-01-15T02:00:00.000Z"
    },

    "editarDealer": {
        "id": 1,
        "token": '',
        "body": {
            "$id": "1",
            "Dealer_Id": 1,
            "CNPJ": "04043949000120",
            "RazaoSocial": "ACREDIESEL COMERCIAL DE VEÍCULOS LTDA.",
            "Denominacao": "Acrediesel (Rio Branco)",
            "Status": "Matriz",
            "Cidade": "Rio Branco",
            "UF": "AC",
            "Endereco": "Rod. BR 364, 4.260",
            "Bairro": "Corrente",
            "CEP": "69902260",
            "Fone": "(068) 3212-1000",
            "Fax": "(068) 3212-1038",
            "Latitude": "-10,01108056",
            "Longitude": "-67,79594722",
            "KMDistancia": 0,
            "BancoId": null,
            "Banco": null,
            "Agencia": 1,
            "DigitoAgencia": null,
            "ContaCorrente": null,
            "DigitoContaCorrente": null,
            "Conta": "22615000",
            "Conta_Matriz": 22615000,
            "IE": "01.001.397/001-92",
            "dtAceiteContrato": "2018-03-13T09:00:00Z",
            "Porte": "P",
            "Segmento": "V.COMERCIAIS"
        },
        "categoria": {
            "body": {
                "documentoParticipante": ''
            },
            "isSirius": '',
            "responseCategoria": ''
        }
    },
    "quiz": {
        login: "",
        senha: "",
        clint_id: "",
        token: "",
        requestCreateQuiz: "",
        responseCreateQuiz: "",
        requestEditQuiz: "",
        responseEditQuiz: "",
        responseGetQuiz: "",
        responseGetQuizId: "",
        idQuiz: ""
    },
    "enquete": {
        login: "",
        senha: "",
        clint_id: "",
        token: "",
        requestCreateEnquete: "",
        responseCreateEnquete: "",
        requestEditEnquete: "",
        responseEditEnquete: "",
        responseGetEnquete: "",
        responseGetEnqueteId: "",
        idEnquete: ""
    }
};

//função para identificar erro
//}, function (a) {
//   console.log(a);

module.exports = config;
