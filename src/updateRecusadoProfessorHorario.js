let horariosArray =  require("./horariosArray");
let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    for(let i=0;i<objVazio.contador;i++){
        console.log("modificar professor horario");
        let obj = [[0]];
        let query = `UPDATE afinal.professorhorario SET status = '2' WHERE (idProfessor = (SELECT idProfessor FROM afinal.professor where email='${objVazio.professor}')) 
        and (idhorario =(SELECT idhorario FROM afinal.horario where iddata=(SELECT iddata FROM afinal.data where data='${objVazio.data}') and idRecursos=(SELECT idRecursos FROM afinal.recursos where numero='${objVazio.sala}'))) 
        and (horario = '${horariosArray[objVazio.posicao-i].horario}');`
        sqlQUERY(query,obj,funcao);
    }
    res.status(200).send("OK");
}
//criando modulo
module.exports = selectD;
//'2', '1', '1', '1', '07:50:00