let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    console.log("Inserir professor horario");
    let query = `UPDATE afinal.professorhorario SET status = '2' WHERE (idProfessor = '${objVazio[0][0]}') and (idhorario = '${objVazio[0][1]}') and (horario = '${objVazio[0][2]}');`
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectD;
//'2', '1', '1', '1', '07:50:00