const {authSecret} = require('./.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const signin = function (objeto,req,res){
    console.log(objeto[0]);
    if(!objeto[0]) return  res.status(400).send('Usuário não Encontrado!');
    //const isMatch = bcrypt.compareSync(req.body.password, user.password);
    const isMatch = (req.body.password == objeto[0].senha);
    console.log(req.body.password +"   "+ objeto[0].senha)
    if(!isMatch) return res.status(401).send('Email/Senha Inválidas!');
    const now = Math.floor(Date.now()/1000);
    const payload = {
        id: objeto[0].idProfessor,
        email: objeto[0].email,
        nome: objeto[0].nome,
        senha: objeto[0].senha,
        areaDoConhecimento: objeto[0].areaDoConhecimento,
        responsavel: objeto[0].responsavel,
        cpf: objeto[0].cpf,
        iat: now,
        exp: now + (60 * 60 * 5)
    }
    res.json({
        ...payload,
        token: jwt.encode(payload,authSecret)
    })
    return{signin}
}

module.exports = signin;