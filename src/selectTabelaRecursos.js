let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectP = function select(req,res){
    let obj = [[0]];
    let query = `select recursos.idRecursos, recursos.numero, tipoderecursos.nome, recursos.capacidade, recursos.informacao,tipoderecursos.idTipoDeRecursos from afinal.recursos inner join afinal.tipoderecursos on afinal.recursos.idTipoDeRecursos = afinal.tipoderecursos.idTipoDeRecursos;`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectP;