let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectPRC = function select(objVazio, res){
    let query = 'SELECT * FROM afinal.professorhorario;';
    sqlQUERY(query,objVazio,funcao,res);
    console.log("Mostrando os professores e os horarios em pedidos")
}
//criando modulo
module.exports = selectPRC;