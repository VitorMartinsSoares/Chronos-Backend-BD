let sqlQUERY = require("./sqlQueryDupla");
let funcao = require("./insertDataRecursos")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let queryInserir = `INSERT INTO afinal.data (data) VALUES ('${objVazio}');`;
    let queryCont = 'SELECT * FROM afinal.recursos;'
    sqlQUERY(queryInserir,queryCont,objVazio,funcao,res);
}
//criando modulo
module.exports = selectD;