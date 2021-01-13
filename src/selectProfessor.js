let sqlQUERY = require("./sqlQueryResReq");
//adicionando tipo de recursos ao banco
let selectP = function select(funcao,req,res){
    let query = `SELECT * FROM afinal.professor WHERE email = '${req.body.email}';`;
    sqlQUERY(query,funcao,req,res);
}
//criando modulo
module.exports = selectP;