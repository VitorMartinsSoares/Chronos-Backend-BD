let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let inserirTP = function select(objVazio, res){
    let obj = [[0]];
    let query = `UPDATE afinal.tipoderecursos SET nome = '${objVazio.nome}' WHERE (idTipoDeRecursos = '${objVazio.id}');`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = inserirTP;