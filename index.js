//Requisitando Funções Importantes e Executando a API
var http = require('http'); 
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fs   = require('fs');
const secret = "meu-segredo";//esse segredo do JWT seria uma config
const port = 3000;
const cors = require('cors');
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use('/', router);
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
let selectProfessorHorarioEspec = require("./src/selectProfessorHorarioEspec");
let selectProfessor = require("./src/selectProfessor");
let insertProfessorHorario = require("./src/insertProfessorHorario");
let updateAprovadoProfessorHorario = require("./src/updateRecusadoProfessorHorario");
let validacao = require("./auth");
console.log();
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

router.post('/data',(req, res) =>{
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
router.get('/tipoDeRecursos',verifyADM, (req, res) =>{
    console.log("Informando os Tipos de Recursos");
    selectTipoRecursos(objData,res);
})
router.post('/insertProfessorHorario',verifyJWT,(req,res) =>{
    professor = req.body.professor.substring(0,100);
    idHorario = req.body.idhorario.substring(0,100);
    horario = req.body.horario.substring(0,100);
    objHorarioProf = [[professor,idHorario,horario]];
    console.log("Cadastrando determinado horario para determinado professor")
    insertProfessorHorario(objHorarioProf,res);
})
router.get('/selectProfessorHorario',verifyJWT,(req,res)=>{
    console.log("Mostrando os professores e os horarios em pedidos")
    selectProfessorHorario(objVazio,res);
})
router.get('/selectProfessorHorarioEspec',verifyJWT,(req,res)=>{
    professor = req.body.professor.substring(0,100);
    console.log("Mostrando os professores e os horarios em pedidos ESPECIFICO")
    selectProfessorHorarioEspec(professor,res);
})
router.post('/updateAprovadoProfessorHorario',verifyADM,(req,res) =>{
    professor = req.body.professor.substring(0,100);
    idHorario = req.body.idhorario.substring(0,100);
    horario = req.body.horario.substring(0,100);
    objHorarioProf = [[professor,idHorario,horario]];
    console.log("Aprovando determinado horario para determinado professor")
    updateAprovadoProfessorHorario(objHorarioProf,res);
})
router.post('/updateRecusadoProfessorHorario',verifyADM,(req,res) =>{
    professor = req.body.professor.substring(0,100);
    idHorario = req.body.idhorario.substring(0,100);
    horario = req.body.horario.substring(0,100);
    objHorarioProf = [[professor,idHorario,horario]];
    console.log("Aprovando determinado horario para determinado professor")
    updateRecusadoProfessorHorario(objHorarioProf,res);
})

//rota de logout
app.post('/logout',verifyJWT, function(req, res) { 
    console.log("Fez logout e cancelou o token!");
    res.status(200).send({ auth: false, token: null }); 
});

//função que verifica se o JWT é ok
function verifyJWT(req, res, next){ 
    var token = req.headers['x-access-token']; 
    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    var publicKey  = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, function(err, decoded) { 
        if (err)
            return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
        next(); 
    }); 
}
function verifyADM(req, res, next){ 
    var token = req.headers['x-access-token']; 
    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    if(!(req.body.adm == 'true')) return res.status(401).send({ auth: false, message: 'Apenas Administradores possuem acessos' }); 
    var publicKey  = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, function(err, decoded) { 
        if (err) 
            return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
        next(); 
    }); 
}
function verifyADM(req, res, next){ 
    var token = req.headers['x-access-token']; 
    if (!token) return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    if(!(req.body.admGeral == 'true')) return res.status(401).send({ auth: false, message: 'Apenas Administradores possuem acessos' }); 
    if(!(req.body.admRecursos == 'true')) return res.status(401).send({ auth: false, message: 'Apenas Administradores possuem acessos' });
    var publicKey  = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, function(err, decoded) { 
        if (err) 
            return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
        next(); 
    }); 
}
var server = http.createServer(app); 
server.listen(port);