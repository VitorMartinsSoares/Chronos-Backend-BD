let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectPRC = function select(objVazio, res){
    console.log('teste');
    let query = `SELECT afinal.professor.email,afinal.professor.nomeP,afinal.professorhorario.horario,afinal.recursos.numero,afinal.data.data,afinal.tipoderecursos.nome,afinal.professorhorario.status FROM afinal.professorhorario 
    INNER JOIN afinal.horario on afinal.professorhorario.idhorario = afinal.horario.idhorario
    INNER JOIN afinal.professor on afinal.professorhorario.idProfessor = afinal.professor.idProfessor
    INNER JOIN afinal.datarecursos on afinal.datarecursos.iddata = afinal.horario.iddata and afinal.datarecursos.idRecursos = afinal.horario.idRecursos
    INNER JOIN afinal.data on afinal.data.iddata = afinal.datarecursos.iddata
    INNER JOIN afinal.recursos on afinal.recursos.idRecursos = afinal.datarecursos.idRecursos
    INNER JOIN afinal.tipoderecursos on afinal.tipoderecursos.idTipoDeRecursos = afinal.recursos.idTipoDeRecursos
    WHERE afinal.professor.email = '${objVazio}'`;
    sqlQUERY(query,objVazio,funcao,res);
    console.log("Mostrando os professores e os horarios em pedidos")
}
//criando modulo
module.exports = selectPRC;