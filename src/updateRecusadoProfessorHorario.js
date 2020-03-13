let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    console.log("modificar professor horario");
    let obj = [[0]];
    let query = `UPDATE afinal.professorhorario SET status = '2' WHERE (idProfessor = (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
    and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
    and (horario = '${objVazio.horario}');`
    sqlQUERY(query,obj,funcao,res);
    console.log(query);
}
//criando modulo
module.exports = selectD;
//'2', '1', '1', '1', '07:50:00