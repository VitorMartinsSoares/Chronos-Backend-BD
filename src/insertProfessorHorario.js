let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
let func = require("./imprimirRes");
let mysql = require('mysql')
let query;
let query2;
let i;
let hor;
let valor;
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[0]];

    for(i=0;i<objVazio.recurso.length;i++){
        hor = objVazio.recurso[i].horario.slice(0,5) + ":00";
        valor = parseInt(objVazio.recurso[i].valor) +1;
        query = `INSERT INTO afinal.professorhorario (idProfessor, idHorario, horario, motivo ,status) VALUES ('${objVazio.professor}', 
        (SELECT idhorario from afinal.horario where iddata = (select iddata from data where data='${objVazio.data}') and idRecursos = (select idRecursos from recursos where numero = '${objVazio.recurso[i].recurso}')), 
        '${hor}','${objVazio.motivo}', 0 );`
        query2 = "UPDATE afinal.horario SET `"+objVazio.recurso[i].horario+"` = '"+valor+"' WHERE (iddata = (select iddata from data where data='"+objVazio.data+"')) and (idRecursos = (select idRecursos from recursos where numero = '"+objVazio.recurso[i].recurso+"'));"
        sqlQUERY(query2,obj,funcao);
        if(i==objVazio.recurso.length-1){
            sqlQUERY(query,obj,func,res);
        }else{
            sqlQUERY(query,obj,funcao);
        }
    }
}
//criando modulo
module.exports = selectD;
//'2', '1', '1', '1', '07:50:00