let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
const mysql = require('mysql');
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,req,res){
    let obj=[[0]];
    let query = `UPDATE afinal.recursos SET numero = '${objVazio.recurso}', capacidade = '${objVazio.capacidade}', informacao = '${objVazio.informacao}', idTipoDeRecursos = '${objVazio.tipo}' WHERE (idRecursos = '${objVazio.id}');`
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectD;
// recurso: req.body.recurso,
//         capacidade: req.body.capacidade,
//         informacao: req.body.informacao,
//         tipo: req.body.tipoDeRecursos,
//         id: req.body.idRecursos