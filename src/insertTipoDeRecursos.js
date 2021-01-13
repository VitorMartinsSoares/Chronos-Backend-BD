let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let inserirTP = function select(objVazio, res){
    let obj = [[0]];
    let query = `INSERT INTO afinal.tipoderecursos (descricao,nome,idProfessor,validadeTR) VALUES ('${objVazio.descricao}','${objVazio.nome}','${objVazio.professor}','1');`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = inserirTP;