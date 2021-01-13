let sqlQUERY = require("./sqlQueryExec");
let sqlSemRes = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
let horariosArray =  require("./horariosArray");
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    for(let i=0;i<objVazio.contador;i++){
        //let query2 = `UPDATE afinal.professorhorario SET status = '0' WHERE (idProfessor != (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
        // and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
        // and (horario = '${horariosArray[objVazio.posicao-i].horario}')`
        let obj = [[0]];
        let query2;
        let query;
        if(objVazio.status == 'Recusado'){
            query = `UPDATE afinal.professorhorario SET status = '0' WHERE (idProfessor = (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
                and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
                and (horario = '${horariosArray[objVazio.posicao-i].horario}');`
            query2 = "UPDATE afinal.horario SET `"+horariosArray[objVazio.posicao-i].inicioFim+"` = `"+horariosArray[objVazio.posicao-i].inicioFim+"`+1 WHERE iddata=(SELECT iddata FROM afinal.data where data='"+objVazio.data+"') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='"+objVazio.sala+"');";
        }else if(objVazio.status == 'Aprovado'){
            query = `UPDATE afinal.professorhorario SET status = '0' WHERE (idProfessor = (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
                and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
                and (horario = '${horariosArray[objVazio.posicao-i].horario}');`
            query2 = "UPDATE afinal.horario SET `"+horariosArray[objVazio.posicao-i].inicioFim+"` = `"+horariosArray[objVazio.posicao-i].inicioFim+"`-1 WHERE iddata=(SELECT iddata FROM afinal.data where data='"+objVazio.data+"') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='"+objVazio.sala+"');";
        }
        sqlSemRes(query2,obj,funcao);
        if(i==objVazio.contador-1){
            sqlQUERY(query,obj,funcao,res);
        }else{
            sqlSemRes(query,obj,funcao);
        }
    }
}
//criando modulo
module.exports = selectD;
//'2', '1', '1', '1', '07:50:00