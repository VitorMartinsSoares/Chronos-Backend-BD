//Requisitando Funções Importantes e Executando a API
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const port = 3000;
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();
app.use('/', router);
app.listen(port);
console.log("api iniciada");

//variaveis destacadas
let dataReq;
let tipoRecursosReq;
let objDataRecursos;
let professor;
let idHorario;
let recursos;
let horario;
let usuario;
let senha;
let objLogin = [[0]];
let objData = [[0]];
let objHorarioProf;
let objVazio = [[0]];

//Require do Banco de Dados e suas querys
let selectData = require("./src/selectData");
let selectHorarioDataRecursos = require("./src/selectHorarioDataRecursos");
let selectTipoRecursos = require("./src/selectTipoRecursos");
let selectProfessorHorario = require("./src/selectProfessorHorario");
//let selectProfessorHorarioEspec = require("./src/selectProfessorHorarioEspec");
let selectProfessor = require("./src/selectProfessor");
let insertProfessorHorario = require("./src/insertProfessorHorario");
let updateAprovadoProfessorHorario = require("./src/updateRecusadoProfessorHorario");
let validacao = require("./auth");
let token = require("./validadeToken");

router.post('/login',(req,res)=>{
    //usuario = req.body.usuario.substring(0,100);
    //senha = req.body.senha.substring(0,100);
    //console.log("validando a conexão");
    if(!req.body.email || !req.body.password){
        res.status(400).send('Informe usuário e senha!');
    }else{
       selectProfessor(validacao,req,res);
    }
})
router.post('/validateToken', (req,res)=>{
    
})

router.post('/data', (req, res) =>{
    objData[0][0] = req.body.data.substring(0,100)
    console.log("Caso não tenha a data "+ objData[0][0]+" Inserir no banco de dados");
    selectData(objData,res);
    res.json();
})
router.get('/dataRecursos', (req, res) =>{
    dataReq = req.query.data.substring(0,100);
    tipoRecursosReq = req.query.tipoRecurso.substring(0,100);
    objDataRecursos = [[dataReq,tipoRecursosReq]];
    console.log("Criando tabela de Recursos e Datas");
    selectHorarioDataRecursos(objDataRecursos,res);
})
router.get('/tipoDeRecursos', (req, res) =>{
    console.log("Informando os Tipos de Recursos");
    selectTipoRecursos(objData,res);
})
router.post('/insertProfessorHorario',(req,res) =>{
    professor = req.body.professor.substring(0,100);
    idHorario = req.body.idhorario.substring(0,100);
    horario = req.body.horario.substring(0,100);
    objHorarioProf = [[professor,idHorario,horario]];
    console.log("Cadastrando determinado horario para determinado professor")
    insertProfessorHorario(objHorarioProf,res);
})
router.get('/selectProfessorHorario',(req,res)=>{
    console.log("Mostrando os professores e os horarios em pedidos")
    selectProfessorHorario(objVazio,res);
})
router.post('/updateAprovadoProfessorHorario',(req,res) =>{
    professor = req.body.professor.substring(0,100);
    idHorario = req.body.idhorario.substring(0,100);
    horario = req.body.horario.substring(0,100);
    objHorarioProf = [[professor,idHorario,horario]];
    console.log("Aprovando determinado horario para determinado professor")
    updateAprovadoProfessorHorario(objHorarioProf,res);
})
router.post('/updateRecusadoProfessorHorario',(req,res) =>{
    professor = req.body.professor.substring(0,100);
    idHorario = req.body.idhorario.substring(0,100);
    horario = req.body.horario.substring(0,100);
    objHorarioProf = [[professor,idHorario,horario]];
    console.log("Aprovando determinado horario para determinado professor")
    updateRecusadoProfessorHorario(objHorarioProf,res);
})