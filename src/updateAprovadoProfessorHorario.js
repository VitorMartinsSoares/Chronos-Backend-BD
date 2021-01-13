let sqlQUERY = require("./sqlQueryExec");
let horariosArray =  require("./horariosArray");
let sqlSemRes = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[0]];
    for(let i=0;i<objVazio.contador;i++){
        let query = `UPDATE afinal.professorhorario SET status = '1' WHERE (idProfessor = (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
        and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
        and (horario = '${horariosArray[objVazio.posicao-i].horario}');`
        let query3 = `UPDATE afinal.professorhorario SET status = '2' WHERE (idProfessor != (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
        and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
        and (horario = '${horariosArray[objVazio.posicao-i].horario}')`;
        let query2 = "UPDATE afinal.horario SET `"+horariosArray[objVazio.posicao-i].inicioFim+"` = '2' WHERE iddata=(SELECT iddata FROM afinal.data where data='"+objVazio.data+"') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='"+objVazio.sala+"');";
        sqlSemRes(query,obj,funcao);
        sqlSemRes(query2,obj,funcao);
        if(i==objVazio.contador-1){
            sqlQUERY(query3,obj,funcao,res);
        }else{
            sqlSemRes(query3,obj,funcao);
        }
    }
}
//criando modulo
module.exports = selectD;

