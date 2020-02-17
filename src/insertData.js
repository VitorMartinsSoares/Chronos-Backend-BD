let sqlQUERY = require("./sqlQueryDupla");
let funcao = require("./insertDataRecursos")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio){
    console.log("depois de inserir a data, inserir a relação recursos e data");
    let queryInserir = `INSERT INTO afinal.data (data) VALUES ('${objVazio}');`;
    let queryCont = 'SELECT * FROM afinal.recursos;'
    sqlQUERY(queryInserir,queryCont,objVazio,funcao);
}
//criando modulo
module.exports = selectD;