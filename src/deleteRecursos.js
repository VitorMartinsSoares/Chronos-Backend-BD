let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[0]];
    let query = `UPDATE afinal.recursos SET validadeR = '0'  WHERE idRecursos = '${objVazio}';`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectD;
//2020-02-17 611 07:50:00 2