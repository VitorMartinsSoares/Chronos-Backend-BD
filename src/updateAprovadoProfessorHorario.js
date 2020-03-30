// function somaHora(hrA, hrB, zerarHora) {
//     if(hrA.length != 5 || hrB.length != 5) return "00:00";
   
//     temp = 0;
//     nova_h = 0;
//     novo_m = 0;

//     hora1 = hrA.substr(0, 2) * 1;
//     hora2 = hrB.substr(0, 2) * 1;
//     minu1 = hrA.substr(3, 2) * 1;
//     minu2 = hrB.substr(3, 2) * 1;
   
//     temp = minu1 + minu2;
//     while(temp > 59) {
//             nova_h++;
//             temp = temp - 60;
//     }
//     novo_m = temp.toString().length == 2 ? temp : ("0" + temp);

//     temp = hora1 + hora2 + nova_h;
//     while(temp > 23 && zerarHora) {
//             temp = temp - 24;
//     }
//     nova_h = temp.toString().length == 2 ? temp : ("0" + temp);

//     return nova_h + ':' + novo_m;
// }
let sqlQUERY = require("./sqlQueryExec");
let horariosArray =  require("./horariosArray");
let sqlSemRes = require("./sqlQuerySemRes");
let funcao = require("./imprimirResults");
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio,res){
    let obj = [[0]];
    for(let i=0;i<objVazio.contador;i++){
        // let inicio = horariosArray[objVazio.posicao-i].horario.slice(0,5);
        // let fim = somaHora(inicio,'00:50',false);
        // let infim = inicio+ '-' +fim;
        console.log(horariosArray[objVazio.posicao-i].horario);
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
            console.log('Entrou');
        }else{
            sqlSemRes(query3,obj,funcao);
            console.log("entrou");
        }
    }
}
//criando modulo
module.exports = selectD;
//'2', '1', '1', '1', '07:50:00

