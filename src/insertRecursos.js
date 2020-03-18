 let sqlQUERY = require("./sqlQueryDupla");
let funcao = require("./insertRecursosData")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[objVazio.recursos]]
    console.log("insert recurso e selecao de data");
    let query = `INSERT INTO afinal.recursos (numero, idTipoDeRecursos,validadeR) VALUES ('${objVazio.recursos}', 
    (SELECT idTipoDeRecursos FROM afinal.tipoderecursos where tipoderecursos.nome ='${objVazio.tipoRecurso}'),'1');`;

    let queryCont = 'SELECT * FROM afinal.data;'
    sqlQUERY(query,queryCont,obj,funcao,res);
}
//criando modulo
module.exports = selectD;