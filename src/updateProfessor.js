let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
const mysql = require('mysql');
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,req,res){
    let sqlQry = `select email from professor where cpf = '${objVazio.cpf}';`
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'afinal' 
    });
    connection.query(sqlQry,function(error, results, fields){
        if(error) 
            console.log(error)
        else
            console.log(results[0].email)
        if(results[0].email==null){
            console.log("Dar update professor");
            let query = `UPDATE afinal.professor SET email = '${objVazio.email}', nomeP = '${objVazio.nome}', senha = '${objVazio.nome}', areaDoConhecimento = '${objVazio.area}', admGeral = '0', admRecursos = '0' WHERE (cpf = '${objVazio.cpf}')`
            sqlQUERY(query,objVazio,funcao,res);
        }else{
            res.status(400).send('Este CPF está em uso, caso não tenha se cadastrado entre em contato com a administracao do site !');
        }
        connection.end();
    });
    
}
//criando modulo
module.exports = selectD;