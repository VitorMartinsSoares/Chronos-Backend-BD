let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
const mysql = require('mysql');
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,req,res){
    let obj=[[0]]
    let query = `UPDATE afinal.professor SET email = '${objVazio.email}', nomeP = '${objVazio.nome}', areaDoConhecimento = '${objVazio.area}', admGeral = ${objVazio.geral}, admRecursos = ${objVazio.recurso}, cpf = '${objVazio.cpf}', matricula =${objVazio.matricula} WHERE (idProfessor = '${objVazio.id}');`
    console.log(query)
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectD;