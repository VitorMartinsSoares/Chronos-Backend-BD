let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectP = function select(objVazio, res){
    let query = 'SELECT * FROM afinal.professor;';
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectP;