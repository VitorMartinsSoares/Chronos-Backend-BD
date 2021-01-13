let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[0]];
    let query = `UPDATE afinal.tipoderecursos SET validadeTR = '0'  WHERE idTipoDeRecursos = '${objVazio}';`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectD;
//2020-02-17 611 07:50:00 2