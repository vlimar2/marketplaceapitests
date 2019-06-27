'use strict';

//var sleep = require('system-sleep');
var DatabaseConnection = require('../database/databaseConnection')
var databaseConnection = new DatabaseConnection()
var participanteId
var Database = function (that) {

};

Database.prototype.adicionaCupom = async function (participanteId) {
    console.log('- ADICIONA CUPOM - Iniciado')
    var consulta = new DatabaseConnection()
    //var query = "select * from Participante where [DocumentoParticipante] = '08090496008'"
    var query = "INSERT INTO [dbo].[SorteioCupomParticipante] (ParticipanteId, Cupom, DataCriacao, TipoCupom) VALUES (" + participanteId + ", '555555', '2019-01-18 00:00:00.000', '1')"
    //var query = "INSERT INTO SorteioCupomParticipante (ParticipanteId, Cupom, DataCriacao, TipoCupom) VALUES (5806, '555555', '2019-01-18 00:00:00.000', '1')"
    var consultaContaInformacoesParticipante = await consulta.executeInsert(query)
    console.log('✓ CONSULTA PARTICIPANTE - Finalizado'.blue)
    return consultaContaInformacoesParticipante
}

Database.prototype.deletaenquete = async function (quizId, queryDelete) {
    console.log('- DELETE ENQUETE - Iniciado')
    var consulta = new DatabaseConnection()
    //var query = "select * from Participante where [DocumentoParticipante] = '08090496008'"
    var queryDelete = "DECLARE @QuizId INT = 0;DROP TABLE IF EXISTS #tmpIds SELECT RANK() OVER (ORDER BY PerguntaId) Idx, QuizId, PerguntaId INTO #tmpIds FROM Pergunta WHERE quizId = @QuizId DECLARE @count INT = 0;SELECT @count = COUNT(1) FROM #tmpIds WHILE @count > 0 BEGIN DECLARE @QuizPerguntaId INT = 0; DECLARE @QuizRespostaId INT = 0; SELECT @QuizPerguntaId = perguntaId FROM #tmpIds WHERE Idx = @count SELECT @QuizRespostaId = respostaId FROM Resposta WHERE perguntaId = @QuizPerguntaId DELETE RespostaParticipante WHERE respostaId = @QuizRespostaId DELETE Resposta WHERE perguntaId = @QuizPerguntaId DELETE Pergunta WHERE quizId = @QuizPerguntaId SET @count = @count - 1 END --SELECT * FROM Quiz WHERE quizId = @QuizId --DELETE Quiz WHERE quizId = @QuizId select * from pergunta where quizId = " + quizId;
    var consultaDeletequiz = await consulta.executeDelete(queryDelete)
    console.log('✓ DELETE ENQUETE - Finalizado'.blue)
    return consultaDeletequiz //--SELECT * FROM RespostaParticipante WHERE respostaId = @QuizRespostaId --SELECT * FROM Resposta WHERE perguntaId = @QuizPerguntaId --SELECT * FROM Pergunta WHERE quizId = @QuizId
}

