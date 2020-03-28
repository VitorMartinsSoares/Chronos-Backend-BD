let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
const mysql = require('mysql');
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,req,res){
    let obj=[[0]];
    let query = `UPDATE afinal.recursos SET numero = '${objVazio.recursos}', capacidade = '${objVazio.capacidade}', informacao = '${objVazio.inf}', idTipoDeRecursos = '${objVazio.tipoRecurso}' WHERE (idRecursos = '${objVazio.id}');`
    console.log(query)
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectD;