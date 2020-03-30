//Requisitando Funções Importantes e Executando a API
var http = require('http'); 
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');     
var bcrypt = require ('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
const fs   = require('fs');
const port = 3000;
const cors = require('cors');
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use('/', router);
console.log("api iniciada");
//todas bibliotecas e inicialização da api




//variaveis destacadas 
let dataReq;
let tipoRecursosReq;
let objDataRecursos;
let professor;
let idHorario;
let horario;
let objData = [[0]];
let objHorarioProf;
let objVazio = [[0]];
let objTipo;
let objProfessor;
let dHPE;



//Require do Banco de Dados e suas querys
let selectData = require("./src/selectData");
let selectHorarioDataRecursos = require("./src/selectHorarioDataRecursos");
let selectTipoRecursos = require("./src/selectTipoRecursos");
let selectProfessorHorario = require("./src/selectProfessorHorario");
let selectProfessorHorarioEspec = require("./src/selectProfessorHorarioEspec");
let selectProfessor = require("./src/selectProfessor");
let selectTabelaProfessor = require("./src/selectTabelaProfessor");
let selectTabelaRecursos = require("./src/selectTabelaRecursos");
let selectTabelaTipoDeRecursos =  require("./src/selectTabelaTipoDeRecursos");
let insertProfessorHorario = require("./src/insertProfessorHorario");
let inserirTipoDeRecursos = require("./src/insertTipoDeRecursos");
let inserirRecursos = require("./src/insertRecursos");
let insertProfessor = require("./src/insertProfessor");
let updateAprovadoProfessorHorario = require("./src/updateAprovadoProfessorHorario");
let updateRecusadoProfessorHorario = require("./src/updateRecusadoProfessorHorario");
let updateTipoDeRecursos = require("./src/updateTipoDeRecursos");
let updateProfessor = require("./src/updateProfessor");
let updateRecursos = require("./src/updateRecursos");
let deleteProfessorHorarioEspec = require("./src/deleteProfessorHorarioEspec");
let deleteProfessor = require("./src/deleteProfessor");
let deleteTipoDeRecursos = require("./src/deleteTipoDeRecursos");
let deleteRecursos = require("./src/deleteRecursos");
let historico = require("./src/historico");
let desfazer = require("./src/desfazer");


//Login do usuario usando o token
router.post('/login',(req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(400).send('Informe usuário e senha!');
    }else{
       selectProfessor(signin,req,res);
    }
});



//rota de logout
app.post('/logout',verifyJWT, function(req, res) {
    res.status(200).send({ auth: false, token: null }); 
});



//Puxando Data Especifica, caso não exista, adicionar no banco de dados
router.post('/data',(req, res) =>{
    if(!req.body.data) return res.status(400).send('Informe a Data!!!');
    if(!req.body.tipoRecurso) return res.status(400).send('Informe a Data!!!');
    objData[0][0] = req.body.data;
    selectData(objData,res);
});



//Tabela de Recursos e Horarios de uma Determinada Pessoa
router.get('/dataRecursos', (req, res) =>{
    dataReq = req.query.data.substring(0,100);
    tipoRecursosReq = req.query.tipoRecurso.substring(0,100);
    objDataRecursos = [[dataReq,tipoRecursosReq]];
    selectHorarioDataRecursos(objDataRecursos,res);
});



//tipos de recursos para seleção
router.get('/tipoDeRecursos', (req, res) =>{
    selectTipoRecursos(objData,res);
});



router.delete('/deleteTipoDeRecursos/:id',(req,res) =>{
    deleteTipoDeRecursos(req.params.id,res);
});



router.delete('/deleteRecursos/:id',(req,res) =>{
    deleteRecursos(req.params.id,res);
});




//inserir Um Pedido de Horario Pra uma Determinada Pessoa 
router.post('/insertProfessorHorario',verifyJWT,(req,res) =>{
    objHorarioProf = {
        professor: req.body.payload.id,
        data: req.body.data,
        recurso: req.body.horario,
        motivo: req.body.texto
    };
    insertProfessorHorario(objHorarioProf,res);
});



//Verificar Pedidos de Horarios Para Seleção
router.post('/selectProfessorHorario',verifyADMRecursos,(req,res)=>{
    selectProfessorHorario(req.body.payload,res);
});



//Verificar Pedidos de Horarios Para Seleção
router.post('/historico',verifyADMRecursos,(req,res)=>{
    historico(req.body.payload,res);
});



//Recurso para algum professor Identificar seus pedidos de horario
router.post('/selectProfessorHorarioEspec',verifyJWT,(req,res)=>{
    professor = req.body.payload;
    selectProfessorHorarioEspec(professor.email,res);
});



