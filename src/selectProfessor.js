let sqlQUERY = require("./sqlQueryResReq");
//let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectP = function select(funcao,req,res){
    let query = `SELECT * FROM afinal.professor WHERE email = ${req.body.email};`;
    //console.log(req.body.email);
    sqlQUERY(query,funcao,req,res);
}
//criando modulo
module.exports = selectP;