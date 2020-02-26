const mysql = require('mysql');
let sqlQUERY = function execSQLQuery(sqlQry,[values],funcao,res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'afinal' 
    });
    connection.query(sqlQry,[values],function(error, results, fields){
        if(error) 
            res.json(error);
        else
            res.json(results);
        console.log('executou!');
        funcao(results);
        console.log("Mostrando os professores e os horarios em pedidos")
        connection.end();
    });
}
module.exports = sqlQUERY;