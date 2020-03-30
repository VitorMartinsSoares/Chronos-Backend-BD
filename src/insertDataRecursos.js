let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./insertDataHorario")
let objVazio;
//adicionando tipo de recursos ao banco
let selectDR = function select(results1, results2,res){
    let cont=0;
    results2.forEach(function(name){
        objVazio = [[results1,name.idRecursos]];
        let query = "INSERT INTO afinal.datarecursos(iddata, idRecursos) VALUES ((SELECT iddata FROM afinal.data where afinal.data.data = '"+results1+"'), '"+name.idRecursos+"');";
        sqlQUERY(query,objVazio,funcao);
        cont+=1;
    });
    res.status(200).send("CERTO");
    console.log(cont);

}
//criando modulo
module.exports = selectDR;