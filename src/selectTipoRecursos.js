let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectTP = function select(objVazio, res){
    let query = 'SELECT idTipoDeRecursos,nome FROM afinal.tipoderecursos where validadeTR=true;';
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectTP;