let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectH = function select(objVazio, res){
    let query = 'SELECT * FROM afinal.horario;';
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectH;