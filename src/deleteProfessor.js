let sqlQUERY = function execSQLQuery(sqlQry,[values],funcao,res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'afinal' 
    });
    connection.query(sqlQry,[values],function(error, results, fields){
        if(error) 
            res.status(400).send('Professor responsavel! Não é possivel Deletar!');
        else
            res.json(results);
        funcao(results);
        console.log("Mostrando os professores e os horarios em pedidos")
        connection.end();
    });
}
let funcao = require("./imprimirResults");
const mysql = require('mysql');
//adicionando tipo de recursos ao banco
let selectP = function select(email,req,res){
    let obj = [[0]];
    let query = `DELETE FROM afinal.professor WHERE (email = '${email}');`;
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectP;