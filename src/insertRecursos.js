 let sqlQUERY = require("./sqlQueryDupla");
let funcao = require("./insertRecursosData")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[objVazio.recursos]]
    let query = `INSERT INTO afinal.recursos(numero,capacidade,informacao,idTipoDeRecursos,validadeR) VALUES ('${objVazio.recursos}', '${objVazio.capacidade}', '${objVazio.inf}', '${objVazio.tipoRecurso}', '1');`;
    let queryCont = 'SELECT * FROM afinal.data;'
    sqlQUERY(query,queryCont,obj,funcao,res);
}
//criando modulo
module.exports = selectD;