Database.prototype.consultaCupom = async function (participanteId) {
    console.log('- CONSULTA CUPOM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "select * from SorteioCupomParticipante where [ParticipanteId] = " + participanteId;
    var consultaCupom = await consulta.executeQuery(query)
    console.log('✓ CONSULTA CUPOM - Finalizado'.blue)
    return consultaCupom
}

Database.prototype.relatorioSorteio = async function (participanteId) {
    console.log('- CONSULTA RELATÓRIO - Iniciado')
    var consulta = new DatabaseConnection()
    //var n = query.length;
    var query = "DECLARE @Schema VARCHAR(20) = (SELECT [NAME] FROM SYS.SCHEMAS WHERE [NAME] = N'Relatorio') DECLARE @Table VARCHAR(20) = (SELECT [TABLE_NAME] FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = N'Relatorio' AND [TABLE_NAME] = N'AcompanhamentoSorteio') IF @Schema IS NULL BEGIN PRINT('CREATING SCHEMA') EXEC('CREATE SCHEMA [Relatorio]') PRINT('SCHEMA CREATED') END IF @Schema IS NOT NULL AND @Table IS NOT NULL BEGIN PRINT('DROPPING TABLE') DROP TABLE [Relatorio].[AcompanhamentoSorteio] PRINT('TABLE DROPPED') END SET @Schema = (SELECT [NAME] FROM SYS.SCHEMAS WHERE [NAME] = N'Relatorio') SET @Table = (SELECT [TABLE_NAME] FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = N'Relatorio' AND [TABLE_NAME] = N'AcompanhamentoSorteio') IF @Schema IS NOT NULL AND @Table IS NULL BEGIN SELECT [P].[PARTICIPANTEID] AS [ParticipanteId], (ISNULL(CASE [P].[DOCUMENTOPARTICIPANTE] WHEN '../-' THEN NULL WHEN '' THEN NULL ELSE REPLACE(REPLACE(REPLACE([P].[DOCUMENTOPARTICIPANTE], '-', ''), '/', ''), '.', '') END, NULL)) AS [DocumentoParticipante],(ISNULL(CASE [P].[DOCUMENTOEMPRESA] WHEN '../-' THEN NULL WHEN '' THEN NULL ELSE REPLACE(REPLACE(REPLACE([P].[DOCUMENTOEMPRESA], '-', ''), '/', ''), '.', '')END, NULL)) AS [DocumentoEmpresa], UPPER([P].[NOME]) AS [Nome], ISNULL([SC].[QUANTIDADE], 0) AS [Quantidade], ISNULL([SC].[QUANTIDADETRANSACIONAL], 0) AS [QuantidadeTransacional], ISNULL([SC].[QUANTIDADERELACIONAL], 0) AS [QuantidadeRelacional],(CASE WHEN EXISTS (SELECT 1 FROM [DBO].[PARTICIPANTEACEITEREGULAMENTO] [PA] WHERE [PA].[PARTICIPANTEID] = [P].[PARTICIPANTEID] AND [PA].[TIPOPROMOCAOID] = 1) THEN 'SIM' ELSE 'NÃO' END) AS [AceitouRegulamentoTransacional],(CASE WHEN EXISTS (SELECT 1 FROM [DBO].[PARTICIPANTEACEITEREGULAMENTO] [PA] WHERE [PA].[PARTICIPANTEID] = [P].[PARTICIPANTEID] AND [PA].[TIPOPROMOCAOID] = 2) THEN 'SIM' ELSE 'NÃO' END) AS [AceitouRegulamentoRelacional] INTO [Relatorio].[AcompanhamentoSorteio] FROM [DBO].[PARTICIPANTE] [P] LEFT JOIN (SELECT [SC].[PARTICIPANTEID] AS [ParticipanteId], COUNT([SC].[CUPOM]) AS [Quantidade], COUNT(CASE [SC].[TIPOCUPOM] WHEN 1 THEN 1 ELSE NULL END) AS [QuantidadeTransacional], COUNT(CASE [SC].[TIPOCUPOM] WHEN 2 THEN 1 ELSE NULL END) AS [QuantidadeRelacional] FROM [DBO].[SORTEIOCUPOMPARTICIPANTE] [SC] WHERE [SC].[CUPOM] IS NOT NULL GROUP BY [SC].[PARTICIPANTEID]) AS [SC] ON [SC].[PARTICIPANTEID] = [P].[PARTICIPANTEID]LEFT JOIN [DBO].[PARTICIPANTEACEITEREGULAMENTO] [PA] ON [PA].[PARTICIPANTEID] = [P].[PARTICIPANTEID] WHERE [PA].[DATAACEITE] IS NOT NULL AND [PA].[TIPOPROMOCAOID] IN (1, 2) GROUP BY [P].[PARTICIPANTEID], [DOCUMENTOPARTICIPANTE], [DOCUMENTOEMPRESA], [P].[NOME], [SC].[QUANTIDADE], [SC].[QUANTIDADETRANSACIONAL], [SC].[QUANTIDADERELACIONAL], [PA].[PARTICIPANTEID] END";

    /*sorteio
    "DECLARE @Schema VARCHAR(20) = (SELECT [NAME] FROM SYS.SCHEMAS WHERE [NAME] = N'Relatorio') DECLARE @Table VARCHAR(20) = (SELECT [TABLE_NAME] FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = N'Relatorio' AND [TABLE_NAME] = N'AcompanhamentoSorteio') IF @Schema IS NULL BEGIN PRINT('CREATING SCHEMA') EXEC('CREATE SCHEMA [Relatorio]') PRINT('SCHEMA CREATED') END IF @Schema IS NOT NULL AND @Table IS NOT NULL BEGIN PRINT('DROPPING TABLE') DROP TABLE [Relatorio].[AcompanhamentoSorteio] PRINT('TABLE DROPPED') END SET @Schema = (SELECT [NAME] FROM SYS.SCHEMAS WHERE [NAME] = N'Relatorio') SET @Table = (SELECT [TABLE_NAME] FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = N'Relatorio' AND [TABLE_NAME] = N'AcompanhamentoSorteio') IF @Schema IS NOT NULL AND @Table IS NULL BEGIN SELECT [P].[PARTICIPANTEID] AS [ParticipanteId], (ISNULL(CASE [P].[DOCUMENTOPARTICIPANTE] WHEN '../-' THEN NULL WHEN '' THEN NULL ELSE REPLACE(REPLACE(REPLACE([P].[DOCUMENTOPARTICIPANTE], '-', ''), '/', ''), '.', '') END, NULL)) AS [DocumentoParticipante],(ISNULL(CASE [P].[DOCUMENTOEMPRESA] WHEN '../-' THEN NULL WHEN '' THEN NULL ELSE REPLACE(REPLACE(REPLACE([P].[DOCUMENTOEMPRESA], '-', ''), '/', ''), '.', '')END, NULL)) AS [DocumentoEmpresa], UPPER([P].[NOME]) AS [Nome], ISNULL([SC].[QUANTIDADE], 0) AS [Quantidade], ISNULL([SC].[QUANTIDADETRANSACIONAL], 0) AS [QuantidadeTransacional], ISNULL([SC].[QUANTIDADERELACIONAL], 0) AS [QuantidadeRelacional],(CASE WHEN EXISTS (SELECT 1 FROM [DBO].[PARTICIPANTEACEITEREGULAMENTO] [PA] WHERE [PA].[PARTICIPANTEID] = [P].[PARTICIPANTEID] AND [PA].[TIPOPROMOCAOID] = 1) THEN 'SIM' ELSE 'NÃO' END) AS [AceitouRegulamentoTransacional],(CASE WHEN EXISTS (SELECT 1 FROM [DBO].[PARTICIPANTEACEITEREGULAMENTO] [PA] WHERE [PA].[PARTICIPANTEID] = [P].[PARTICIPANTEID] AND [PA].[TIPOPROMOCAOID] = 2) THEN 'SIM' ELSE 'NÃO' END) AS [AceitouRegulamentoRelacional] INTO [Relatorio].[AcompanhamentoSorteio] FROM [DBO].[PARTICIPANTE] [P] LEFT JOIN (SELECT [SC].[PARTICIPANTEID] AS [ParticipanteId], COUNT([SC].[CUPOM]) AS [Quantidade], COUNT(CASE [SC].[TIPOCUPOM] WHEN 1 THEN 1 ELSE NULL END) AS [QuantidadeTransacional], COUNT(CASE [SC].[TIPOCUPOM] WHEN 2 THEN 1 ELSE NULL END) AS [QuantidadeRelacional] FROM [DBO].[SORTEIOCUPOMPARTICIPANTE] [SC] WHERE [SC].[CUPOM] IS NOT NULL GROUP BY [SC].[PARTICIPANTEID]) AS [SC] ON [SC].[PARTICIPANTEID] = [P].[PARTICIPANTEID]LEFT JOIN [DBO].[PARTICIPANTEACEITEREGULAMENTO] [PA] ON [PA].[PARTICIPANTEID] = [P].[PARTICIPANTEID] WHERE [PA].[DATAACEITE] IS NOT NULL AND [PA].[TIPOPROMOCAOID] IN (1, 2) GROUP BY [P].[PARTICIPANTEID], [DOCUMENTOPARTICIPANTE], [DOCUMENTOEMPRESA], [P].[NOME], [SC].[QUANTIDADE], [SC].[QUANTIDADETRANSACIONAL], [SC].[QUANTIDADERELACIONAL], [PA].[PARTICIPANTEID] END"
    
    cupom
    "DECLARE @Schema VARCHAR(20) = (SELECT [NAME] FROM SYS.SCHEMAS WHERE [NAME] = N'Relatorio')DECLARE @Table VARCHAR(20) = (SELECT [TABLE_NAME] FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = N'Relatorio' AND [TABLE_NAME] = N'AcompanhamentoSorteio') IF @Schema IS NULL BEGIN PRINT('CREATING SCHEMA') EXEC('CREATE SCHEMA [Relatorio]') PRINT('SCHEMA CREATED') END IF @Schema IS NOT NULL AND @Table IS NOT NULL BEGIN PRINT('DROPPING TABLE') DROP TABLE [Relatorio].[AcompanhamentoSorteio] PRINT('TABLE DROPPED') END SET @Schema = (SELECT [NAME] FROM SYS.SCHEMAS WHERE [NAME] = N'Relatorio') SET @Table = (SELECT [TABLE_NAME] FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = N'Relatorio' AND [TABLE_NAME] = N'AcompanhamentoSorteio') IF @Schema IS NOT NULL AND @Table IS NULL BEGIN SELECT (CASE WHEN [P].[DocumentoParticipante] IS NULL AND [P].[ParticipanteId] IS NULL THEN NULL WHEN [P].[DocumentoParticipante] IS NOT NULL AND [P].[DocumentoEmpresa] IS NOT NULL THEN [P].[DocumentoParticipante] WHEN [P].[DocumentoParticipante] IS NOT NULL AND [P].[DocumentoEmpresa] IS NULL THEN ISNULL((CASE [P].[DocumentoParticipante] WHEN '../-' THEN NULL WHEN '' THEN NULL ELSE REPLACE(REPLACE(REPLACE([P].[DOCUMENTOPARTICIPANTE], '-', ''), '/', ''), '.', '') END), NULL)WHEN [P].[DocumentoParticipante] IS NULL AND [P].[DocumentoEmpresa] IS NOT NULL THEN ISNULL((CASE [P].[DocumentoEmpresa] WHEN '../-' THEN NULL WHEN '' THEN NULL ELSE REPLACE(REPLACE(REPLACE([P].[DocumentoEmpresa], '-', ''), '/', ''), '.', '') END), NULL) ELSE [P].[DocumentoParticipante]END) AS [CPFCNPJ],UPPER((CASE WHEN [AR].[Name] IS NOT NULL AND CHARINDEX('-', [AR].[Name]) > 0 THEN TRIM((SELECT SUBSTRING([AR].[Name], 0 - CHARINDEX('-', REVERSE([AR].[Name])), LEN([AR].[Name]))))WHEN [AR].[Name] IS NOT NULL AND CHARINDEX('-', [AR].[Name]) = 0 THEN [AR].[Name]ELSE NULL END)) AS [Perfil],UPPER((CASE WHEN CHARINDEX('-', [AR].[Name]) > 0 THEN TRIM((SELECT SUBSTRING([AR].[Name], LEN([AR].[Name]) - CHARINDEX('-', REVERSE([AR].[Name])) + 2, LEN([AR].[Name]))))WHEN [AR].[Name] IS NOT NULL AND CHARINDEX('-', [AR].[Name]) = 0 THEN [AR].[Name]ELSE NULL END)) AS [Subperfil],ISNULL([PA].[DataAceite], NULL) AS [DataAceite],ISNULL([C].[Cupom], NULL) AS [NumeroDaSorte],UPPER((CASE [C].[TipoCupom] WHEN 1 THEN 'Transacional' WHEN 2 THEN 'Relacional' ELSE NULL END)) AS [TipoCampanha] INTO [Relatorio].[AcompanhamentoSorteioCupons]FROM [DBO].[SORTEIOCUPOMPARTICIPANTE] [C] INNER JOIN [DBO].[Participante] [P] ON [P].[ParticipanteId] = [C].[ParticipanteId] INNER JOIN [DBO].[AspNetUserRoles] [AUR] ON [AUR].[UserId] = [P].[IdentityUser_Id] INNER JOIN [DBO].[AspNetRoles] [AR] ON [AR].[Id] = [AUR].[RoleId] LEFT JOIN [DBO].[SORTEIOCUPOMPARTICIPANTE] [SC] ON [SC].[PARTICIPANTEID] = [P].[PARTICIPANTEID] OUTER APPLY (SELECT TOP 1 * FROM [DBO].[PARTICIPANTEACEITEREGULAMENTO] [PA] WHERE [PA].[PARTICIPANTEID] = [P].[PARTICIPANTEID] ORDER BY [PA].[DATAACEITE] DESC) AS [PA] WHERE [PA].[DataAceite] IS NOT NULL AND [AR].[TIPO] IN ('Frota', 'Motorista Autônomo', 'Oficina')AND [C].[TipoCupom] IN (1, 2)GROUP BY [P].[PARTICIPANTEID], [P].[DOCUMENTOPARTICIPANTE], [P].[DOCUMENTOEMPRESA], [AR].[Name], [PA].[DataAceite], [C].[Cupom], [C].[TipoCupom], [P].[NOME], [PA].[PARTICIPANTEID] END"*/

    var consultaUser = await consulta.executeQuery(query)
    console.log('✓ CONSULTA RELATÓRIO - Finalizado'.blue)
    return consultaUser
}

Database.prototype.acompanhamentoSorteio = async function (participanteId) {
    console.log('- CONSULTA ACOMPANHAMENTO - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "SELECT TOP (1000) [ParticipanteId],[DocumentoParticipante],[DocumentoEmpresa],[Nome],[Quantidade],[QuantidadeTransacional],[QuantidadeRelacional],[AceitouRegulamentoTransacional],[AceitouRegulamentoRelacional]FROM [Relatorio].[AcompanhamentoSorteio]";
    var consultaSorteio = await consulta.executeQuery(query)
    console.log('✓ CONSULTA ACOMPANHAMENTO - Finalizado'.blue)
    return consultaSorteio
}

Database.prototype.aceiteRegulamento = async function (participanteId) {
    console.log('- CONSULTA ACOMPANHAMENTO - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "INSERT INTO [ParticipanteAceiteregulamento] VALUES (" + participanteId + ", 2, getdate(), 0, null )";
    var consultaSorteio = await consulta.executeInsert(query)
    console.log('✓ CONSULTA ACOMPANHAMENTO - Finalizado'.blue)
    return consultaSorteio
}

Database.prototype.consultaDealer = async function (participanteId) {
    console.log('- CONSULTA DEALER - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "select * from Participante where [DocumentoParticipante] = " + participanteId;
    var consultaSorteio = await consulta.executeQuery(query)
    console.log('✓ CONSULTA PARTICIPANTE - Finalizado'.blue)
    return consultaParticiante
}

Database.prototype.cancelabloqueio = async function () {
    //console.log('- CANCELA BLOQUEIO - Iniciado')
    var consulta = new DatabaseConnection()
    //var query = "select * from Participante where [DocumentoParticipante] = '08090496008'"
    var query = "Select * from dbo.AspNetUsers where Id = '2749cce8-984d-4271-a344-5b415b26615d' Update dbo.AspNetUsers set LockoutEndDateUtc = null,LockoutEnabled = '0'"
    var finalizaBloqueio = await consulta.executeInsert(query)
    //console.log('✓ CONSULTA PARTICIPANTE - Finalizado'.blue)
    return finalizaBloqueio
}

Database.prototype.cancelabloqueiodealeradm = async function () {
    //console.log('- CANCELA BLOQUEIO - Iniciado')
    var consulta = new DatabaseConnection()
    //var query = "select * from Participante where [DocumentoParticipante] = '08090496008'"
    var query = "Select * from dbo.AspNetUsers where Id = 'aed3ca43-78e7-42ea-86f1-4bddd8832102' Update dbo.AspNetUsers set LockoutEndDateUtc = null,LockoutEnabled = '0'"
    var finalizaBloqueioadm = await consulta.executeInsert(query)
    //console.log('✓ CONSULTA PARTICIPANTE - Finalizado'.blue)
    return finalizaBloqueioadm
}

Database.prototype.validaorigem = async function (participanteId) {
    console.log('- VALIDA SE HÁ ORIGEM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = " select origem from Participante where ParticipanteId = " + participanteId + " AND origem = 'Portal Participante' "
    var consultaOrigemPortalparticipante = await consulta.executeQuery(query)
    console.log('✓ VALIDA SE HÁ ORIGEM - Finalizado'.blue)
    return consultaOrigemPortalparticipante
}

Database.prototype.consultaRelatoriosAdmin = async function (relatorioIdSemDownload, count) {
    console.log('- VALIDA SE HÁ RELATÓRIOS CADASTRADOS - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "select l.LogId, r.nome, l.DataProcessamento, l.UrlRelatorio,   " +
                "l.QuantidadeLinhas                                             " +
                "from LogAtualizacaoRelatorio l                                 " +
                "inner join Relatorio r                                         " +
                "on r.RelatorioId = l.RelatorioId                               " +
                "where l.LogId                                                  " +
                "in (select MAX(l2.LogId) as LogId                              " +
                "     from LogAtualizacaoRelatorio l2                           " + 
                "     group by l2.RelatorioId)                                  " +
                "     AND r.RelatorioId NOT IN (" + relatorioIdSemDownload + ")"
                "group by l.RelatorioId, l.LogId, r.nome, l.DataProcessamento,  " +
                "l.UrlRelatorio, l.QuantidadeLinhas "
    var consultaRelatoriosAdmin= [];
    consultaRelatoriosAdmin[0] = await consulta.executeQuery(query);
    consultaRelatoriosAdmin[1] = count;
    console.log('✓ VALIDA SE HÁ RELATÓRIOS CADASTRADOS - Finalizado');
    return consultaRelatoriosAdmin
}


Database.prototype.checkstatusprocbatch = async function () {
    //console.log('- VALIDA SE HÁ ORIGEM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "select * from Integracao.Requisicao_Item_status"
    var checkstatus = await consulta.executeQuery(query)
    //console.log('✓ VALIDA SE HÁ ORIGEM - Finalizado'.blue)
    return checkstatus
}

Database.prototype.pointstransactions = async function (participante) {
    //console.log('- VALIDA SE HÁ ORIGEM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "select top 10 * from Integracao.Requisicao_Item (nolock) where codCpfCnpj = " + participante + "and id_status = 8 and data_nota = '2018-04-09 03:00:00.0000000'"
    var pointstransf = await consulta.executeQuery(query)
    //console.log('✓ VALIDA SE HÁ ORIGEM - Finalizado'.blue)
    return pointstransf
}

Database.prototype.updateblacklist = async function (participante) {
    //console.log('- VALIDA SE HÁ ORIGEM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "update Integracao.Requisicao_Item set Id_status = 1 where codCpfCnpj =" + participante + "and id_status = 8 and data_nota = '2018-04-09 03:00:00.0000000'"
    var updateblist = await consulta.executeInsert(query)
    //console.log('✓ VALIDA SE HÁ ORIGEM - Finalizado'.blue)
    return updateblist
}

Database.prototype.bringtransactionsdoc = async function (participante) {
    //console.log('- VALIDA SE HÁ ORIGEM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "select * Integracao.Requisicao_Item where codCpfCnpj =" + participante + "and id_status = 1"
    var bringtrdoc = await consulta.executeQuery(query)
    //console.log('✓ VALIDA SE HÁ ORIGEM - Finalizado'.blue)
    return bringtrdoc
}

Database.prototype.execscoreenable = async function () {
    //console.log('- VALIDA SE HÁ ORIGEM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "exec Integracao.ApplyCampaignRules @limit = 1000"
    var execscore = await consulta.executeQuery(query)
    //console.log('✓ VALIDA SE HÁ ORIGEM - Finalizado'.blue)
    return execscore
}

Database.prototype.bringalltrans = async function (participante) {
    //console.log('- VALIDA SE HÁ ORIGEM - Iniciado')
    var consulta = new DatabaseConnection()
    var query = "select * Integracao.Requisicao_Item where codCpfCnpj =" + participante + "and id_status = 11"
    var bringall = await consulta.executeQuery(query)
    //console.log('✓ VALIDA SE HÁ ORIGEM - Finalizado'.blue)
    return bringall
}

module.exports = Database 