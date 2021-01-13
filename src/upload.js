let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
const mysql = require('mysql');
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,req,res){
    let mensagem = "Email já Cadastrado!!!";
    let obj = [[0]];
    let query = "";
    objVazio.forEach((e) => {
        query= `INSERT INTO afinal.professor (nomeP, matricula) VALUES ('${e.nome}', '${e.cpf}'); `;
        sqlQUERY(query,obj,funcao);
    });
}
//criando modulo
module.exports = selectD;