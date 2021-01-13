const mysql = require('mysql');
let sqlQUERY = function execSQLQuery(sqlQry,[values],funcao,res,mensagem="ERRO"){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'afinal' 
    });
    connection.query(sqlQry,[values],function(error, results, fields){
        if(error) 
            res.status(400).send(mensagem);
        else
            res.json(results);
        funcao(results);
        connection.end();
    });
}
module.exports = sqlQUERY;