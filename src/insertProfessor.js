let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults");
const mysql = require('mysql');
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,req,res){
    let obj = [[0]];
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
            console.log(results)
        if(results.length!=0){    
            if(results[0].email==null){
                console.log("Dar update professor");
                let query = `UPDATE afinal.professor SET email = '${objVazio.email}', nomeP = '${objVazio.nome}', senha = '${objVazio.nome}', areaDoConhecimento = '${objVazio.area}', admGeral = '0', admRecursos = '0' WHERE (cpf = '${objVazio.cpf}')`
                sqlQUERY(query,obj,funcao,res);
                console.log(query)
            }else{
                res.status(400).send('Este CPF está em uso, caso não tenha se cadastrado entre em contato com a administracao do site !');
            }
            connection.end();
        }else{
            res.status(400).send('Cadastro é apenas para Professores, pre cadastro não existente');
        }
    });
    
}
//criando modulo
module.exports = selectD;