let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let inserirTP = function select(objVazio, res){
    let query = `INSERT INTO afinal.tipoderecursos (descricao, nome, quantidade, idProfessor) VALUES ('${objVazio.descricao}', '${objVazio.nomeTipo}', '${objVazio.quantidade}', (select idProfessor from afinal.professor where email = '${objVazio.emailProfessor}'));`;
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = inserirTP;