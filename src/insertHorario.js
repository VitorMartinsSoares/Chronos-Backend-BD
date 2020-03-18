let sqlQUERY = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectDR = function select(results, objVazio){
    let obj = [[0]];
    let query2 = "INSERT INTO afinal.horario(`07:00-07:50`, `07:50-08:40`, `09:45-10:35`, `10:50-11:40`, `11:40-12:30`, `12:30-13:50`, `13:50-14:40`, `15:50-16:40`, `16:40-17:30`, `17:30-19:00`, `19:00-19:50`, `19:50-20:40`, `20:55-21:45`, `21:45-22:35`, `iddata`, `idRecursos`) VALUES ('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '"+objVazio[0]+"', (select idRecursos from recursos where numero = '"+objVazio[1]+"'));"
    sqlQUERY(query2,obj,funcao);
    console.log("inserindo horario", objVazio)
}
//criando modulo
module.exports = selectDR;