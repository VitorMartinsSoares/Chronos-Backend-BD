const mysql = require('mysql');
let sqlQUERY = function execSQLQuery(sqlQry,[values],funcao,res=0){
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
        if(res==0){
            funcao(results,values);
        }else{  
            funcao(results,values,res);
        }
        connection.end();
    });
}
module.exports = sqlQUERY;