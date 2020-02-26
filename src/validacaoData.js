//adicionando tipo de recursos ao banco
//let msg = "valor não existente"
const insertData = require('./insertData');
let resulta = function erroNaoExiste(results, valor){
    console.log(results);
    if(results.length == 0){
        console.log("Data Não Registrada, Efetuando o Registro")
        insertData(valor[0]);
    }else{
        console.log("Data Ja Cadastrada")
        console.log(results)
    }
}
//criando modulo
module.exports = resulta;