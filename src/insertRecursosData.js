let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./insertHorario");
let objVazio;

//adicionando tipo de recursos ao banco
let selectDR = function select(results1, results2,res){
    objVazio = results1;
    results2.forEach(function(name){
        objVazio = [[name.iddata,results1[0][0]]]
        let query1 = "INSERT INTO afinal.datarecursos(iddata, idRecursos) VALUES ('"+name.iddata+"', (select idRecursos from recursos where numero = '"+objVazio[0][1]+"'));";
        sqlQUERY(query1,objVazio,funcao);
    });
    res.status(200).send("CERTO");
}
//criando modulo
module.exports = selectDR;