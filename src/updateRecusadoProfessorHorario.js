let horariosArray =  require("./horariosArray");
let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    for(let i=0;i<objVazio.contador;i++){
        let obj = [[0]];
        let query = `UPDATE afinal.professorhorario SET status = '2' WHERE (idProfessor = (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
        and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
        and (horario = '${horariosArray[objVazio.posicao-i].horario}');`
        let query2 = "UPDATE afinal.horario SET `"+horariosArray[objVazio.posicao-i].inicioFim+"` = `"+horariosArray[objVazio.posicao-i].inicioFim+"`-1 WHERE iddata=(SELECT iddata FROM afinal.data where data='"+objVazio.data+"') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='"+objVazio.sala+"');";
        sqlQUERY(query,obj,funcao);
        sqlQUERY(query2,obj,funcao);
    }
    res.status(200).send("OK");
}
//criando modulo
module.exports = selectD;