//Professor ADM de recursos aprovar uma requisição de horario
router.post('/updateAprovadoProfessorHorario',verifyADMRecursos,(req,res) =>{
    objHorarioProf = {
        professor: req.body.item.email,
        sala: req.body.item.numero,
        data: req.body.item.data.slice(0,10),
        horario: req.body.item.horario,
        posicao: req.body.item.pos,
        contador: req.body.item.cont
    }
    console.log(req.body)
    updateAprovadoProfessorHorario(objHorarioProf,res);
});


//Professor ADM de recursos desfazer uma aprovação ou recuso de horario
router.post('/desfazer',verifyADMRecursos,(req,res) =>{
    objHorarioProf = {
        professor: req.body.item.email,
        sala: req.body.item.numero,
        data: req.body.item.data.slice(0,10),
        horario: req.body.item.horario,
        posicao: req.body.item.pos,
        contador: req.body.item.cont
    }
    desfazer(objHorarioProf,res);
});


//Professor ADM de recursos recusar uma requisição de horario
router.post('/updateRecusadoProfessorHorario',verifyADMRecursos,(req,res) =>{
    objHorarioProf = {
        professor: req.body.item.email,
        sala: req.body.item.numero,
        data: req.body.item.data.slice(0,10),
        horario: req.body.item.horario,
        posicao: req.body.item.pos,
        contador: req.body.item.cont
    }
    updateRecusadoProfessorHorario(objHorarioProf,res);
});



//Cadastro de Professor
router.post('/inserirProfessor',(req,res) =>{
    if(!req.body.email) return res.status(400).send('Informe o Email!');
    if(!req.body.confirmEmail) return res.status(400).send('Confirme o Email!');
    if(!req.body.nome) return res.status(400).send('Informe o seu Nome!');
    if(!req.body.password) return res.status(400).send('Informe a senha!');
    if(!req.body.confirmPassword) return res.status(400).send('Informe a senha!');
    if(!req.body.areaDoConhecimento) return res.status(400).send('Informe a area do conhecimento!');
    if(!req.body.cpf) return res.status(400).send('Informe o cpf do Professor!');
    if(req.body.email!=req.body.confirmEmail) return res.status(400).send('Confirma o Email, Emails não batem!');
    if(req.body.password!=req.body.confirmPassword) return res.status(400).send('Confirma a Senha, Senhas não batem!');
    objProfessor = {
        email: req.body.email,
        nome: req.body.nome,
        senha: bcrypt.hashSync(req.body.password, salt),
        area: req.body.areaDoConhecimento,
        cpf: req.body.cpf
    }
    insertProfessor(objProfessor,req,res);
});

router.put('/cadastroDeProfessor',(req,res) =>{
    if(!req.body.email) return res.status(400).send('Informe o Email!');
    if(!req.body.nomeP) return res.status(400).send('Informe o seu Nome!');
    if(!req.body.areaDoConhecimento) return res.status(400).send('Informe a area do conhecimento!');
    if(!req.body.cpf) return res.status(400).send('Informe o cpf do Professor!');
    objProfessor = {
        email: req.body.email,
        nome: req.body.nomeP,
        area: req.body.areaDoConhecimento,
        cpf: req.body.cpf,
        id: req.body.idProfessor,
        recurso: req.body.admRecursos,
        geral: req.body.admGeral,
    }
    updateProfessor(objProfessor,req,res);
});



router.get('/selectTabelaProfessor',verifyJWT,(req,res) =>{
    selectTabelaProfessor(req,res);
});



router.delete('/deleteProfessor/:id',verifyJWT,(req,res) =>{
    deleteProfessor(req.params.id,req,res);
});



router.get('/selectTabelaTipoDeRecursos',verifyJWT,(req,res) =>{
    selectTabelaTipoDeRecursos(req,res);
});



//cadastro de tipo de recursos
router.post('/insertTipoDeRecursos',verifyJWT,(req,res) =>{
    if(!req.body.recType.nome) return res.status(400).send('Confirme o nome do tipo!');
    if(!req.body.recType.descricao) return res.status(400).send('Confirme a descricao do tipo!');
    if(!req.body.recType.idProfessor) return res.status(400).send('Confirme o professor do tipo!');
    objTipo = {
        nome: req.body.recType.nome,
        descricao: req.body.recType.descricao,
        professor: req.body.recType.idProfessor,
    }
    inserirTipoDeRecursos(objTipo,res);
});



router.put('/insertTipoDeRecursos',verifyJWT,(req,res) =>{
    if(!req.body.recType.nome) return res.status(400).send('Confirme o nome do tipo!');
    if(!req.body.recType.descricao) return res.status(400).send('Confirme a descricao do tipo!');
    if(!req.body.recType.idProfessor) return res.status(400).send('Confirme o professor do tipo!');
    objTipo = {
        nome: req.body.recType.nome,
        descricao: req.body.recType.descricao,
        professor: req.body.recType.idProfessor,
        id: req.body.recType.idTipoDeRecursos
    }
    updateTipoDeRecursos(objTipo,res);
});



