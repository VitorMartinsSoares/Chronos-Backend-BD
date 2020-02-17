const mysql = require('mysql');
let sqlQUERY = function execSQLQuery(sqlQry,[values],funcao){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'afinal' 
    });
    connection.query(sqlQry,[values],function(error, results, fields){
        if(error) 
            console.log(error)
        else
            console.log(results)
        connection.end();
        funcao(results,values);
    });
}
module.exports = sqlQUERY;