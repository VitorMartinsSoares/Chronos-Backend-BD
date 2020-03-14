let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectP = function select(req,res){
    let obj = [[0]];
    let query = `select tipoderecursos.idTipoDeRecursos,tipoderecursos.descricao, tipoderecursos.nome,
    tipoderecursos.idProfessor, professor.email,professor.nomeP 
    from afinal.tipoderecursos inner join afinal.professor on 
    afinal.professor.idProfessor = afinal.tipoderecursos.idProfessor`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectP;