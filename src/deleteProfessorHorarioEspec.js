let horarioHoras = function teste(hor){
    let horFinal = 0;
    if(hor == "07:00:00"){
        horFinal = "07:00-07:50";
    }else  if(hor == "07:50:00"){
        horFinal =  "07:50-08:40";
    }else if(hor == "08:55:00"){
        horFinal =  "08:55-09:45";
    }else if(hor == "09:45:00"){
        horFinal =  "09:45-10:35";
    }else if(hor == "10:50:00"){
        horFinal =  "10:50-11:40";
    }else if(hor == "11:40:00"){
        horFinal =  "11:40-12:30";
    }else if(hor == "12:30:00"){
        horFinal =  "12:30-13:50";
    }else if(hor == "13:50:00"){
        horFinal =  "13:50-14:40";
    }else if(hor == "14:40:00"){
        horFinal =  "14:40-15:30";
    }else if(hor == "15:50:00"){
        horFinal =  "15:50-14:40";
    }else if(hor == "16:40:00"){
        horFinal =  "16:40-17:30";
    }else if(hor == "17:30:00"){
        horFinal =  "17:30-19:00";
    }else if(hor == "19:00:00"){
        horFinal =  "19:00-19:50";
    }else if(hor == "19:50:00"){
        horFinal =  "19:50-20:40";
    }else if(hor == "20:55:00"){
        horFinal =  "20:55-21:45";
    }else if(hor == "21:45:00"){
        horFinal =  "21:45-22:35";
    }
    return horFinal;
}

let sqlQUERY = require("./sqlQueryExec");
let semRes = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[0]];
    let test;
    let query = `DELETE FROM afinal.professorhorario WHERE 
    (idhorario = (SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data = '${objVazio.data}') and 
    idRecursos=(SELECT idRecursos FROM afinal.recursos where numero = '${objVazio.recursos}'))) and (horario = '${objVazio.horario}') and (idProfessor=(SELECT idProfessor FROM afinal.professor where (email = '${objVazio.professor}')));`
    test = horarioHoras(objVazio.horario);
    let retorno;
    if(objVazio.status == 'Aprovado'){
        retorno = "UPDATE afinal.horario SET `"+test+"` = `"+test+"`-2 WHERE (iddata = (SELECT iddata FROM afinal.data where data = '"+objVazio.data+"')) and (idRecursos = (SELECT idRecursos FROM afinal.recursos where numero = '"+objVazio.recursos+"'));";
        semRes(retorno,obj,funcao);
    }else if(objVazio.status == 'Em espera'){
        retorno = "UPDATE afinal.horario SET `"+test+"` = `"+test+"`-1 WHERE (iddata = (SELECT iddata FROM afinal.data where data = '"+objVazio.data+"')) and (idRecursos = (SELECT idRecursos FROM afinal.recursos where numero = '"+objVazio.recursos+"'));";
        semRes(retorno,obj,funcao);
    }
    sqlQUERY(query,obj,funcao,res);
}
//criando modulo
module.exports = selectD;
