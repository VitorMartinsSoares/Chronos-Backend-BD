let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./validacaoData")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let query = `SELECT * FROM afinal.data where data = '${objVazio[0][0]}';`;
    console.log("Inviando a seleção de uma determinada")
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectD;