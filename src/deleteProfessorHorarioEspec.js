let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[0]];
    console.log("deletar professor horario");
    let query = `DELETE FROM afinal.professorhorario WHERE 
    (idhorario = (SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data = '${objVazio.data}') and 
    idRecursos=(SELECT idRecursos FROM afinal.recursos where numero = '${objVazio.recursos}'))) and (horario = '${objVazio.horario}') and (idProfessor=(SELECT idProfessor FROM afinal.professor where (email = '${objVazio.professor}')));`
    console.log(objVazio);
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectD;
//2020-02-17 611 07:50:00 2