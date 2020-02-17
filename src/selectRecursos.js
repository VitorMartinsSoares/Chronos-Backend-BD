let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectR = function select(objVazio, res){
    let query = 'SELECT * FROM afinal.recursos;';
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectR;