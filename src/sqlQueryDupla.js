const mysql = require('mysql');
let resul1;
let resul2;
let sqlQUERY = function execSQLQuery(sqlQry,sqlQry2,valor,funcao,res=0){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'afinal' 
    });
    connection.query(sqlQry,function(error, results1, fields){
        if(error) 
            console.log(error)
        else
            console.log(results1)
        console.log("INSERT")
        resul1 = results1;
    });
    connection.query(sqlQry2,function(error, results2, fields){
        if(error) 
            console.log(error)
        else
            console.log(results2)
        console.log("SELECT")
        resul2 = results2;
        if(res==0){
            funcao(valor,resul2);
        }else{
            funcao(valor,resul2,res);
        }
        connection.end();
    });
}
module.exports = sqlQUERY;