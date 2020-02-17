let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    console.log("Inserir professor horario");
    let query = `INSERT INTO afinal.professorhorario (idProfessor, idHorario, horario, status) VALUES (${objVazio[0][0]}, ${objVazio[0][1]}, '${objVazio[0][2]}', 0 );`
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectD;
//'2', '1', '1', '1', '07:50:00