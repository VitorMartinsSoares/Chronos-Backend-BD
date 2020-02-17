let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectRH = function select(objVazio, res){
    let query = `SELECT afinal.recursos.numero,afinal.horario.* FROM afinal.horario INNER JOIN afinal.datarecursos ON afinal.datarecursos.iddata = afinal.horario.iddata and afinal.datarecursos.idRecursos = afinal.horario.idRecursos  INNER JOIN afinal.recursos ON afinal.recursos.idRecursos = afinal.datarecursos.idRecursos  INNER JOIN afinal.data ON afinal.data.iddata = afinal.datarecursos.iddata WHERE afinal.recursos.idTipoDeRecursos = ${objVazio[0][1]} and afinal.data.iddata = (SELECT afinal.data.iddata from afinal.data where afinal.data.data = '${objVazio[0][0]}') ; `;
    sqlQUERY(query,objVazio,funcao,res);
}
//criando modulo
module.exports = selectRH; 