let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectP = function select(req,res){
    let obj = [[0]];
    let query = `SELECT idProfessor, email, nomeP, cpf,areaDoConhecimento, admGeral, admRecursos, matricula FROM afinal.professor WHERE email != 'null';`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectP;