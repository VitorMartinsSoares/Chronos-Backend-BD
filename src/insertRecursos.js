
let sqlQUERY = require("./sqlQueryDupla");
let funcao = require("./insertRecursosData")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio){
    console.log("depois de inserir a data, inserir a relação recursos e data");
    let obj = [[0]];
    let query = `INSERT INTO afinal.recursos (numero, idTipoDeRecursos) VALUES ('${objVazio.recursos}', 
    (SELECT idTipoDeRecursos FROM afinal.tipoderecursos where tipoderecursos.nome ='${objVazio.tipoRecurso}'));`;

    let queryCont = 'SELECT * FROM afinal.data;'
    sqlQUERY(queryInserir,queryCont,objVazio,funcao);
}
//criando modulo
module.exports = selectD;