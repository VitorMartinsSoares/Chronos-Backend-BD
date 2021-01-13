let sqlQUERY = require("./sqlQuerySemRes");
let agrup = require("./agrupamentoDeHorarios");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectPRC = function select(objVazio, res){
    obj = [[0]];
    let query = `SELECT afinal.professor.email,afinal.professor.nomeP,afinal.professorhorario.motivo,afinal.professorhorario.horario,afinal.recursos.numero,afinal.data.data,afinal.tipoderecursos.nome FROM afinal.professorhorario 
    INNER JOIN afinal.horario on afinal.professorhorario.idhorario = afinal.horario.idhorario
    INNER JOIN afinal.professor on afinal.professorhorario.idProfessor = afinal.professor.idProfessor
    INNER JOIN afinal.datarecursos on afinal.datarecursos.iddata = afinal.horario.iddata and afinal.datarecursos.idRecursos = afinal.horario.idRecursos
    INNER JOIN afinal.data on afinal.data.iddata = afinal.datarecursos.iddata
    INNER JOIN afinal.recursos on afinal.recursos.idRecursos = afinal.datarecursos.idRecursos
    INNER JOIN afinal.tipoderecursos on afinal.tipoderecursos.idTipoDeRecursos = afinal.recursos.idTipoDeRecursos
    WHERE afinal.professorhorario.status = 0 and afinal.tipoderecursos.idProfessor = ${objVazio.id} and afinal.data.data > now()
    order by professorhorario.idProfessor, professorhorario.idhorario, professorhorario.horario;`;
    sqlQUERY(query,obj,agrup,res);
}
//criando modulo
module.exports = selectPRC;