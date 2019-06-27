'use strict';

var ValidaTruckpad = require('../validation/validatruckpad')

describe('truckpad', function () {

    it('Deve retornar isSirius "false" quando o participante não tiver motorId', async function () {
        console.log('Deve retornar isSirius "false" quando o participante não tiver motorId')
        var categoria = new ValidaTruckpad(this)
        config.categoria.body.documentoParticipante = "17842389888"
        config.categoria.isSirius = false
        await categoria.validaCategoria(config.categoria)
    })

    it('Deve retornar isSirius "true" quando o participante tiver motorId', async function () {
        console.log('Deve retornar isSirius "true" quando o participante tiver motorId')
        var categoria = new ValidaTruckpad(this)
        config.categoria.body.documentoParticipante = "47208350744"
        config.categoria.isSirius = true
        await categoria.validaCategoria(config.categoria)
    })

    it('Não deve retornar isSirius quando informado documentoParticipante com letras', async function () {
        console.log('Não deve retornar isSirius quando informado documentoParticipante com letras')
        var categoria = new ValidaTruckpad(this)
        config.categoria.body.documentoParticipante = "QWQWQWQWQW"
        await categoria.validaCategoriaErrada(config.categoria)
    })

    it('Não deve retornar isSirius quando informado documentoParticipante com caracteres especiais', async function () {
        console.log('Não deve retornar isSirius quando informado documentoParticipante com caracteres especiais')
        var categoria = new ValidaTruckpad(this)
        config.categoria.body.documentoParticipante = "@@@@"
        await categoria.validaCategoriaErrada(config.categoria)
    })

    it('Não deve retornar isSirius quando informado documentoParticipante vazio', async function () {
        console.log('Não deve retornar isSirius quando informado documentoParticipante vazio')
        var categoria = new ValidaTruckpad(this)
        config.categoria.body.documentoParticipante = ""
        await categoria.validaCategoriaErrada(config.categoria)
    })

})