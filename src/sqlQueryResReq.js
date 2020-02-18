const mysql = require('mysql');
let sqlQUERY = function execSQLQuery(sqlQry,funcao,req,res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'afinal' 
    });
    connection.query(sqlQry,function(error, results, fields){
        if(error) 
            console.log(error);
        else
            console.log(results);
        connection.end();
        funcao(results,req,res);
        console.log('Teste de validação!');
    });
}
module.exports = sqlQUERY;