//cadastro de tipo de recursos
router.post('/insertRecursos',(req,res) =>{
    if(!req.body.recursos.numero) return res.status(400).send('Informe o nome do recurso!');
    if(!req.body.recursos.informacao) return res.status(400).send('Informe a informacao do recurso!');
    if(!req.body.recursos.idTipoDeRecursos) return res.status(400).send('Informe o tipo!');
    if(!req.body.recursos.capacidade) return res.status(400).send('informe a capacidade do recurso!');
    objTipo = {
        recursos: req.body.recursos.numero,
        inf: req.body.recursos.informacao,
        tipoRecurso: req.body.recursos.idTipoDeRecursos,
        capacidade: req.body.recursos.capacidade
    }
    inserirRecursos(objTipo,res);
});



router.put('/insertRecursos',(req,res) =>{
    console.log(req.body)
    if(!req.body.recursos.numero) return res.status(400).send('Informe o nome do recurso!');
    if(!req.body.recursos.informacao) return res.status(400).send('Informe a informacao do recurso!');
    if(!req.body.recursos.tipo) return res.status(400).send('Informe o tipo!');
    if(!req.body.recursos.capacidade) return res.status(400).send('informe a capacidade do recurso!');
    objTipo = {
        id: req.body.recursos.idRecursos,
        recursos: req.body.recursos.numero,
        inf: req.body.recursos.informacao,
        tipoRecurso: req.body.recursos.idTipoDeRecursos,
        capacidade: req.body.recursos.capacidade
    }
    updateRecursos(objTipo,req,res);
});



router.get('/selectTabelaRecursos',verifyJWT,(req,res) =>{
    selectTabelaRecursos(req,res);
});



//cancelar reserva
router.post('/deleteProfessorHorarioEspec',verifyJWT,(req,res) =>{
    let item = req.body.item;
    dHPE = {
        data : item.data.slice(0,10),
        recursos: item.numero,
        professor: item.email,
        horario: item.horario 
    }
    deleteProfessorHorarioEspec(dHPE,res);
});



//função que verifica se o JWT é validado atravez do token
function verifyJWT(req, res, next){
    var token = req.headers['x-access-token']; 
    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    var publicKey  = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, function(err, decoded) { 
        if (err)
            return res.status(401).send({ auth: false, message: 'Token inválido.' });         
        next(); 
    });
}



//função que verifica se o JWT é validado atravez do token e se é adm De Recursos
function verifyADMRecursos(req, res, next){ 
    var token = req.headers['x-access-token'];
    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    if(!(req.body.payload.admRecursos == true)) return res.status(401).send({ auth: false, message: 'Apenas Administradores possuem acessos' }); 
    var publicKey  = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, function(err, decoded) { 
        if (err) 
            return res.status(401).send({ auth: false, message: 'Token inválido.' }); 
        next(); 
    }); 
}



//função que verifica se o JWT é validado atravez do token mais validação de ADM Geral e de Recursos
function verifyADMGeral(req, res, next){ 
    var token = req.headers['x-access-token']; 
    if (!token) return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    if(!(req.query.admGeral == true)) return res.status(401).send({ auth: false, message: 'Apenas Administradores possuem acessos' }); 
    if(!(req.query.admRecursos == true)) return res.status(401).send({ auth: false, message: 'Apenas Administradores possuem acessos' });
    var publicKey  = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, function(err, decoded) { 
        if (err) 
            return res.status(401).send({ auth: false, message: 'Token inválido.' }); 
        next(); 
    }); 
}


var server = http.createServer(app); 
server.listen(port);



const signin = function (objeto,req,res){
    if(!objeto[0]) return  res.status(400).send('Usuário não Encontrado!');
    const isMatch = bcrypt.compareSync(req.body.password, objeto[0].senha);
    if(!isMatch) return res.status(400).send('Email/Senha Inválidas!');
    const payload = {
        id: objeto[0].idProfessor,
        email: objeto[0].email,
        nome: objeto[0].nomeP,
        areaDoConhecimento: objeto[0].areaDoConhecimento,
        cpf: objeto[0].cpf,
        admGeral: objeto[0].admGeral,
        admRecursos: objeto[0].admRecursos
    }
    let idP = objeto[0].idProfessor
    var privateKey = fs.readFileSync('./private.key', 'utf8');
    var token = jwt.sign(payload, privateKey, { 
        expiresIn: 3600, // 5min 
        algorithm:  "RS256" //SHA-256 hash signature
    }); 
    res.status(200).send({ auth: true, token: token,payload: payload}); 
}